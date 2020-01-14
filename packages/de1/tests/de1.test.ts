import DE1 from "../src/de1";

describe("de1", () => {
  it("can be instantiated", () => {
    expect(() => new DE1()).not.toThrow();
  });

  // async connect(): Promise<void>
  // async disconnect(): Promise<void>
  // async turnOn(): Promise<void>
  // async turnOff(): Promise<void>
  // async startEspresso(): Promise<void>
  // async stopEspresso(): Promise<void>
  // async startSteam(): Promise<void>
  // async stopSteam(): Promise<void>
  // async startHotWater(): Promise<void>
  // async stopHotWater(): Promise<void>
  // async startFlushing(): Promise<void>
  // async stopFlushing(): Promise<void>
  // async startDescaling(): Promise<void>
  // async stopDescaling(): Promise<void>
  // async stopEverything(): Promise<void>
  // async getState(): Promise<ExtendedStates>
  // async getWaterLevel(): Promise<number>
  // on<N extends Name>(name: N, listener: Listener<N>): void
  // off<N extends Name>(name: N, listener: Listener<N>): void
});
