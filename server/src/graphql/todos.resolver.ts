import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './models/todo.model';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todo], { name: 'todos' })
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Todo | null> {
    return this.todosService.findOne(id);
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
  ): Promise<Todo> {
    return this.todosService.create(createTodoInput);
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ): Promise<Todo | null> {
    return this.todosService.update(id, updateTodoInput);
  }

  @Mutation(() => Boolean)
  async removeTodo(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.todosService.remove(id);
  }
}
