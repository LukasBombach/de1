import { EventEmitter } from "events";
import Sblendid, { Peripheral, Service } from "@sblendid/sblendid";
import converters, { Converters, Name, Value, Listener } from "./converters";

export type EventName = Name | "connected" | "disconnected";
export type EventValue<N extends EventName> = N extends Name
  ? Value<N>
  : undefined;
export type EventListener<N extends EventName> = N extends Name
  ? Listener<N>
  : () => void;

export default class Machine {
  private peripheral?: Peripheral;
  private service?: Service<Converters>;
  private events = new EventEmitter();

  async connect(): Promise<void> {
    if (this.isConnected()) return;
    this.peripheral = await Sblendid.connect("DE1");
    this.service = await this.peripheral.getService("a000", converters);
    this.emit("connected");
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected()) return;
    await this.getPeripheral().disconnect();
    this.peripheral = undefined;
    this.service = undefined;
    this.emit("disconnected");
  }

  async turnOn(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "sleep") await this.write("state", "idle");
  }

  async turnOff(): Promise<void> {
    await this.write("state", "sleep");
  }

  async read<N extends Name>(name: N): Promise<Value<N>> {
    return await this.getService().read(name);
  }

  async write<N extends Name>(name: N, value: Value<N>): Promise<void> {
    await this.getService().write(name, value);
  }

  on<N extends EventName>(name: N, listener: EventListener<N>): void {
    this.events.on(name, listener);
  }

  off<N extends EventName>(name: N, listener: EventListener<N>): void {
    this.events.off(name, listener);
  }

  isConnected(): boolean {
    if (!this.peripheral) return false;
    return this.peripheral.isConnected();
  }

  private emit<N extends EventName>(name: N, value?: EventValue<N>): void {
    this.events.emit(name, value);
  }

  private getPeripheral(): Peripheral {
    const msg = "Not connected to the DE1 (peripheral undefined)";
    if (!this.peripheral) throw new Error(msg);
    return this.peripheral;
  }

  private getService(): Service<Converters> {
    const msg = "Not connected to the DE1 (service undefined)";
    if (!this.service) throw new Error(msg);
    return this.service;
  }
}
