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
    initial    | fn          | expected
    ${"sleep"} | ${"turnOn"} | ${"idle"}
  `(
    `$fn sets the machine to $expected if the state is $initial`,
    async ({ initial, fn, expected }) => {
      readSpy.mockResolvedValueOnce(initial);
      await expect((de1 as any)[fn]()).resolves.toBeUndefined();
      expect(writeSpy).toHaveBeenCalledWith("state", expected);
    },
  );

  test.each`
    fn          | ifNot
    ${"turnOn"} | ${"sleep"}
  `(
    `$fn doesn't change the machine's state if the state is not $ifNot`,
    async ({ fn, ifNot }) => {
      readSpy.mockResolvedValueOnce(`not ${ifNot}`);
      await expect((de1 as any)[fn]()).resolves.toBeUndefined();
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
});
