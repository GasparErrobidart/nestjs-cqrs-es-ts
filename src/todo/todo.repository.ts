import { Injectable } from '@nestjs/common';
import { TODO_ENTITY_TYPE, ToDo, ToDoEntityType } from './ToDo';
import { Repository } from 'src/framework/Repository';
import { EventStore } from 'src/framework/EventStore';

@Injectable()
export class ToDoRepository extends Repository<ToDoEntityType, ToDo> {
  readonly classConstructor = ToDo;
  readonly aggregateType = TODO_ENTITY_TYPE;

  constructor(public readonly eventStore: EventStore) {
    super();
  }
}
