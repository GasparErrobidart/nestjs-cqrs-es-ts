import { Injectable, NotFoundException } from '@nestjs/common';

export interface ToDo {
  id: string;
  title: string;
  done: boolean;
}

export interface ToDoPatch extends Partial<ToDo> {
  id: string;
}

@Injectable()
export class TodoMockPersistenceService {
  private todos: ToDo[] = [
    {
      id: '1',
      title: 'Test',
      done: false,
    },
  ];

  insert(todo: ToDo) {
    this.todos.push(todo);
  }

  findAll() {
    return [...this.todos];
  }

  findById(todoId: string) {
    return this.todos.find(({ id }) => id === todoId);
  }

  update(todo: ToDoPatch) {
    const todoIndex = this.todos.findIndex(({ id }) => id === todo.id);
    const existingItem = this.todos[todoIndex];
    if (todoIndex < 0) throw new NotFoundException();
    this.todos[todoIndex] = { ...existingItem, ...todo };
  }
}
