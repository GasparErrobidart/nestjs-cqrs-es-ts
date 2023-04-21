import { Injectable } from '@nestjs/common';
import { ToDo } from './ToDo';
import { EventStore, IEvent } from 'src/framework/EventStore';
import { EVENT_TYPES_MAP } from './events';

function deserializeEvent(event: IEvent) {
  const EventTypeConstructor = EVENT_TYPES_MAP?.[event.type];
  if (!EventTypeConstructor) return undefined;
  return new EventTypeConstructor(event);
}

const AGGREGATE_TYPE = 'ToDo';

export interface ToDoPatch extends Partial<ToDo> {
  id: string;
}

@Injectable()
export class ToDoRepository {
  constructor(private readonly eventStore: EventStore) {}

  create(title: string) {
    const todo = new ToDo();
    todo.create(title);
  }

  async persist(todo: ToDo) {
    await this.eventStore.put(AGGREGATE_TYPE, todo.getUncommittedEvents());
    todo.commit();
  }

  findById(id: string) {
    const events = this.eventStore
      .getEventsForAggregate(AGGREGATE_TYPE, id)
      .map(deserializeEvent);
    if (!events?.length) return undefined;
    return this.fromEvents(events);
  }

  findAll() {
    const result: { [key: string]: IEvent[] } = {};

    this.eventStore
      .getEventsForAllAggregate(AGGREGATE_TYPE)
      .map(deserializeEvent)
      .forEach((ev) => {
        if (!result[ev.id]) result[ev.id] = [];
        result[ev.id].push(ev);
      });

    return Object.values(result).map(this.fromEvents);
  }

  private fromEvents(events: IEvent[]) {
    const todo = new ToDo();
    todo.loadFromHistory(events);
    todo.uncommit();
    return todo;
  }
}
