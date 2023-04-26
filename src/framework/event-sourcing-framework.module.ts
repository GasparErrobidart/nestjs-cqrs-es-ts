import { Module } from '@nestjs/common';
import { EventStore } from './EventStore';
import { DynamoOrm } from './dynamodb/DynamoOrm';

@Module({
  providers: [DynamoOrm, EventStore],
  exports: [DynamoOrm, EventStore],
})
export class EventSourcingFramework {}
