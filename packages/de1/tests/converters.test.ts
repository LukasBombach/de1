import shot from "../src/converters/shot";
import data from "./__fixtures__/characterics";

describe("converters", () => {
  test.each`
    name      | uuid         | expected
    ${"shot"} | ${shot.uuid} | ${"a00d"}
  `("$name should have the uuid $expected", ({ uuid, expected }) => {
    expect(uuid).toBe(expected);
  });

  test.each`
    name      | decode         | buffer
    ${"shot"} | ${shot.decode} | ${data[shot.uuid]}
  `(
    "The decode function of $name returns the expected output",
    ({ decode, buffer }) => {
      expect(decode(buffer)).toMatchSnapshot();
    },
  );
});
