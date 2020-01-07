import Machine from "./machine";
import State from "./state";
import Events, { Event, Listener } from "./events";

export default class DE1 {
  private state = new State();
  private events = new Events();

  async connect(): Promise<void> {
    await Machine.connect();
    this.events.emit("connected");
  }

  async disconnect(): Promise<void> {
    await Machine.disconnect();
    this.events.emit("disconnected");
  }

  async turnOn(): Promise<void> {
    await Machine.turnOn();
    this.events.emit("turnedOn");
  }

  async turnOff(): Promise<void> {
    await Machine.turnOff();
    this.events.emit("turnedOff");
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
    const { level } = await Machine.read("water");
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
}
