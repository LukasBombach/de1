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

class DE1 {
  static async connect(): Promise<DE1> {}

  async connect(): Promise<void> {}
  async disconnect(): Promise<void> {}

  async turnOn(): Promise<void> {}
  async turnOff(): Promise<void> {}

  async startEspresso(): Promise<void> {}
  async stopEspresso(): Promise<void> {}

  async startSteam(): Promise<void> {}
  async stopSteam(): Promise<void> {}

  async startHotWater(): Promise<void> {}
  async stopHotWater(): Promise<void> {}

  async startFlushing(): Promise<void> {}
  async stopFlushing(): Promise<void> {}

  async startDescaling(): Promise<void> {}
  async stopDescaling(): Promise<void> {}

  async getState(): Promise<De1State> {}
  async getTemperature(): Promise<number> {}
  async getWaterlevel(): Promise<number> {}

  async getEspressoSettings(): Promise<De1EspressoSettings> {}
  async setEspressoSettings(settings: De1EspressoSettings): Promise<void> {}

  async getSteamSettings(): Promise<De1SteamSettings> {}
  async setSteamSettings(settings: De1SteamSettings): Promise<void> {}

  async getHotWaterSettings(): Promise<De1HotWaterSettings> {}
  async setHotWaterSettings(settings: De1HotWaterSettings): Promise<void> {}

  async on(event: De1Event, listener: De1Listener): Promise<void> {}
  async off(event: De1Event, listener: De1Listener): Promise<void> {}

  getBleAdapter(): Service<De1Converters> {}

  toString(): string {}
}
