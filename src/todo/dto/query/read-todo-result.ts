import { ToDo } from 'src/todo/ToDo';

export interface ApiToDo {
  id: string;
  title: string;
  done: boolean;
}

export class ReadTodoResultDTO {
  todo: ApiToDo;

  constructor(todo: ToDo) {
    this.todo = {
      id: todo.id,
      title: todo.title,
      done: todo.done,
    };
  }
}
