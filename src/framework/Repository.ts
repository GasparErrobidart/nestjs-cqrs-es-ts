import { Aggregate } from './Aggregate';
import { Constructor } from './EventEntityMapper';
import { EventStore } from './EventStore';
import { AnyFact } from './Fact';

export abstract class Repository<
  AggregateType extends string,
  AggregateClass extends Aggregate,
> {
  abstract readonly aggregateType: AggregateType;
  abstract readonly classConstructor: Constructor<AggregateClass>;
  abstract readonly eventStore: EventStore;

  async persist(aggregate: AggregateClass) {
    await this.eventStore.append(aggregate.getUncommittedEvents());
    aggregate.commit();
  }

  async findAll(): Promise<AggregateClass[]> {
    const events = await this.eventStore.find({
      aggregateType: this.aggregateType,
    });
    const eventsByAggregate = this.groupEventsByAggregatePartition(events);
    return Object.values(eventsByAggregate).map(this.fromEvents.bind(this));
  }

  async findById(id: string) {
    const events = await this.eventStore.find({
      aggregateType: this.aggregateType,
      aggregateId: id,
    });
    if (!events?.length) return undefined;
    return this.fromEvents(events);
  }

  fromEvents(events: AnyFact[]): AggregateClass {
    const aggregate = new this.classConstructor();
    aggregate.loadFromHistory(events);
    aggregate.uncommit();
    return aggregate;
  }

  groupEventsByAggregatePartition(events: AnyFact[]) {
    const groups: { [key: string]: AnyFact[] } = {};
    events.forEach((ev) => {
      if (!groups[ev.entityPk]) groups[ev.entityPk] = [];
      groups[ev.entityPk].push(ev);
    });
    return groups;
  }
}
