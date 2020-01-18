import Serializer from "../../src/serializer";

type SerializerMethod = "char" | "short" | "int" | "intSigned" | "sha";

type EachRecord = {
  fn: SerializerMethod;
  length: number;
  value: number;
  signed: boolean;
};

describe("serializer", () => {
  const char = 0x12;
  const short = 0x1234;
  const int = 0x12345678;
  const intSigned = 0x12345678;
  const sha = "bc614e";

  test.each`
    fn             | value
    ${"char"}      | ${char}
    ${"short"}     | ${short}
    ${"int"}       | ${int}
    ${"intSigned"} | ${intSigned}
    ${"sha"}       | ${sha}
  `("$fn adds a $length int", ({ fn, value }: EachRecord) => {
    const serializer = new Serializer();
    (serializer[fn] as any)(value); // TODO unlawful any
    expect(serializer.buffer).toMatchSnapshot();
  });

  test("methods can be chained", () => {
    const { buffer } = new Serializer()
      .char(char)
      .short(short)
      .int(int)
      .intSigned(intSigned)
      .sha(sha);
    expect(buffer).toMatchSnapshot();
  });
});
