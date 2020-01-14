import Sblendid, { Peripheral, Service } from "@sblendid/sblendid";
import DE1 from "../src/de1";

describe("de1", () => {
  let de1 = new DE1();
  let readSpy: jest.SpyInstance;
  let writeSpy: jest.SpyInstance;

  beforeAll(() => {
    readSpy = jest.spyOn(Service.prototype, "read");
    writeSpy = jest.spyOn(Service.prototype, "write");
  });

  beforeEach(async () => {
    readSpy.mockReset();
    writeSpy.mockReset();
    await de1.connect();
  });

  afterAll(async () => {
    await de1.disconnect();
    readSpy.mockRestore();
    writeSpy.mockRestore();
  });

  it("can be instantiated", () => {
    expect(() => new DE1()).not.toThrow();
  });

  it("connects to the DE1 machine", async () => {
    const spy = jest.spyOn(Sblendid, "connect");
    const de1 = new DE1();
    await expect(de1.connect()).resolves.toBe(undefined);
    expect(spy).toHaveBeenCalledWith("DE1");
    await de1.disconnect();
    spy.mockRestore();
  });

  it("disconnects from the DE1 machine", async () => {
    const spy = jest.spyOn(Peripheral.prototype, "disconnect");
    const de1 = new DE1();
    await de1.connect();
    await expect(de1.disconnect()).resolves.toBe(undefined);
    expect(spy).toHaveBeenCalledWith();
    spy.mockRestore();
  });

  it("turns machine on", async () => {
    readSpy.mockResolvedValue("sleep");
    await expect(de1.turnOn()).resolves.toBe(undefined);
    expect(writeSpy).toHaveBeenCalledWith("state", "idle");
  });

  it("doesn't turn machine on if it's not sleeping", async () => {
    readSpy.mockResolvedValue("espresso");
    await expect(de1.turnOn()).resolves.toBe(undefined);
    expect(writeSpy).not.toHaveBeenCalled();
  });

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
