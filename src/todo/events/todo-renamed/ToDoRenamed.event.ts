import { DomainEvent } from 'src/framework/DomainEvent';
import { Fact, FactProps } from 'src/framework/Fact';
import { TODO_ENTITY_TYPE, ToDoEntityType } from 'src/todo/ToDo';

export interface ToDoRenamedEventPayload {
  todoId: string;
  title: string;
}

export type ToDoRenamedEventType = 'todo-renamed';
export const TO_DO_RENAMED_EVENT_TYPE: ToDoRenamedEventType = 'todo-renamed';

@DomainEvent({ type: TO_DO_RENAMED_EVENT_TYPE })
export class ToDoRenamedEvent extends Fact<
  ToDoEntityType,
  ToDoRenamedEventType,
  ToDoRenamedEventPayload
> {
  readonly type = TO_DO_RENAMED_EVENT_TYPE;
  readonly entityType: ToDoEntityType = TODO_ENTITY_TYPE;

  constructor(props: FactProps<ToDoRenamedEventPayload>) {
    super(props, props.payload.todoId);
  }
}
