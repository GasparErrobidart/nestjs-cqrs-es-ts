import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from '@typedorm/core';
import { config } from 'aws-sdk';
import { eventStoreTable } from './EventStoreTable';
import { Fact } from '../Fact';
import EventEntityMapper from '../EventEntityMapper';

@Injectable()
export class DynamoOrm {
  private connection?: Connection;

  constructor() {
    this.setup();
  }

  get eventTableClient() {
    if (!this.connection) {
      this.connection = createConnection({
        table: eventStoreTable,
        entities: [Fact, ...EventEntityMapper.getEntities()],
      });
    }
    return this.connection.entityManager;
  }

  setup() {
    config.update({
      region: 'local',
      dynamodb: {
        endpoint: 'http://localhost:8000',
      },
    });
  }
}
