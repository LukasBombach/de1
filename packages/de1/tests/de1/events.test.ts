import DE1 from "../../src/de1";
import converters, { Name } from "../../src/converters";

describe("de1 events", () => {
  const names = Object.keys(converters) as Name[];

  test.each(names)("%s emits the expected values", async name => {
    const de1 = new DE1();
    const listener = jest.fn();
    de1.on(name, listener);
    expect(listener.mock.calls).toMatchSnapshot();
  });
});
