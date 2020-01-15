import { Service } from "@sblendid/sblendid";
import DE1 from "../../src/de1";

describe("de1 mode functions", () => {
  const de1 = new DE1();
  let readSpy: jest.SpyInstance;
  let writeSpy: jest.SpyInstance;

  beforeAll(async () => {
    readSpy = jest.spyOn(Service.prototype, "read");
    writeSpy = jest.spyOn(Service.prototype, "write");
    await de1.connect();
  });

  beforeEach(async () => {
    readSpy.mockReset();
    writeSpy.mockReset();
  });

  afterAll(async () => {
    await de1.disconnect();
    readSpy.mockRestore();
    writeSpy.mockRestore();
  });

  test.each`
    fn                  | state
    ${"startEspresso"}  | ${"espresso"}
    ${"startSteam"}     | ${"steam"}
    ${"startHotWater"}  | ${"hotWater"}
    ${"startFlushing"}  | ${"hotWaterRinse"}
    ${"startDescaling"} | ${"descale"}
    ${"turnOff"}        | ${"sleep"}
  `("$fn sets the machine's state to $state", async ({ fn, state }) => {
    await expect((de1 as any)[fn]()).resolves.toBeUndefined();
    expect(writeSpy).toHaveBeenCalledWith("state", state);
  });

  test.each`
    fn                 | state
    ${"stopEspresso"}  | ${"espresso"}
    ${"stopSteam"}     | ${"steam"}
    ${"stopHotWater"}  | ${"hotWater"}
    ${"stopFlushing"}  | ${"hotWaterRinse"}
    ${"stopDescaling"} | ${"descale"}
    ${"turnOn"}        | ${"sleep"}
  `(
    "$fn doesn't change the machine's state if the state is not $state",
    async ({ fn, state }) => {
      readSpy.mockResolvedValueOnce(`not ${state}`);
      await expect((de1 as any)[fn]()).resolves.toBeUndefined();
      expect(writeSpy).not.toHaveBeenCalled();
    },
  );

  // async stopEverything(): Promise<void>
});
