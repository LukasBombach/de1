import { EventEmitter } from "events";
import Machine from "./machine";
import { Name, Value, Listener } from "./converters";

export default class Events {
  private emitter = new EventEmitter();
  private machine: Machine;

  constructor(machine: Machine) {
    this.machine = machine;
    this.on("connected", this.handleConnect.bind(this));
    this.on("disconnected", this.handleDisconnect.bind(this));
  }

  public on<N extends Name>(name: N, listener: Listener<N>): void {
    this.emitter.on(name, listener);
  }

  public off<N extends Name>(name: N, listener: Listener<N>): void {
    this.emitter.off(name, listener);
  }

  public emit<N extends Name>(name: N, value?: Value<N>): void {
    this.emitter.emit(name);
  }

  private handleConnect(): void {
    const service = await this.machine.
  }

  private handleDisconnect(): void {}

  private handleServiceEvent<N extends Name>(name: N, value: Value<N>): void {}
}
