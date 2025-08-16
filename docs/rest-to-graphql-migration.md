# REST to GraphQL Migration Plan

## Overview

This document outlines the gradual migration strategy from REST API endpoints to GraphQL for the Jotube application. The migration will be implemented incrementally, allowing both REST and GraphQL to coexist during the transition period.

## Migration Strategy

### Phase 1: Core Domain Models (High Priority)

**Timeline: Weeks 1-2**

#### 1. Channels Controller (`/channel`)

- **Current Endpoints**: 5 endpoints
- **Complexity**: Medium
- **Migration Priority**: High
- **GraphQL Operations**:
  - `Query`: channels, channel(id), channelByYtId(ytChannelId)
  - `Mutation`: createChannel, updateChannel, deleteChannel
  - `Query`: channelMetadata(ytChannelId)

#### 2. Uploads Video Controller (`/uploads-video`)

- **Current Endpoints**: 9 endpoints
- **Complexity**: High
- **Migration Priority**: High
- **GraphQL Operations**:
  - `Query`: uploads, uploadsByChannel(ytChannelId), storyboards(ytChannelId)
  - `Mutation\*\*: saveUpload, deleteUploads, finishProcessingUpload, syncUploads, cleanShortUploads

### Phase 2: Content Management (Medium Priority)

**Timeline: Weeks 3-4**

#### 3. Playlists Controller (`/playlists`)

- **Current Endpoints**: 5 endpoints
- **Complexity**: Low
- **Migration Priority**: Medium
- **GraphQL Operations**:
  - `Query`: playlists, playlist(id)
  - `Mutation`: createPlaylist, updatePlaylist, deletePlaylist

#### 4. Dashboard Controller (`/dashboard`)

- **Current Endpoints**: 2 endpoints
- **Complexity**: Medium
- **Migration Priority**: Medium
- **GraphQL Operations**:
  - `Query`: channelsDashboard, videosDashboard
  - **Note**: Complex filtering and pagination will benefit from GraphQL

### Phase 3: Media Processing (Lower Priority)

**Timeline: Weeks 5-6**

#### 5. Screenshots API Controller (`/screenshots-api`)

- **Current Endpoints**: Multiple endpoints
- **Complexity**: Medium
- **Migration Priority**: Low
- **GraphQL Operations**:
  - `Query`: screenshots, screenshotsByChannel, screenshot(id)
  - `Mutation`: createScreenshot, deleteScreenshot, updateScreenshot

#### 6. Thumbnails Controller (`/thumbnails-api`)

- **Current Endpoints**: Multiple endpoints
- **Complexity**: Medium
- **Migration Priority**: Low
- **GraphQL Operations**:
  - `Query`: thumbnails, thumbnailsByChannel, thumbnail(id)
  - `Mutation`: createThumbnail, deleteThumbnail, updateThumbnail

#### 7. Images Controller (`/images`)

- **Current Endpoints**: Multiple endpoints
- **Complexity**: Low
- **Migration Priority**: Low
- **GraphQL Operations**:
  - `Query`: images, image(id)
  - `Mutation`: uploadImage, deleteImage

### Phase 4: Utility & Management (Lowest Priority)

**Timeline: Weeks 7-8**

#### 8. Search Controller (`/search`)

- **Current Endpoints**: Multiple endpoints
- **Complexity**: Medium
- **Migration Priority**: Low
- **GraphQL Operations**:
  - `Query`: search(query, filters)

#### 9. Statistics Controller (`/statistics`)

- **Current Endpoints**: Multiple endpoints
- **Complexity**: Low
- **Migration Priority**: Low
- **GraphQL Operations**:
  - `Query`: statistics, channelStats, uploadStats

#### 10. Queue Controller (`/queues`)

- **Current Endpoints**: Multiple endpoints
- **Complexity**: High
- **Migration Priority**: Low
- **GraphQL Operations**:
  - `Query`: queues, queueStatus, jobStatus
  - `Mutation`: addToQueue, removeFromQueue, pauseQueue, resumeQueue

#### 11. File Controller (`/open-directory`)

- **Current Endpoints**: Multiple endpoints
- **Complexity**: Low
- **Migration Priority**: Low
- **GraphQL Operations**:
  - `Query`: directories, files
  - `Mutation`: openDirectory, createDirectory

#### 12. Storyboard Controller (`/storyboard`)

- **Current Endpoints**: Multiple endpoints
- **Complexity**: Medium
- **Migration Priority**: Low
- **GraphQL Operations**:
  - `Query`: storyboards, storyboard(id), storyboardsByChannel
  - `Mutation`: createStoryboard, updateStoryboard, deleteStoryboard

## Migration Benefits

### 1. **Performance Improvements**

- Reduced over-fetching and under-fetching
- Single request for complex data relationships
- Better caching strategies

### 2. **Developer Experience**

- Self-documenting API with introspection
- Strong typing with GraphQL schema
- Better tooling and debugging

### 3. **Frontend Flexibility**

- Frontend teams can request exactly what they need
- Easier to implement real-time updates
- Better mobile app performance

### 4. **API Evolution**

- Non-breaking schema changes
- Deprecation handling
- Version management

## Implementation Guidelines

### 1. **Coexistence Strategy**

- Keep REST endpoints functional during migration
- Implement GraphQL alongside existing REST
- Gradual deprecation of REST endpoints

### 2. **Data Consistency**

- Ensure GraphQL and REST return identical data
- Use shared service layer
- Maintain existing business logic

### 3. **Testing Strategy**

- Unit tests for GraphQL resolvers
- Integration tests for GraphQL endpoints
- Performance testing for complex queries

### 4. **Documentation**

- GraphQL schema documentation
- Migration guides for frontend teams
- API deprecation notices

## Risk Mitigation

### 1. **Performance Concerns**

- Implement query complexity analysis
- Add query depth limits
- Monitor query execution times

### 2. **Breaking Changes**

- Maintain backward compatibility
- Gradual rollout with feature flags
- Comprehensive testing before deployment

### 3. **Team Training**

- GraphQL workshops for development teams
- Documentation and best practices
- Code review guidelines

## Success Metrics

### 1. **Adoption Metrics**

- Percentage of frontend requests using GraphQL
- Reduction in REST endpoint usage
- Developer satisfaction scores

### 2. **Performance Metrics**

- Reduced API response times
- Decreased bandwidth usage
- Improved cache hit rates

### 3. **Maintenance Metrics**

- Reduced API maintenance overhead
- Fewer breaking changes
- Faster feature development

## Timeline Summary

- **Phase 1 (Weeks 1-2)**: Core domain models (Channels, Uploads)
- **Phase 2 (Weeks 3-4)**: Content management (Playlists, Dashboard)
- **Phase 3 (Weeks 5-6)**: Media processing (Screenshots, Thumbnails, Images)
- **Phase 4 (Weeks 7-8)**: Utility & management (Search, Statistics, Queues, Files, Storyboard)

## Next Steps

1. **Immediate Actions**

   - Set up GraphQL infrastructure (✅ Completed)
   - Create initial Todo schema (✅ Completed)
   - Plan Phase 1 implementation

2. **Week 1 Goals**

   - Implement Channels GraphQL schema
   - Create Channels resolver
   - Add comprehensive testing

3. **Week 2 Goals**

   - Implement Uploads Video GraphQL schema
   - Create Uploads resolver
   - Begin frontend integration planning

4. **Ongoing**
   - Regular progress reviews
   - Performance monitoring
   - Team training and documentation updates
