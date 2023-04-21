import { AddTodoHandler } from './add-todo/add-todo.handler';
import { CompleteTodoHandler } from './complete-todo/complete-todo.handler';
import { RenameTodoHandler } from './rename-todo/rename-todo.handler';

export const TodoCommandHandlers = [
  AddTodoHandler,
  CompleteTodoHandler,
  RenameTodoHandler,
];
