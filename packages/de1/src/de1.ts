import Machine from "./machine";
import State from "./state";
import Events, { Event, Listener } from "./events";

export default class DE1 {
  private events = new Events();

  async connect(): Promise<void> {
    await Machine.connect();
  }

  async disconnect(): Promise<void> {
    await Machine.disconnect();
  }

  async turnOn(): Promise<void> {
    await Machine.turnOn();
  }

  async turnOff(): Promise<void> {
    await Machine.turnOff();
  }

  async startEspresso(): Promise<void> {
    await State.start("espresso");
  }

  async stopEspresso(): Promise<void> {
    await State.stop("espresso");
  }

  async startSteam(): Promise<void> {
    await State.start("steam");
  }

  async stopSteam(): Promise<void> {
    await State.stop("steam");
  }

  async startHotWater(): Promise<void> {
    await State.start("hotWater");
  }

  async stopHotWater(): Promise<void> {
    await State.stop("hotWater");
  }

  async startFlushing(): Promise<void> {
    await State.start("hotWaterRinse");
  }

  async stopFlushing(): Promise<void> {
    await State.stop("hotWaterRinse");
  }

  async startDescaling(): Promise<void> {
    await State.start("descale");
  }

  async stopDescaling(): Promise<void> {
    await State.stop("descale");
  }

  async stopEverything(): Promise<void> {
    State.stopEverything();
  }

  async getState(): Promise<string> {
    return await State.getState();
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
