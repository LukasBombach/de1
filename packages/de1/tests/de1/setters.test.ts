import DE1 from "../../src/de1";

jest.mock("../../src/converters", () => ({
  noEncode: {},
  noValidate: { encode: () => {} },
  invalid: { validate: () => false },
}));

describe("de1 getters", () => {
  const de1 = new DE1();

  beforeAll(async () => {
    await de1.connect();
  });

  afterAll(async () => {
    await de1.disconnect();
  });

  test.skip("set writes a value to the machine", async () => {
    const name = "state";
    const value = "idle";
    const spy = jest.spyOn(de1["machine"], "write");
    await expect(de1.set(name, value)).resolves.toBeUndefined();
    expect(spy).toHaveBeenCalledWith(name, value);
    spy.mockRestore();
  });

  test("set validates the value", async () => {
    // const set = (name: any, val?: any) => () => de1.set(name, val);
    expect(() => (de1.set as any)("noEncode")).toThrowError(
      "noEncode is not settable",
    );
    expect(() => (de1.set as any)("noValidate")).toThrowError(
      `noValidate cannot be validated`,
    );
    expect(() => (de1.set as any)("invalid", "foo")).toThrowError(
      "Invalid value for invalid",
    );
  });

  test("set merges partial values", async () => {});
});
