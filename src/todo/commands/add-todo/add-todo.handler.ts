import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AddTodoCommand } from './add-todo.command';
import { ToDo } from 'src/todo/ToDo';
import { ToDoRepository } from 'src/todo/todo.repository';

@CommandHandler(AddTodoCommand)
export class AddTodoHandler implements ICommandHandler<AddTodoCommand> {
  constructor(
    private todoRepository: ToDoRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddTodoCommand) {
    const { title } = command;
    const todo = this.publisher.mergeObjectContext(new ToDo());
    todo.create(title);
    await this.todoRepository.persist(todo);
  }
}
