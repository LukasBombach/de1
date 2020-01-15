import Sblendid, { Peripheral } from "@sblendid/sblendid";
import DE1 from "../../src/de1";

describe("de1 connection", () => {
  it("connects to the DE1 machine", async () => {
    const spy = jest.spyOn(Sblendid, "connect");
    const de1 = new DE1();
    await expect(de1.connect()).resolves.toBeUndefined();
    expect(spy).toHaveBeenCalledWith("DE1");
    await de1.disconnect();
    spy.mockRestore();
  });

  it("disconnects from the DE1 machine", async () => {
    const spy = jest.spyOn(Peripheral.prototype, "disconnect");
    const de1 = new DE1();
    await de1.connect();
    await expect(de1.disconnect()).resolves.toBeUndefined();
    expect(spy).toHaveBeenCalledWith();
    spy.mockRestore();
  });
});
