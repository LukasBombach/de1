import { Service } from "@sblendid/sblendid";
import { Converters } from "./converters";
import Events, { Event, Listener } from "./events";
import Machine from "./machine";
import State from "./state";

export default class DE1 {
  private machine = new Machine();
  private state = new State();
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
    const currentState = await this.state.read();
    if (currentState === "sleep") await this.state.write("idle");
  }

  async turnOff(): Promise<void> {
    await this.state.write("sleep");
  }

  async startEspresso(): Promise<void> {
    await this.state.start("espresso");
  }

  async stopEspresso(): Promise<void> {
    await this.state.stop("espresso");
  }

  async startSteam(): Promise<void> {
    await this.state.start("steam");
  }

  async stopSteam(): Promise<void> {
    await this.state.stop("steam");
  }

  async startHotWater(): Promise<void> {
    await this.state.start("hotWater");
  }

  async stopHotWater(): Promise<void> {
    await this.state.stop("hotWater");
  }

  async startFlushing(): Promise<void> {
    await this.state.start("hotWaterRinse");
  }

  async stopFlushing(): Promise<void> {
    await this.state.stop("hotWaterRinse");
  }

  async startDescaling(): Promise<void> {
    await this.state.start("descale");
  }

  async stopDescaling(): Promise<void> {
    await this.state.stop("descale");
  }

  async stopEverything(): Promise<void> {
    this.state.stopEverything();
  }

  async getState(): Promise<string> {
    return await this.state.getState();
  }

  async getWaterlevel(): Promise<number> {
    const { level } = await this.service.read("water");
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
}
