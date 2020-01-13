import { EventEmitter } from "events";
import Sblendid, { Peripheral, Service } from "@sblendid/sblendid";
import converters, { Converters, Name, Value, Listener } from "../converters";

interface IEventEmitter {
  on(event: string | symbol, listener: (...args: any[]) => void): any;
  off(event: string | symbol, listener: (...args: any[]) => void): any;
  emit(event: string | symbol, ...args: any[]): void;
}

type EventName = Name | "connected" | "disconnected";
type EventValue<N extends EventName> = N extends Name ? Value<N> : undefined;
type EventListener<N extends EventName> = N extends Name
  ? Listener<N>
  : () => void;

class EventEmitterX {
  private emitter: IEventEmitter;

  constructor(emitter: IEventEmitter) {
    this.emitter = emitter;
  }
}

export default class EventComposer {
  private emitters: Set<IEventEmitter>;
  private handlers = new Map();

  constructor(...emitters: IEventEmitter[]) {
    this.emitters = new Set<IEventEmitter>(emitters);
  }

  on(event: string | symbol, listener: (...args: any[]) => void): void {}

  off(event: string | symbol, listener: (...args: any[]) => void): void {}

  emit(event: string | symbol, ...args: any[]): void {}

  addEmitter(emitter: IEventEmitter, events: string[]): void {
    this.emitters.add(emitter);
  }
}

export class Machine {
  private peripheral?: Peripheral;
  private service?: Service<Converters>;
  private events = new EventHub();

  async connect(): Promise<void> {
    this.peripheral = await Sblendid.connect("DE1");
    this.service = await this.peripheral.getService("a000", converters);
    this.events.addEmitter(this.service!, []);
    this.events.emit("connected");
  }

  on<N extends EventName>(name: N, listener: EventListener<N>): void {
    this.events.on(name, listener);
  }

  off<N extends EventName>(name: N, listener: EventListener<N>): void {
    this.events.off(name, listener);
  }
}
