import converters, { Converters } from "../src/converters";
import data from "./__fixtures__/characterics";

describe("converters", () => {
  test.each`
    name                       | uuid
    ${"calibrate"}             | ${"a012"}
    ${"shot"}                  | ${"a00d"}
    ${"shotDescriptionHeader"} | ${"a00f"}
    ${"shotFrame"}             | ${"a010"}
    ${"shotSettings"}          | ${"a00b"}
    ${"state"}                 | ${"a002"}
    ${"stateInfo"}             | ${"a00e"}
    ${"versions"}              | ${"a001"}
    ${"water"}                 | ${"a011"}
  `(
    "$name should have the uuid $uuid",
    ({ name, uuid }: { name: keyof Converters; uuid: string }) => {
      expect(uuid).toBe(converters[name].uuid);
    },
  );

  test.each(Object.entries(converters))(
    "decoding %s returns the expected output",
    (name, { uuid, decode }) => {
      if (decode) expect(decode(data[uuid])).toMatchSnapshot();
    },
  );

  test.each(Object.entries(converters).filter(([, { encode }]) => !!encode))(
    "encoding %s returns the expected output",
    (name, { uuid, decode, encode }) => {
      if (!decode) throw new Error("This test does not work");
      const decodedData = decode(data[uuid]);
      expect(encode!(decodedData)).toStrictEqual(data[uuid]);
    },
  );
});
