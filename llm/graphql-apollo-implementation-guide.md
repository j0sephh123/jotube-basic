# GraphQL & Apollo Implementation Guide

This document explains how GraphQL and Apollo Client are implemented in the Jotube project, specifically for the channel creation feature. Follow this pattern for implementing new GraphQL operations.

## Project Structure

```
jotube/
├── client/                          # React frontend
│   ├── src/
│   │   ├── api/graphql/            # GraphQL queries/mutations
│   │   │   └── queries.ts          # Define GraphQL operations
│   │   ├── generated/              # Auto-generated types (DO NOT EDIT)
│   │   │   └── graphql.tsx         # Generated TypeScript types
│   │   └── features/               # Feature-based organization
│   │       └── Channel/
│   │           ├── hooks/          # Custom hooks for GraphQL operations
│   │           │   └── useCreateChannel.tsx
│   │           └── CreateChannel/  # UI components
│   │               └── index.tsx   # Main component using the hook
│   └── codegen.yml                 # GraphQL code generation config
└── server/                         # NestJS backend
    ├── src/
    │   └── channels/               # Feature module
    │       ├── channels.resolver.ts # GraphQL resolver
    │       ├── channel.service.ts   # Business logic
    │       └── dtos/               # GraphQL input/output types
    │           ├── create-channel.input.ts
    │           └── create-channel.response.ts
    └── schema.gql                  # Auto-generated GraphQL schema
```

## Implementation Flow

### 1. Backend (NestJS + GraphQL)

#### Step 1: Define Input DTO

```typescript
// server/src/channels/dtos/create-channel.input.ts
import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreateChannelInput {
  @Field()
  @IsString()
  ytVideoId: string;
}
```

#### Step 2: Define Response DTO with Enums

```typescript
// server/src/channels/dtos/create-channel.response.ts
import { ObjectType, Field, registerEnumType } from "@nestjs/graphql";

export enum ChannelMessage {
  INVALID_VIDEO_ID = "INVALID_VIDEO_ID",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  CREATED_SUCCESSFULLY = "CREATED_SUCCESSFULLY",
  FAILED_TO_CREATE = "FAILED_TO_CREATE",
}

registerEnumType(ChannelMessage, {
  name: "ChannelMessage",
  description: "Possible messages for channel creation responses",
});

@ObjectType()
export class CreateChannelResponse {
  @Field(() => ChannelMessage)
  message: ChannelMessage;

  @Field({ nullable: true })
  ytChannelId?: string;
}
```

**Important**: GraphQL enums must use simple string identifiers (no spaces, special chars).

#### Step 3: Create GraphQL Resolver

```typescript
// server/src/channels/channels.resolver.ts
import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { ChannelService } from "./channel.service";
import { CreateChannelResponse } from "./dtos/create-channel.response";
import { CreateChannelInput } from "./dtos/create-channel.input";

@Resolver()
export class ChannelsResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Mutation(() => CreateChannelResponse)
  async createChannel(
    @Args("createChannelInput") createChannelInput: CreateChannelInput
  ): Promise<CreateChannelResponse> {
    return this.channelService.create(createChannelInput);
  }
}
```

#### Step 4: Implement Service Logic

```typescript
// server/src/channels/channel.service.ts
import { ChannelMessage } from './dtos/create-channel.response';

async create({ ytVideoId }: createChannelDto) {
  try {
    // ... business logic
    return {
      ytChannelId,
      message: ChannelMessage.CREATED_SUCCESSFULLY,
    };
  } catch {
    return {
      ytChannelId: null,
      message: ChannelMessage.INVALID_VIDEO_ID,
    };
  }
}
```

### 2. Frontend (React + Apollo Client)

#### Step 1: Define GraphQL Operations

```typescript
// client/src/api/graphql/queries/queries.ts
import { gql } from "@apollo/client";

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($createChannelInput: CreateChannelInput!) {
    createChannel(createChannelInput: $createChannelInput) {
      message
      ytChannelId
    }
  }
`;
```

#### Step 2: Generate Types

```bash
cd client
npm run codegen
```

This generates TypeScript types in `src/generated/graphql.tsx`:

- `CreateChannelMutation` - mutation function type
- `CreateChannelMutationVariables` - input variables type
- `ChannelMessage` - enum type

#### Step 3: Create Custom Hook

```typescript
// client/src/features/Channel/hooks/useCreateChannel.tsx
import { useCreateChannelMutation, ChannelMessage } from "@/generated/graphql";

