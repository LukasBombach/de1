import { Service } from "@sblendid/sblendid";
import DE1 from "../../src/de1";

describe("de1 getters", () => {
  const de1 = new DE1();
  let readSpy: jest.SpyInstance;

  beforeAll(async () => {
    readSpy = jest.spyOn(Service.prototype, "read");
    await de1.connect();
  });

  beforeEach(async () => {
    readSpy.mockReset();
  });

  afterAll(async () => {
    await de1.disconnect();
    readSpy.mockRestore();
  });

  test.each`
    state              | substate     | expected
    ${"sleep"}         | ${undefined} | ${"sleep"}
    ${"goingToSleep"}  | ${undefined} | ${"goingToSleep"}
    ${"idle"}          | ${undefined} | ${"idle"}
    ${"busy"}          | ${undefined} | ${"busy"}
    ${"espresso"}      | ${undefined} | ${"espresso"}
    ${"espresso"}      | ${"heating"} | ${"heating"}
    ${"steam"}         | ${undefined} | ${"steam"}
    ${"hotWater"}      | ${undefined} | ${"hotWater"}
    ${"shortCal"}      | ${undefined} | ${"shortCal"}
    ${"selfTest"}      | ${undefined} | ${"selfTest"}
    ${"longCal"}       | ${undefined} | ${"longCal"}
    ${"descale"}       | ${undefined} | ${"descale"}
    ${"fatalError"}    | ${undefined} | ${"fatalError"}
    ${"init"}          | ${undefined} | ${"init"}
    ${"noRequest"}     | ${undefined} | ${"noRequest"}
    ${"skipToNext"}    | ${undefined} | ${"skipToNext"}
    ${"hotWaterRinse"} | ${undefined} | ${"hotWaterRinse"}
    ${"steamRinse"}    | ${undefined} | ${"steamRinse"}
    ${"refill"}        | ${undefined} | ${"refill"}
    ${"clean"}         | ${undefined} | ${"clean"}
    ${"inBootLoader"}  | ${undefined} | ${"inBootLoader"}
    ${"airPurge"}      | ${undefined} | ${"airPurge"}
  `("getState returns $expected", async ({ state, substate, expected }) => {
    readSpy.mockImplementationOnce(chcr =>
      chcr === "stateInfo" ? { state, substate } : null,
    );
    await expect(de1.getState()).resolves.toBe(expected);
  });

  test("getState returns disconnected if the machine is disconnected", async () => {
    await de1.disconnect();
    await expect(de1.getState()).resolves.toBe("disconnected");
    await de1.connect();
  });

  // todo bad any typecast
  test.each`
    fn                   | chcr              | mock                  | expected
    ${"getWaterLevel"}   | ${"water"}        | ${{ level: 100 }}     | ${100}
    ${"getMixTemp"}      | ${"shot"}         | ${{ mixTemp: 100 }}   | ${100}
    ${"getHeadTemp"}     | ${"shot"}         | ${{ headTemp: 100 }}  | ${100}
    ${"getSteamTemp"}    | ${"shot"}         | ${{ steamTemp: 100 }} | ${100}
    ${"getShotSettings"} | ${"shotSettings"} | ${{ foo: "bar" }}     | ${{ foo: "bar" }}
    ${"getVersions"}     | ${"versions"}     | ${{ foo: "bar" }}     | ${{ foo: "bar" }}
  `("$fn returns $expected", async ({ fn, chcr, mock, expected }) => {
    readSpy.mockImplementationOnce(name => (name === chcr ? mock : undefined));
    await expect((de1 as any)[fn]()).resolves.toStrictEqual(expected);
  });
});
