import { MetadataManager } from '@typedorm/common';
import EventEntityMapper from './EventEntityMapper';
import { Fact } from './Fact';

// eslint-disable-next-line @typescript-eslint/ban-types
type Constructor = { new (...args: any[]): {} };

export function DomainEvent<E>({ type }: { type: string }) {
  return function <E extends Constructor>(target: E) {
    const originalTarget = target;
    const factEntityMetadata =
      MetadataManager.metadataStorage.getRawEntityByTarget(Fact);
    EventEntityMapper.addMapRecord(type, target);

    MetadataManager.metadataStorage.addRawEntity({
      ...factEntityMetadata,
      name: `${type}-${factEntityMetadata.name}`,
      target,
    });

    return originalTarget;
  };
}
