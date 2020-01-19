import Parser from "../src/parser";

type ParserMethod = "char" | "short" | "int" | "intSigned" | "sha";

type EachRecord = {
  fn: ParserMethod;
  buffer: Buffer;
  value: number | string;
  process: boolean;
};

describe("parser", () => {
  const char = 12;
  const short = 1234;
  const int = 12345678;
  const intSigned = 12345678;
  const sha = 12345678;

  const charBuffer = getBuffer(1, char, false);
  const shortBuffer = getBuffer(2, short, false);
  const intBuffer = getBuffer(4, int, false);
  const intSignedBuffer = getBuffer(4, intSigned, true);
  const shaBuffer = getBuffer(4, sha, true);

  function getBuffer(length: number, val: number, signed: boolean): Buffer {
    const buffer = Buffer.alloc(length);
    if (signed) buffer.writeIntBE(val, 0, length);
    if (!signed) buffer.writeUIntBE(val, 0, length);
    return buffer;
  }

  test("works with an empty buffer", () => {
    const buffer = Buffer.from([0]);
    const parser = new Parser(buffer);
    expect(parser.vars()).toStrictEqual({});
  });

  test.each`
    fn             | value        | buffer             | process
    ${"char"}      | ${char}      | ${charBuffer}      | ${true}
    ${"short"}     | ${short}     | ${shortBuffer}     | ${true}
    ${"int"}       | ${int}       | ${intBuffer}       | ${true}
    ${"intSigned"} | ${intSigned} | ${intSignedBuffer} | ${true}
    ${"sha"}       | ${sha}       | ${shaBuffer}       | ${false}
  `("$fn processes a $type", ({ buffer, fn, value, process }: EachRecord) => {
    const parsed = new Parser(buffer)[fn]("value");
    expect(parsed.vars()).toMatchSnapshot();
    if (process) {
      const processor = jest.fn(v => v.toString());
      const processed = new Parser(buffer)[fn]("val", processor);
      expect(processed.vars()).toMatchSnapshot();
      expect(processor).toHaveBeenCalledWith(value);
    }
  });

  test("bytes can be read and parsed", () => {
    const buffer = Buffer.from([1, 2, 3, 4, 5, 6]);
    const part = buffer.subarray(0, 3);
    const processor = jest.fn(v => v.toJSON());
    const processed = new Parser(buffer).bytes("value", 3, processor);
    expect(processed.vars()).toMatchSnapshot();
    expect(processor).toHaveBeenCalledWith(part);
  });

  test("methods can be chained to create an object", () => {
    const buffer = Buffer.concat([
      charBuffer,
      shortBuffer,
      intBuffer,
      intSignedBuffer,
      shaBuffer,
    ]);
    const parser = new Parser(buffer)
      .char("char")
      .short("short")
      .int("int")
      .intSigned("intSigned")
      .sha("sha");
    expect(parser.vars()).toMatchSnapshot();
  });

  test("variables can be nested", () => {
    const buffer = Buffer.concat([
      charBuffer,
      charBuffer,
      charBuffer,
      charBuffer,
    ]);
    const parser = new Parser(buffer)
      .char("one.a")
      .char("one.b")
      .char("two.a")
      .char("two.b");
    expect(parser.vars()).toMatchSnapshot();
  });
});