type Props = {
  onCreated: (message: string) => void;
  onAlreadyExists: (message: string, ytChannelId: string) => void;
  onInvalidVideoId: (message: string) => void;
  onFailedToCreate: (message: string) => void;
};

export default function useCreateChannel({
  onCreated,
  onAlreadyExists,
  onInvalidVideoId,
  onFailedToCreate,
}: Props) {
  const [createChannel] = useCreateChannelMutation({
    onCompleted({ createChannel: { ytChannelId, message } }) {
      switch (message) {
        case ChannelMessage.CreatedSuccessfully:
          onCreated("Channel created successfully!");
          return;
        case ChannelMessage.AlreadyExists:
          onAlreadyExists("Channel already exists", ytChannelId as string);
          return;
        case ChannelMessage.InvalidVideoId:
          onInvalidVideoId("Invalid YouTube video ID");
          return;
        case ChannelMessage.FailedToCreate:
          onFailedToCreate("Failed to create channel");
          return;
        default:
          break;
      }
    },
  });

  return createChannel;
}
```

#### Step 4: Use in Component

```typescript
// client/src/features/Channel/CreateChannel/index.tsx
import useCreateChannel from "@/features/Channel/hooks/useCreateChannel";
import { useToastContext } from "@/shared/components/Toast/useToastContext";

export default function CreateChannel() {
  const { successToast, errorToast } = useToastContext();

  const channelCreateMutation = useCreateChannel({
    onCreated: (message: string) => {
      successToast(message);
      refetch();
    },
    onAlreadyExists: (message: string, ytChannelId: string) => {
      errorToast(
        <ViewExistingChannel message={message} ytChannelId={ytChannelId} />
      );
    },
    onInvalidVideoId: (message: string) => {
      errorToast(message);
    },
    onFailedToCreate: (message: string) => {
      errorToast(message);
    },
  });

  const handleChannelCreate = async ({ ytVideoId }: { ytVideoId: string }) => {
    await channelCreateMutation({
      variables: {
        createChannelInput: {
          ytVideoId,
        },
      },
    });
  };
}
```

## Key Patterns & Best Practices

### 1. Enum-Based Response Handling

- Use enums for response messages to ensure type safety
- Handle all possible enum values in the frontend switch statement
- Provide meaningful callback functions for each response type

### 2. Separation of Concerns

- **DTOs**: Define GraphQL schema structure
- **Resolvers**: Handle GraphQL operations
- **Services**: Implement business logic
- **Hooks**: Manage Apollo Client state and callbacks
- **Components**: Handle UI and user interactions

### 3. Error Handling

- Backend returns structured responses with message enums
- Frontend handles each response type with appropriate UI feedback
- Use toast notifications for user feedback

### 4. Type Safety

- Always regenerate types after schema changes (`npm run codegen`)
- Use generated types from `@/generated/graphql`
- Never edit generated files manually

### 5. File Organization

- Keep GraphQL operations in `src/api/graphql/queries.ts`
- Create custom hooks in feature-specific `hooks/` folders
- Use feature-based folder structure for components

## Common Pitfalls

1. **Forgetting to regenerate types** after backend changes
2. **Using complex strings in GraphQL enums** (must be simple identifiers)
3. **Not handling all enum cases** in the frontend switch statement
4. **Mixing REST and GraphQL** patterns in the same feature
5. **Not using the generated types** from the codegen

## Development Workflow

1. **Backend**: Create/update DTOs, resolver, and service
2. **Backend**: Restart server to regenerate schema.gql
3. **Frontend**: Update GraphQL queries if needed
4. **Frontend**: Run `npm run codegen` to regenerate types
5. **Frontend**: Update hooks and components to use new types
6. **Test**: Verify the complete flow works end-to-end

## Toast Integration

The project uses a custom toast system with convenience functions:

```typescript
const { successToast, errorToast } = useToastContext();

// Instead of: show(message, { type: "success" })
successToast(message);

// Instead of: show(message, { type: "error" })
errorToast(message);
```

Follow this pattern for consistent user feedback across the application.
