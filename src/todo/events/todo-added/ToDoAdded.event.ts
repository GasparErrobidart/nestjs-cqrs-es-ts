import { DomainEvent } from 'src/framework/DomainEvent';
import { Fact, FactProps } from 'src/framework/Fact';
import { TODO_ENTITY_TYPE, ToDoEntityType } from 'src/todo/ToDo';

export interface ToDoAddedEventPayload {
  todoId: string;
  title: string;
  done: boolean;
}

export type ToDoAddeddEventType = 'todo-added';
export const TO_DO_ADDED_EVENT_TYPE: ToDoAddeddEventType = 'todo-added';

@DomainEvent({ type: TO_DO_ADDED_EVENT_TYPE })
export class ToDoAddedEvent extends Fact<
  ToDoEntityType,
  ToDoAddeddEventType,
  ToDoAddedEventPayload
> {
  readonly type = TO_DO_ADDED_EVENT_TYPE;
  readonly entityType: ToDoEntityType = TODO_ENTITY_TYPE;

  constructor(props: FactProps<ToDoAddedEventPayload>) {
    super(props, props.payload.todoId);
  }
}
