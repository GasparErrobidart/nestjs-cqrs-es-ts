import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddTodoRequestDTO } from './dto/requests/add-todo.dto';
import { AddTodoCommand } from './commands/add-todo/add-todo.command';
import { CompleteTodoCommand } from './commands/complete-todo/complete-todo.command';
import { CompleteTodoRequestDTO } from './dto/requests/complete-todo.dto';
import { RenameTodoRequestDTO } from './dto/requests/rename-todo.dto';
import { RenameTodoCommand } from './commands/rename-todo/rename-todo.command';
import { ListTodoQuery } from './queries/list-todo/list-todo.query';
import { ListTodoResultDTO } from './dto/query/list-todo-result';
import { ReadTodoQuery } from './queries/read-todo/read-todo.query';
import { ReadTodoResultDTO } from './dto/query/read-todo-result';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  list() {
    return this.queryBus.execute<ListTodoQuery, ListTodoResultDTO>(
      new ListTodoQuery(),
    );
  }

  @Get(':todoId')
  read(@Param('todoId') todoId) {
    return this.queryBus.execute<ReadTodoQuery, ReadTodoResultDTO>(
      new ReadTodoQuery(todoId),
    );
  }

  @Post()
  async add(@Body() addTodoRequest: AddTodoRequestDTO) {
    await this.commandBus.execute<AddTodoCommand, void>(
      new AddTodoCommand(addTodoRequest.title),
    );
  }

  @Post(':todoId/complete')
  async complete(@Param() completeTodoRequest: CompleteTodoRequestDTO) {
    await this.commandBus.execute<CompleteTodoCommand, void>(
      new CompleteTodoCommand(completeTodoRequest.todoId),
    );
  }

  @Post(':todoId/rename')
  async rename(@Param('todoId') todoId, @Body('title') todoNewTitle) {
    const renameRequest = new RenameTodoRequestDTO(todoId, todoNewTitle);
    await this.commandBus.execute<RenameTodoCommand, void>(
      new RenameTodoCommand(renameRequest.todoId, renameRequest.newTitle),
    );
  }
}
