import Parser from "../../src/parser";

type ParserMethod = "char" | "short" | "int" | "intSigned" | "sha";

type BufferMethods = {
  UInt8: ["writeUInt8", number];
  UInt16BE: ["writeUInt16BE", number];
  UInt32LE: ["writeUInt32LE", number];
  Int32LE: ["writeInt32LE", number];
};

type EachRecord = {
  fn: ParserMethod;
  type: keyof BufferMethods;
  value: number;
};

describe("parser", () => {
  const bufferMethods: BufferMethods = {
    UInt8: ["writeUInt8", 2],
    UInt16BE: ["writeUInt16BE", 4],
    UInt32LE: ["writeUInt32LE", 4],
    Int32LE: ["writeInt32LE", 4],
  };

  const values = {
    char: 0x12,
    short: 0x1234,
    int: 0x12345678,
    intSigned: 0x12345678,
  };

  function getBuffer(type: keyof BufferMethods, value: number): Buffer {
    const [method, alloc] = bufferMethods[type];
    const buffer = Buffer.alloc(alloc);
    buffer[method](value, 0);
    return buffer;
  }

  test("works with an empty buffer", () => {
    const buffer = Buffer.from([0]);
    const parser = new Parser(buffer);
    expect(parser.vars()).toStrictEqual({});
  });

  test.each`
    fn             | type          | value
    ${"char"}      | ${"UInt8"}    | ${values.char}
    ${"short"}     | ${"UInt16BE"} | ${values.short}
    ${"int"}       | ${"UInt32LE"} | ${values.int}
    ${"intSigned"} | ${"Int32LE"}  | ${values.intSigned}
  `("$fn processes a $type", ({ fn, type, value }: EachRecord) => {
    const buffer = getBuffer(type, value);
    const processor = jest.fn(v => v.toString());
    const parser = new Parser<{ val: number }>(buffer)[fn]("val");
    const processed = new Parser<{ val: number }>(buffer)[fn]("val", processor);
    expect(parser.vars().val).toBe(value);
    expect(processed.vars().val).toBe(value.toString());
    expect(processor).toHaveBeenCalledWith(value);
  });

  test("sha processes a UInt32LE", () => {
    const buffer = getBuffer("UInt32LE", 12345678);
    const parser = new Parser<{ val: string }>(buffer).sha("val");
    const parser2 = new Parser<{ val: string }>(
      Buffer.from("00000000", "hex"),
    ).sha("val");
    expect(parser.vars().val).toBe("bc614e");
    expect(parser2.vars().val).toBe("");
  });

  test("methods can be chained to create an object", () => {
    const buffer = Buffer.alloc(11);
    buffer.writeUInt8(values.char, 0);
    buffer.writeUInt16BE(values.short, 1);
    buffer.writeUInt32LE(values.int, 3);
    buffer.writeInt32LE(values.intSigned, 7);
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
  });
});
