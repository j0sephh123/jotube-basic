import { Injectable } from '@nestjs/common';
import { Todo } from './models/todo.model';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: '1',
      title: 'Learn GraphQL',
      description: 'Study GraphQL fundamentals and NestJS integration',
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      title: 'Build Todo App',
      description: 'Create a simple todo application with GraphQL',
      completed: true,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-03'),
    },
    {
      id: '3',
      title: 'Deploy to Production',
      description: 'Deploy the application to a production environment',
      completed: false,
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04'),
    },
    {
      id: '4',
      title: 'Write Tests',
      description: 'Add comprehensive test coverage for the application',
      completed: false,
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
    },
    {
      id: '5',
      title: 'Documentation',
      description: 'Create comprehensive documentation for the API',
      completed: false,
      createdAt: new Date('2024-01-06'),
      updatedAt: new Date('2024-01-06'),
    },
  ];

  async findAll(): Promise<Todo[]> {
    return this.todos;
  }

  async findOne(id: string): Promise<Todo | null> {
    return this.todos.find((todo) => todo.id === id) || null;
  }

  async create(createTodoInput: {
    title: string;
    description: string;
  }): Promise<Todo> {
    const newTodo: Todo = {
      id: (this.todos.length + 1).toString(),
      title: createTodoInput.title,
      description: createTodoInput.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  async update(
    id: string,
    updateTodoInput: {
      title?: string;
      description?: string;
      completed?: boolean;
    },
  ): Promise<Todo | null> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return null;
    }

    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      ...updateTodoInput,
      updatedAt: new Date(),
    };

    return this.todos[todoIndex];
  }

  async remove(id: string): Promise<boolean> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return false;
    }

    this.todos.splice(todoIndex, 1);
    return true;
  }
}
