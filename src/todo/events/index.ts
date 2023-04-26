import { ToDoAddedEvent } from './todo-added/ToDoAdded.event';
import { ToDoCompletedEvent } from './todo-completed/ToDoCompleted.event';
import { ToDoRenamedEvent } from './todo-renamed/ToDoRenamed.event';

export const ToDoEvents = [
  ToDoAddedEvent,
  ToDoRenamedEvent,
  ToDoCompletedEvent,
];

export const EVENT_TYPES_MAP = {
  'todo-added': ToDoAddedEvent,
  'todo-renamed': ToDoRenamedEvent,
  'todo-completed': ToDoCompletedEvent,
};
