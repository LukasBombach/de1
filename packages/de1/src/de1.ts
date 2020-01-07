import Machine from "./machine";
import State from "./state";

export default class DE1 {
  private machine = new Machine();
  private state = new State(this.machine);

  async connect(): Promise<void> {
    await this.machine.connect();
  }

  async disconnect(): Promise<void> {
    await this.machine.disconnect();
  }

  async turnOn(): Promise<void> {
    await this.machine.turnOn();
  }

  async turnOff(): Promise<void> {
    await this.machine.turnOff();
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
    await this.state.stopEverything();
  }

  async getState(): Promise<string> {
    return await this.state.getState();
  }

  async getWaterlevel(): Promise<number> {
    const { level } = await this.machine.read("water");
    return level;
  }
}
