import Sblendid, { Peripheral, Service } from "@sblendid/sblendid";
import DE1 from "../src/de1";

describe("de1", () => {
  let de1 = new DE1();
  let readSpy: jest.SpyInstance;
  let writeSpy: jest.SpyInstance;

  const stateFunctions = [["turnOn", "sleep", "idle", "not sleep"]];

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

  test.each(stateFunctions.map(([f, s, e]) => [f, s, e]))(
    `%s sets the machine to "%s" if the state is "%s"`,
    async (fn, state, expected) => {
      readSpy.mockResolvedValueOnce(state);
      await expect((de1 as any)[fn]()).resolves.toBe(undefined);
      expect(writeSpy).toHaveBeenCalledWith("state", expected);
    },
  );

  test.each(stateFunctions.map(([f, , , u]) => [f, u]))(
    `%s doesn't change the machine's state if the state is "%s"`,
    async (fn, unless) => {
      readSpy.mockResolvedValueOnce(unless);
      await expect((de1 as any)[fn]()).resolves.toBe(undefined);
      expect(writeSpy).not.toHaveBeenCalled();
    },
  );

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
