import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Attribute,
  AutoGenerateAttribute,
  Entity,
} from '@typedorm/common';

export interface FactProps<PayloadType extends object> {
  version: number;
  payload: PayloadType;
  timestamp?: number;
  partitionKey?: string;
  tags?: { [key: string]: string | number };
  raw?: any;
  eem?: any;
}

export type AnyFact = Fact<string, string, object>;

@Entity({
  name: 'EVENT',
  primaryKey: {
    partitionKey: 'EVENT#{{entityType}}',
    sortKey: '{{entityId}}#version#{{version}}',
  },
})
export class Fact<
  EntityType extends string,
  EventType extends string,
  PayloadType extends object,
> {
  @Attribute()
  readonly entityType: EntityType;

  @Attribute()
  readonly entityId: string;

  @Attribute()
  readonly version: number;

  @Attribute()
  readonly timestamp: number;

  @Attribute()
  readonly type: EventType;

  @Attribute()
  readonly createdBy: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  })
  private readonly createdAt: string;

  @Attribute()
  readonly payload: PayloadType;

  // Partition key can be used for sharding, grouping related events together
  readonly partitionKey?: string;

  @Attribute()
  // Tags have additional information such as source, function name, etc.
  readonly tags?: { [key: string]: string | number };
  // Raw preserves data and format produced by the source of the event. Used as an in-process backup, not meant for persistence
  readonly raw?: any;

  @Attribute()
  // Envelope Encryption Metadata, not implemented anywhere yet. Meant to store reference to encryption keys, hold reference to the encripted fields.
  readonly eem?: any;

  constructor(props: FactProps<PayloadType>, entityId: string) {
    this.entityId = entityId;
    this.version = props.version;
    this.timestamp = props?.timestamp ?? Date.now();
    this.payload = props.payload;
    this.partitionKey = props.partitionKey;
    this.tags = props.tags;
    this.raw = props.raw;
    this.eem = props.eem;
  }

  get entityPk() {
    return `${this.entityType}#${this.entityId}`;
  }
}
