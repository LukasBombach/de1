import Sblendid, { Peripheral, Service } from "@sblendid/sblendid";
import converters, { Converters, Name, Value, Listener } from "./converters";

export default class Machine {
  private peripheral?: Peripheral;
  private service?: Service<Converters>;

  async connect(): Promise<void> {
    if (this.isConnected()) return;
    this.peripheral = await Sblendid.connect("DE1");
    this.service = await this.peripheral.getService("a000", converters);
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected()) return;
    await this.getPeripheral().disconnect();
    this.peripheral = undefined;
    this.service = undefined;
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

  on<N extends Name>(name: N, listener: Listener<N>): void {
    this.getService().on(name, listener);
  }

  off<N extends Name>(name: N, listener: Listener<N>): void {
    this.getService().off(name, listener);
  }

  isConnected(): boolean {
    if (!this.peripheral) return false;
    return this.peripheral.isConnected();
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
