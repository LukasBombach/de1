import { EventEmitter } from "events";
import { Service } from "@sblendid/sblendid";
import DE1 from "../../src/de1";
import converters, { Name } from "../../src/converters";
import events from "../__fixtures__/events";

describe("de1 events", () => {
  const de1 = new DE1();
  const emitter = new EventEmitter();

  // todo we don't have enough events
  // todo this mapping code is horrible
  const namesWithEventFixture = Object.keys(events)
    .map(uuid => Object.entries(converters).find(([, c]) => c.uuid === uuid))
    .map(c => c![0] as Name);

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
    "on(%s) emits the expected values",
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

  test.each(namesWithEventFixture)(
    "off(%s) removes the event listener",
    async name => {
      const listener = jest.fn();
      de1.off(name, listener);
      expect(offSpy).toHaveBeenCalledWith(name, listener);
    },
  );
});
