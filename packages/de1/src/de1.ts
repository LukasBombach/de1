import { Service } from "@sblendid/sblendid";
import { Converters } from "./converters";
import Events, { Event, Listener } from "./events";
import Machine from "./machine";

export default class DE1 {
  private machine = new Machine();
  private events = new Events();
  private service?: Service<Converters>;

  static async connect(): Promise<DE1> {
    const de1 = new DE1();
    await de1.connect();
    return de1;
  }

  async connect(): Promise<void> {
    await this.machine.connect();
    this.events.emit("connected");
  }

  async disconnect(): Promise<void> {
    await this.machine.disconnect();
    this.events.emit("disconnected");
  }

  async turnOn(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "sleep") await this.write("state", "idle");
  }

  async turnOff(): Promise<void> {
    await this.write("state", "sleep");
  }

  async stopEverything(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState !== "sleep") await this.write("state", "idle");
  }

  async startEspresso(): Promise<void> {
    await this.write("state", "espresso");
  }

  async stopEspresso(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "espresso") await this.write("state", "idle");
  }

  async startSteam(): Promise<void> {
    await this.write("state", "steam");
  }

  async stopSteam(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "steam") await this.write("state", "idle");
  }

  async startHotWater(): Promise<void> {
    await this.write("state", "hotWater");
  }

  async stopHotWater(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "hotWater") await this.write("state", "idle");
  }

  async startFlushing(): Promise<void> {
    await this.write("state", "hotWaterRinse");
  }

  async stopFlushing(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "hotWaterRinse") await this.write("state", "idle");
  }

  async startDescaling(): Promise<void> {
    await this.write("state", "descale");
  }

  async stopDescaling(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "descale") await this.write("state", "idle");
  }

  async getState(): Promise<string> {
    if (!this.isConnected()) return "disconnected";
    const { state, substate } = await this.read("stateInfo");
    if (state === "sleep") return "sleep";
    if (substate === "heating") return "heating";
    if (state === "espresso") return "espresso";
    if (state === "steam") return "steam";
    if (state === "hotWater") return "hotWater";
    if (state === "hotWaterRinse") return "flushing";
    if (state === "descale") return "descale";
    return "idle";
  }

  async getWaterlevel(): Promise<number> {
    const { level } = await this.read("water");
    return level;
  }

  public on<E extends Event>(event: E, listener: Listener<E>): void {
    this.events.on(event, listener);
  }

  public once<E extends Event>(event: E, listener: Listener<E>): void {
    this.events.once(event, listener);
  }

  public off<E extends Event>(event: E, listener: Listener<E>): void {
    this.events.off(event, listener);
  }

  public isConnected(): boolean {
    if (!this.machine) return false;
    return this.machine.isConnected();
  }

  private async read(name: string) {
    return await this.getBleService().read(name);
  }

  private async write(name: string, value: string) {
    await this.getBleService().write(name, value);
  }

  private getBleService(): Service<Converters> {
    if (!this.service) throw new Error("DE1 is not connected yet");
    return this.service;
  }
}
