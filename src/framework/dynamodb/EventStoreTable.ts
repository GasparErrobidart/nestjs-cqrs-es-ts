import { Table } from '@typedorm/common';

export const eventStoreTable = new Table({
  name: 'EventStoreLocal',
  partitionKey: 'Pk',
  sortKey: 'Sk',
});
