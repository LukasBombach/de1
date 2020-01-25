import Machine from "./machine";
import State, { ExtendedStates } from "./state";
import converters, { Name, Listener, Value } from "./converters";

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

  async getState(): Promise<ExtendedStates> {
    return await this.state.getState();
  }

  async getWaterLevel(): Promise<number> {
    const { level } = await this.machine.read("water");
    return level;
  }

  async getMixTemp(): Promise<Value<"shot">["mixTemp"]> {
    const { mixTemp } = await this.get("shot");
    return mixTemp;
  }

  async getHeadTemp(): Promise<Value<"shot">["headTemp"]> {
    const { headTemp } = await this.get("shot");
    return headTemp;
  }

  async getSteamTemp(): Promise<Value<"shot">["steamTemp"]> {
    const { steamTemp } = await this.get("shot");
    return steamTemp;
  }

  async getShotSettings(): Promise<Value<"shotSettings">> {
    return await this.get("shotSettings");
  }

  async setShotSettings(
    settings: Partial<Value<"shotSettings">>,
  ): Promise<void> {
    await this.set("shotSettings", settings);
  }

  async getVersions(): Promise<Value<"versions">> {
    return await this.get("versions");
  }

  async get<N extends Name>(name: N): Promise<Value<N>> {
    return await this.machine.read(name);
  }

  async set<N extends Name>(name: N, value: Partial<Value<N>>): Promise<void> {
    this.validateValue(name, value);
    const mergedValue = await this.mergeCurrentValue(name, value);
    await this.machine.write(name, mergedValue);
  }

  on<N extends Name>(name: N, listener: Listener<N>): void {
    this.machine.on(name, listener);
  }

  off<N extends Name>(name: N, listener: Listener<N>): void {
    this.machine.off(name, listener);
  }

  // todo unlawful any
  private validateValue(name: Name, value: any): void {
    const { encode, validate } = converters[name];
    if (typeof encode === "undefined") {
      throw new Error(`${name} is not settable`);
    }
    if (typeof validate === "undefined") {
      throw new Error(`${name} cannot be validated`);
    }
    if (!validate(value)) {
      throw new Error(`Invalid value for ${name}`);
    }
  }

  private async mergeCurrentValue<N extends Name>(
    name: N,
    value: Partial<Value<N>>,
  ): Promise<Value<N>> {}
}
