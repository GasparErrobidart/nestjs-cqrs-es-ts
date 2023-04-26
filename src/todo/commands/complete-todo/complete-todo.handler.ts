import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompleteTodoCommand } from './complete-todo.command';
import { ToDoRepository } from 'src/todo/todo.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CompleteTodoCommand)
export class CompleteTodoHandler
  implements ICommandHandler<CompleteTodoCommand>
{
  constructor(private todoRepository: ToDoRepository) {}

  async execute(command: CompleteTodoCommand) {
    const { todoId } = command;
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) throw new NotFoundException();
    todo.complete();
    await this.todoRepository.persist(todo);
  }
}
