import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListTodoQuery } from './list-todo.query';
import { ListTodoResultDTO } from 'src/todo/dto/query/list-todo-result';
import { ToDoRepository } from 'src/todo/todo.repository';

@QueryHandler(ListTodoQuery)
export class ListTodoHandler implements IQueryHandler<ListTodoQuery> {
  constructor(private readonly todoRepository: ToDoRepository) {}

  async execute(): Promise<ListTodoResultDTO> {
    const todos = this.todoRepository.findAll();
    return new ListTodoResultDTO(todos);
  }
}
