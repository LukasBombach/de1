import { EventEmitter } from "events";
import Machine from "./machine";
import { Name, Listener } from "./converters";

export default class Events {
  private emitter = new EventEmitter();
  private machine: Machine;

  constructor(machine: Machine) {
    this.machine = machine;
  }

  public on<N extends Name>(name: N, listener: Listener<N>): void {
    this.emitter.on(name, listener);
  }

  public off<N extends Name>(name: N, listener: Listener<N>): void {
    this.emitter.off(name, listener);
  }
}
