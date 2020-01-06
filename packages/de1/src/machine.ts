import Sblendid, { Peripheral, Service } from "@sblendid/sblendid";
import converters, { Converters } from "./converters";

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
    await this.peripheral!.disconnect();
    this.peripheral = undefined;
    this.service = undefined;
  }

  getService(): Service<Converters> {
    if (!this.service) throw new Error("You need to connect to the DE1");
    return this.service;
  }

  public isConnected(): boolean {
    return Boolean(this.peripheral?.isConnected());
  }
}
