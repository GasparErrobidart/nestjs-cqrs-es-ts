import { IEvent } from 'src/framework/EventStore';

export interface ToDoCompletedEventProps {
  todoId: string;
  done: boolean;
  version: number;
}

export class ToDoCompletedEvent implements IEvent {
  public readonly type: string = 'todo-completed';
  public readonly todoId: string;
  public readonly done: boolean;
  public readonly version: number;

  constructor(props: ToDoCompletedEventProps) {
    this.todoId = props.todoId;
    this.done = props.done;
    this.version = props.version;
  }

  get id() {
    return this.todoId;
  }
}
