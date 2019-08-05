import Sblendid, { Peripheral, Service, Value, Listener } from "sblendid";
import converters, {
  Converters,
  State,
  Water,
  Versions,
  Shot,
  ShotSettings,
  StateInfo
} from "./converters";

type De1State =
  | "disconnected"
  | "sleep"
  | "heating"
  | "cooling"
  | "idle"
  | "espresso"
  | "steam"
  | "hotWater"
  | "flushing"
  | "descale";

type De1Event = "state" | "temperature" | "waterlevel";
type De1Listener = () => Promise<void> | void;

export default class DE1 {
  private machine?: Peripheral;
  private service?: Service<Converters>;

  static async connect(): Promise<DE1> {
    const de1 = new DE1();
    await de1.connect();
    return de1;
  }

  async connect(): Promise<void> {
    if (this.isConnected()) return;
    this.machine = await Sblendid.connect("DE1");
    this.service = await this.machine.getService("a000", converters);
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected()) return;
    await this.machine!.disconnect();
    this.machine = undefined;
    this.service = undefined;
  }

  async turnOn(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "sleep") await this.write("state", "idle");
  }

  async turnOff(): Promise<void> {
    await this.write("state", "sleep");
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

  async getState(): Promise<De1State> {
    return await this.read("state");
  }

  // async getTemperature(): Promise<number> {}

  async getWaterlevel(): Promise<number> {
    const { level } = await this.read("water");
    return level;
  }

  // async getEspressoSettings(): Promise<De1EspressoSettings> {}
  // async setEspressoSettings(settings: De1EspressoSettings): Promise<void> {}

  // async getSteamSettings(): Promise<De1SteamSettings> {}
  // async setSteamSettings(settings: De1SteamSettings): Promise<void> {}

  // async getHotWaterSettings(): Promise<De1HotWaterSettings> {}
  // async setHotWaterSettings(settings: De1HotWaterSettings): Promise<void> {}

  public async on<E extends keyof Converters>(
    event: De1Event,
    listener: Listener<Converters, E>
  ): Promise<void> {}

  public async off<E extends keyof Converters>(
    event: De1Event,
    listener: Listener<Converters, E>
  ): Promise<void> {}

  public getBleAdapter(): Service<Converters> {
    if (!this.service) throw new Error("DE1 is not connected yet");
    return this.service;
  }

  private isConnected(): boolean {
    if (!this.machine) return false;
    return this.machine.isConnected();
  }

  private async read<N extends keyof Converters>(
    name: N
  ): Promise<Value<Converters, N>> {
    return await this.getBleAdapter().read(name);
  }

  private async write<N extends keyof Converters>(
    name: N,
    value: Value<Converters, N>
  ): Promise<void> {
    await this.getBleAdapter().write(name, value);
  }
}
