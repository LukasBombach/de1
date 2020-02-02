import DE1 from "../../src/de1";

jest.mock("../../src/converters", () => ({
  state: { encode: () => {}, validate: () => true },
  noEncode: {},
  noValidate: { encode: () => {} },
  invalid: { encode: () => {}, validate: () => false },
}));

describe("de1 getters", () => {
  const de1 = new DE1();

  beforeAll(async () => {
    await de1.connect();
  });

  afterAll(async () => {
    await de1.disconnect();
  });

  test("set writes a value to the machine", async () => {
    const name = "state";
    const value = "idle";
    const spy = jest.spyOn(de1["machine"], "write");
    await expect(de1.set(name, value)).resolves.toBeUndefined();
    expect(spy).toHaveBeenCalledWith(name, value);
    spy.mockRestore();
  });

  test("set validates the value", async () => {
    const set = (name: any, val?: any) => de1.set(name, val);
    const expectedNoEncode = "noEncode is not settable";
    const expectedNoValidate = "noValidate cannot be validated";
    const expectedInvalid = "Invalid value for invalid";
    await expect(set("noEncode")).rejects.toThrow(expectedNoEncode);
    await expect(set("noValidate")).rejects.toThrow(expectedNoValidate);
    await expect(set("invalid", "foo")).rejects.toThrow(expectedInvalid);
  });

  test.todo("set merges partial values");
});
