import Sblendid, {
  Peripheral,
  Service,
  Names,
  PickValue
} from "@sblendid/sblendid";
import converters, { Converters } from "./converters";

export default class Machine {
  private peripheral?: Peripheral;
  private service?: Service<Converters>;

  public async connect(): Promise<void> {
    if (this.isConnected()) return;
    this.peripheral = await Sblendid.connect("DE1");
    this.service = await this.peripheral.getService("a000", converters);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected()) return;
    await this.getPeripheral().disconnect();
    this.peripheral = undefined;
    this.service = undefined;
  }

  public async turnOn(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "sleep") await this.write("state", "idle");
  }

  public async turnOff(): Promise<void> {
    await this.write("state", "sleep");
  }

  public async read<N extends Names<Converters>>(
    name: N
  ): Promise<PickValue<Converters, N>> {
    const service = this.getService();
    return await service.read(name);
  }

  public async write<N extends Names<Converters>>(
    name: N,
    value: PickValue<Converters, N>
  ): Promise<void> {
    const service = this.getService();
    await service.write(name, value);
  }

  public isConnected(): boolean {
    return Boolean(this.peripheral?.isConnected());
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
