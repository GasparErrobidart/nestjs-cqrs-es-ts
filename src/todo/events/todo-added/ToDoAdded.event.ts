import { IEvent } from 'src/framework/EventStore';

export interface ToDoAddedEventProps {
  todoId: string;
  title: string;
  done: boolean;
  version: number;
}

export class ToDoAddedEvent implements IEvent {
  public readonly type: string = 'todo-added';
  public readonly todoId: string;
  public readonly title: string;
  public readonly done: boolean;
  public readonly version: number;

  constructor(props: ToDoAddedEventProps) {
    this.todoId = props.todoId;
    this.title = props.title;
    this.done = props.done;
    this.version = props.version;
  }

  get id() {
    return this.todoId;
  }
}
