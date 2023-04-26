import { AnyFact } from './Fact';
import { DuplicateDomainEventType } from './errors';

export type Constructor<Entity extends object> = new (...args) => Entity;

class EventEntityMapper {
  private entityMap: { [key: string]: Constructor<any> } = {};

  getEntities() {
    return Object.values(this.entityMap);
  }

  addMapRecord<Entity extends object>(
    key: string,
    entity: Constructor<Entity>,
  ) {
    if (this.entityMap.hasOwnProperty(key)) {
      throw new DuplicateDomainEventType();
    }
    this.entityMap[key] = entity;
  }

  fromEventType(event: AnyFact) {
    const { type } = event;
    const TypeConstructor = this.entityMap[type];
    if (!TypeConstructor) return event;
    return new TypeConstructor(event);
  }
}

export default new EventEntityMapper();
