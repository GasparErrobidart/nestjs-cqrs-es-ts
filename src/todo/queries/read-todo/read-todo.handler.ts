import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReadTodoQuery } from './read-todo.query';
import { ReadTodoResultDTO } from 'src/todo/dto/query/read-todo-result';
import { NotFoundException } from '@nestjs/common';
import { ToDoRepository } from 'src/todo/todo.repository';

@QueryHandler(ReadTodoQuery)
export class ReadTodoHandler implements IQueryHandler<ReadTodoQuery> {
  constructor(private readonly todoRepository: ToDoRepository) {}

  async execute(query: ReadTodoQuery): Promise<ReadTodoResultDTO> {
    const result = await this.todoRepository.findById(query.todoId);
    if (!result) throw new NotFoundException();
    return new ReadTodoResultDTO(result);
  }
}
