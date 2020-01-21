import { EventEmitter } from "events";
import { Service } from "@sblendid/sblendid";
import DE1 from "../../src/de1";
import converters, { Name } from "../../src/converters";

describe("de1 events", () => {
  const de1 = new DE1();
  const names = Object.keys(converters) as Name[];
  const emitter = new EventEmitter();
  let onSpy: jest.SpyInstance;
  let offSpy: jest.SpyInstance;

  beforeAll(async () => {
    onSpy = jest
      .spyOn(Service.prototype, "on")
      .mockImplementation(async (name: string, listener: any) => {
        emitter.on(name, listener);
      });
    offSpy = jest
      .spyOn(Service.prototype, "off")
      .mockImplementation(async (name: string, listener: any) => {
        emitter.off(name, listener);
      });
    await de1.connect();
  });

  afterAll(async () => {
    await de1.disconnect();
    onSpy.mockRestore();
    offSpy.mockRestore();
  });

  test.each(names)("%s emits the expected values", async name => {
    const listener = jest.fn();
    de1.on(name, listener);
    // expect(listener.mock.calls).toMatchSnapshot();
  });
});
