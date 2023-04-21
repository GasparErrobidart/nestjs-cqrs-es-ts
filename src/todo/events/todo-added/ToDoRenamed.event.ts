import { IEvent } from 'src/framework/EventStore';

export interface ToDoRenamedEventProps {
  todoId: string;
  title: string;
  version: number;
}

export class ToDoRenamedEvent implements IEvent {
  public readonly type: string = 'todo-renamed';
  public readonly todoId: string;
  public readonly title: string;
  public readonly version: number;

  constructor(props: ToDoRenamedEventProps) {
    this.todoId = props.todoId;
    this.title = props.title;
    this.version = props.version;
  }

  get id() {
    return this.todoId;
  }
}
