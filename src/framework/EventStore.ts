import { Injectable, PreconditionFailedException } from '@nestjs/common';

export interface IEvent {
  type: string;
  id: string;
  version: number;
}

const MOCK_DATA = {
  'event-ToDo#1-v#0': {
    type: 'todo-added',
    title: 'This is a mock todo',
    id: '1',
    todoId: '1',
    version: 0,
    done: false,
  },
  'event-ToDo#2-v#0': {
    type: 'todo-added',
    title: 'This is another todo...',
    id: '2',
    todoId: '2',
    version: 0,
    done: false,
  },
};

@Injectable()
export class EventStore {
  async put(aggregateType: string, events: IEvent[]) {
    this.validateOptimisticLocking(aggregateType, events);
    for (const event of events) {
      const pk = this.createPartitionKey(aggregateType, event);
      MOCK_DATA[pk] = event;
    }
    console.log({ EventStore: MOCK_DATA });
  }

  getEventsForAggregate(aggregateType: string, aggregateId: string) {
    return this.getPartitionsBySuffix(
      `event-${aggregateType}#${aggregateId}-v`,
    );
  }

  getEventsForAllAggregate(aggregateType: string) {
    return this.getPartitionsBySuffix(`event-${aggregateType}#`);
  }

  getPartitionsBySuffix(suffix: string) {
    return Object.keys(MOCK_DATA)
      .filter((pk) => {
        const expression = new RegExp(`^${suffix}`);
        return expression.test(pk);
      })
      .map((key) => MOCK_DATA[key]);
  }

  private validateOptimisticLocking(aggregateType: string, events: IEvent[]) {
    const partitionKeys = events.map((ev) =>
      this.createPartitionKey(aggregateType, ev),
    );
    for (const key of partitionKeys) {
      if (MOCK_DATA.hasOwnProperty(key))
        throw new PreconditionFailedException(
          'Inconsistent event versioning detected.',
        );
    }
  }

  private createPartitionKey(aggregateType: string, { id, version }: IEvent) {
    return `event-${aggregateType}#${id}-v#${version}`;
  }
}
