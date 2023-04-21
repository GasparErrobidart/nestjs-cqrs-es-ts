import { ToDo } from 'src/todo/ToDo';
import { ApiToDo, ReadTodoResultDTO } from './read-todo-result';

export class ListTodoResultDTO {
  todos: ApiToDo[];

  constructor(todos: ToDo[]) {
    this.todos = todos.map((todo) => new ReadTodoResultDTO(todo).todo);
  }
}
