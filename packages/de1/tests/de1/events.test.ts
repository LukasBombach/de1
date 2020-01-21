import { EventEmitter } from "events";
import { Service } from "@sblendid/sblendid";
import DE1 from "../../src/de1";
import converters, { Name } from "../../src/converters";
import events from "../__fixtures__/events";

describe("de1 events", () => {
  const de1 = new DE1();
  const emitter = new EventEmitter();
  const namesWithEventFixture = Object.entries(converters)
    .filter(([name]) => events.hasOwnProperty(name))
    .map(([name]) => name as Name);

  let onSpy: jest.SpyInstance;
  let offSpy: jest.SpyInstance;

  beforeEach(async () => {
    onSpy = jest
      .spyOn(Service.prototype, "on")
      .mockImplementation(async (name, listener) => {
        emitter.on(name, listener);
      });
    offSpy = jest
      .spyOn(Service.prototype, "off")
      .mockImplementation(async (name, listener) => {
        emitter.off(name, listener);
      });
    await de1.connect();
  });

  afterEach(async () => {
    await de1.disconnect();
    onSpy.mockRestore();
    offSpy.mockRestore();
  });

  test.each(namesWithEventFixture)(
    "%s emits the expected values",
    async name => {
      const converter = converters[name];
      const buffer = events[converter.uuid];
      const data = converter.decode!(buffer);
      const listener = jest.fn();
      de1.on(name, listener);
      emitter.emit(name, data);
      expect(listener.mock.calls).toMatchSnapshot();
    },
  );
});
