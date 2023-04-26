import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RenameTodoCommand } from './rename-todo.command';
import { ToDoRepository } from 'src/todo/todo.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(RenameTodoCommand)
export class RenameTodoHandler implements ICommandHandler<RenameTodoCommand> {
  constructor(private todoRepository: ToDoRepository) {}

  async execute(command: RenameTodoCommand) {
    const { todoId, newTitle } = command;
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) throw new NotFoundException();
    todo.rename(newTitle);
    await this.todoRepository.persist(todo);
  }
}
