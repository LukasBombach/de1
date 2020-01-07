import Sblendid, { Peripheral, Service } from "@sblendid/sblendid";
import converters, { Converters } from "./converters";

type FIXME = string;

export default class Machine {
  private static instance?: Machine;
  private peripheral?: Peripheral;
  private service?: Service<Converters>;

  public static getInstance(): Machine {
    if (!Machine.instance) Machine.instance = new Machine();
    return Machine.instance;
  }

  private constructor() {}

  public async connect(): Promise<void> {
    if (this.isConnected()) return;
    this.peripheral = await Sblendid.connect("DE1");
    this.service = await this.peripheral.getService("a000", converters);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected()) return;
    await this.peripheral!.disconnect();
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

  public async read(name: FIXME) {
    const service = this.getService();
    return await service.read(name);
  }

  public async write(name: FIXME, value: string) {
    const service = this.getService();
    await service.write(name, value);
  }

  public isConnected(): boolean {
    return Boolean(this.peripheral?.isConnected());
  }

  private getService(): Service<Converters> {
    const msg = "Not connected to the DE1 (service undefined)";
    if (!this.service) throw new Error(msg);
    return this.service;
  }
}
