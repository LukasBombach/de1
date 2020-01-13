export type TEvent = string | symbol;
export type TEventMap = Record<TEvent, (...args: any[]) => any>;

export interface IEventEmitter {
  on(event: TEvent, listener: (...args: any[]) => void): any;
  off(event: TEvent, listener: (...args: any[]) => void): any;
  emit(event: TEvent, ...args: any[]): void;
}

export interface IEventEmitterWithMap extends IEventEmitter {
  events: TEvent[] | TEventMap;
}

export function mapEvents(
  eventEmitter: IEventEmitter,
  events: TEvent[] | TEventMap,
): IEventEmitterWithMap {}

export function composeEmitters(
  ...emitters: IEventEmitterWithMap[]
): IEventEmitterWithMap {}
