import { BadRequestException, Type } from '@nestjs/common';
import {
  TO_DO_ADDED_EVENT_TYPE,
  ToDoAddedEvent,
} from './events/todo-added/ToDoAdded.event';
import { Aggregate } from 'src/framework/Aggregate';
import { AnyFact } from 'src/framework/Fact';
import { IEventHandler } from '@nestjs/cqrs';
import {
  TO_DO_RENAMED_EVENT_TYPE,
  ToDoRenamedEvent,
} from './events/todo-renamed/ToDoRenamed.event';
import {
  TO_DO_COMPLETED_EVENT_TYPE,
  ToDoCompletedEvent,
} from './events/todo-completed/ToDoCompleted.event';

export type ToDoEntityType = 'ToDo';
export const TODO_ENTITY_TYPE: ToDoEntityType = 'ToDo';

export class ToDo extends Aggregate {
  public id: string;
  public title: string;
  public done: boolean;

  constructor() {
    super();
  }

  create(title: string) {
    this.validateTitle(title);
    const id = Date.now().toString();
    const done = false;
    this.apply(
      new ToDoAddedEvent({
        payload: {
          todoId: id,
          title,
          done,
        },
        version: this.generateNextVersion(),
      }),
    );
  }

  protected applyAddedEvent(event: ToDoAddedEvent) {
    this._version = event.version;
    this.title = event.payload.title;
    this.done = event.payload.done;
    this.id = event.payload.todoId;
  }

  rename(title: string) {
    this.validateTitle(title);
    this.apply(
      new ToDoRenamedEvent({
        payload: {
          todoId: this.id,
          title,
        },
        version: this.generateNextVersion(),
      }),
    );
  }

  protected applyRenamedEvent(event: ToDoRenamedEvent) {
    this._version = event.version;
    this.title = event.payload.title;
  }

  complete() {
    this.apply(
      new ToDoCompletedEvent({
        payload: {
          done: true,
          todoId: this.id,
        },
        version: this.generateNextVersion(),
      }),
    );
  }

  applyCompletedEvent(event: ToDoCompletedEvent) {
    this._version = event.version;
    this.done = event.payload.done;
  }

  validateTitle(title: string) {
    if (/banana/gi.test(title)) {
      throw new BadRequestException('Title can not include banana');
    }
  }

  protected override getEventHandler(
    event: AnyFact,
  ): Type<IEventHandler> | undefined {
    switch (event.type) {
      case TO_DO_ADDED_EVENT_TYPE: {
        return this.applyAddedEvent.bind(this);
      }
      case TO_DO_RENAMED_EVENT_TYPE: {
        return this.applyRenamedEvent.bind(this);
      }
      case TO_DO_COMPLETED_EVENT_TYPE: {
        return this.applyCompletedEvent.bind(this);
      }
    }
  }
}
