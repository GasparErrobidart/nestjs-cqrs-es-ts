import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoMockPersistenceService } from './todo-mock-persistance.service';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoCommandHandlers } from './commands';
import { TodoQueryHandlers } from './queries';
import { ToDoRepository } from './todo.repository';
import { EventStore } from 'src/framework/EventStore';

@Module({
  imports: [CqrsModule],
  controllers: [TodoController],
  providers: [
    TodoMockPersistenceService,
    ToDoRepository,
    EventStore,
    ...TodoCommandHandlers,
    ...TodoQueryHandlers,
  ],
})
export class TodoModule {}
