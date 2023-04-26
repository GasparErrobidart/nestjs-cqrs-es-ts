import { DomainEvent } from 'src/framework/DomainEvent';
import { Fact, FactProps } from 'src/framework/Fact';
import { TODO_ENTITY_TYPE, ToDoEntityType } from 'src/todo/ToDo';

export interface ToDoCompletedEventPayload {
  todoId: string;
  done: boolean;
}

export type ToDoCompletedEventType = 'todo-completed';
export const TO_DO_COMPLETED_EVENT_TYPE: ToDoCompletedEventType =
  'todo-completed';

@DomainEvent({ type: TO_DO_COMPLETED_EVENT_TYPE })
export class ToDoCompletedEvent extends Fact<
  ToDoEntityType,
  ToDoCompletedEventType,
  ToDoCompletedEventPayload
> {
  readonly type = TO_DO_COMPLETED_EVENT_TYPE;
  readonly entityType: ToDoEntityType = TODO_ENTITY_TYPE;

  constructor(props: FactProps<ToDoCompletedEventPayload>) {
    super(props, props.payload.todoId);
  }
}
