import { Type } from '@nestjs/common';
import { AggregateRoot, IEventHandler } from '@nestjs/cqrs';
import { AnyFact } from 'src/framework/Fact';

export abstract class Aggregate extends AggregateRoot<AnyFact> {
  protected _version = -1;

  protected get version() {
    return this._version;
  }

  protected generateNextVersion() {
    const newVersion = this._version + 1;
    this._version = newVersion;
    return newVersion;
  }

  protected abstract override getEventHandler(
    event: AnyFact,
  ): Type<IEventHandler> | undefined;
}
