import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoCommandHandlers } from './commands';
import { TodoQueryHandlers } from './queries';
import { ToDoRepository } from './todo.repository';
import { EventSourcingFramework } from 'src/framework/event-sourcing-framework.module';

@Module({
  imports: [CqrsModule, EventSourcingFramework],
  controllers: [TodoController],
  providers: [ToDoRepository, ...TodoCommandHandlers, ...TodoQueryHandlers],
})
export class TodoModule {}
