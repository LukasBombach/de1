import Parser from "../../src/parser";

type ParserMethod = "char" | "short" | "int" | "intSigned" | "sha";

type EachRecord = {
  fn: ParserMethod;
  buffer: Buffer;
  value: number | string;
  process: boolean;
};

describe("parser", () => {
  const char = 0x12;
  const short = 0x1234;
  const int = 0x12345678;
  const intSigned = 0x12345678;
  const sha = 0x12345678;

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
    fn             | value        | buffer                           | process
    ${"char"}      | ${char}      | ${getBuffer(1, char, false)}     | ${true}
    ${"short"}     | ${short}     | ${getBuffer(2, short, false)}    | ${true}
    ${"int"}       | ${int}       | ${getBuffer(4, int, false)}      | ${true}
    ${"intSigned"} | ${intSigned} | ${getBuffer(4, intSigned, true)} | ${true}
    ${"sha"}       | ${sha}       | ${getBuffer(4, sha, true)}       | ${false}
  `("$fn processes a $type", ({ buffer, fn, value, process }: EachRecord) => {
    const processor = jest.fn(v => v.toString());
    const parsed = new Parser(buffer)[fn]("value");
    const processed = new Parser(buffer)[fn]("val", processor);
    expect(parsed.vars()).toMatchSnapshot();
    expect(processed.vars()).toMatchSnapshot();
    if (process) expect(processor).toHaveBeenCalledWith(value);
  });

  /*
  test("methods can be chained to create an object", () => {
    const buffer = Buffer.alloc(11);
    buffer.writeUInt8(char, 0);
    buffer.writeUInt16BE(short, 1);
    buffer.writeUInt32BE(int, 3);
    buffer.writeInt32BE(intSigned, 7);
    const parser = new Parser(buffer)
      .char("char")
      .short("short")
      .int("int")
      .intSigned("intSigned");
    expect(parser.vars()).toStrictEqual(values);
  });

  test("variables can be nested", () => {
    const { char } = values;
    const buffer = Buffer.alloc(7);
    buffer.writeUInt8(char, 0);
    buffer.writeUInt8(char, 1);
    buffer.writeUInt8(char, 2);
    buffer.writeUInt8(char, 3);
    const parser = new Parser(buffer)
      .char("one.a")
      .char("one.b")
      .char("two.a")
      .char("two.b");
    expect(parser.vars()).toStrictEqual({
      one: { a: char, b: char },
      two: { a: char, b: char },
    });
  }); */
});
