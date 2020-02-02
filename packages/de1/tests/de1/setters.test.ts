import { Service } from "@sblendid/sblendid";
import DE1 from "../../src/de1";

describe("de1 getters", () => {
  const de1 = new DE1();

  beforeAll(async () => {
    await de1.connect();
  });

  afterAll(async () => {
    await de1.disconnect();
  });

  test("set writesa a value to the machine", async () => {
    const name = "state";
    const value = "idle";
    const spy = jest.spyOn(de1["machine"], "write");
    await expect(de1.set(name, value)).resolves.toBeUndefined();
    expect(spy).toHaveBeenCalledWith(name, value);
    spy.mockRestore();
  });
});
