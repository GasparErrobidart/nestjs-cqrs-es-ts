import { BadRequestException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { ToDoAddedEvent } from './events/todo-added/ToDoAdded.event';
import { IEvent } from 'src/framework/EventStore';
import { ToDoRenamedEvent } from './events/todo-added/ToDoRenamed.event';
import { ToDoCompletedEvent } from './events/todo-added/ToDoCompleted.event';

export class ToDo extends AggregateRoot<IEvent> {
  public id: string;
  public title: string;
  public done: boolean;
  private _version = -1;

  constructor() {
    super();
  }

  create(title: string) {
    this.validateTitle(title);
    const id = Date.now().toString();
    const done = false;
    this.apply(
      new ToDoAddedEvent({
        todoId: id,
        title,
        done,
        version: ++this._version,
      }),
    );
  }

  onToDoAddedEvent(event: ToDoAddedEvent) {
    this._version = event.version;
    this.title = event.title;
    this.done = event.done;
    this.id = event.todoId;
  }

  rename(title: string) {
    this.validateTitle(title);
    this.apply(
      new ToDoRenamedEvent({
        title,
        todoId: this.id,
        version: ++this._version,
      }),
    );
  }

  onToDoRenamedEvent(event: ToDoRenamedEvent) {
    this._version = event.version;
    this.title = event.title;
  }

  complete() {
    this.apply(
      new ToDoCompletedEvent({
        done: true,
        todoId: this.id,
        version: ++this._version,
      }),
    );
  }

  onToDoCompletedEvent(event: ToDoCompletedEvent) {
    this._version = event.version;
    this.done = event.done;
  }

  validateTitle(title: string) {
    if (/banana/gi.test(title)) {
      throw new BadRequestException('Title can not include banana');
    }
  }
}
