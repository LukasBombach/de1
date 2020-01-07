import Sblendid, { Peripheral, Service } from "@sblendid/sblendid";
import converters, { Converters } from "./converters";

type FIXME = string;
type FIXME2 = any;

export default class Machine {
  private static peripheral?: Peripheral;
  private static service?: Service<Converters>;

  public static async connect(): Promise<void> {
    if (Machine.isConnected()) return;
    Machine.peripheral = await Sblendid.connect("DE1");
    Machine.service = await Machine.peripheral.getService("a000", converters);
  }

  public static async disconnect(): Promise<void> {
    if (!Machine.isConnected()) return;
    await Machine.peripheral!.disconnect();
    Machine.peripheral = undefined;
    Machine.service = undefined;
  }

  public static async turnOn(): Promise<void> {
    const currentState = await Machine.read("state");
    if (currentState === "sleep") await Machine.write("state", "idle");
  }

  public static async turnOff(): Promise<void> {
    await Machine.write("state", "sleep");
  }

  public static async read(name: FIXME): Promise<FIXME2> {
    const service = Machine.getService();
    return await service.read(name);
  }

  public static async write(name: FIXME, value: string): Promise<FIXME2> {
    const service = Machine.getService();
    await service.write(name, value);
  }

  public static isConnected(): boolean {
    return Boolean(Machine.peripheral?.isConnected());
  }

  private static getService(): Service<Converters> {
    const msg = "Not connected to the DE1 (service undefined)";
    if (!Machine.service) throw new Error(msg);
    return Machine.service;
  }
}
