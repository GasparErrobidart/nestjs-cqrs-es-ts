import { Injectable } from '@nestjs/common';
import { AnyFact, Fact } from './Fact';
import EventEntityMapper from './EventEntityMapper';
import { DynamoOrm } from './dynamodb/DynamoOrm';

export interface FindEventsRequest {
  aggregateType: string;
  aggregateId?: string;
  version?: number;
}

@Injectable()
export class EventStore {
  constructor(private dynamo: DynamoOrm) {}

  private getClient() {
    return this.dynamo.eventTableClient;
  }

  async find(request: FindEventsRequest) {
    const response = await this.getClient().find(Fact, {
      entityType: request.aggregateType,
      entityId: request.aggregateId,
      version: request.version,
    });
    return response?.items.map((event) =>
      EventEntityMapper.fromEventType(event),
    );
  }

  async append(events: AnyFact[]) {
    for (const event of events) {
      await this.getClient().create(event, {
        /* 
          IMPORTANT!!
          We never ever ever ever want to overwrite existing events.
          A new event means a new version number, we don't want to overwrite versions EVER!
        */
        overwriteIfExists: false,
      });
    }
  }
}
