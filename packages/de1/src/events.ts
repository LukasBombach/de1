import { EventEmitter } from "events";
import Machine from "./machine";

export default class Events {
  private emitter = new EventEmitter();
  private machine: Machine;

  constructor(machine: Machine) {
    this.machine = machine;
  }
}
