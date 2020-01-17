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
    ${"char"}      | ${"UInt8"}    | ${0x12}
    ${"short"}     | ${"UInt16BE"} | ${0x1234}
    ${"int"}       | ${"UInt32LE"} | ${0x12345678}
    ${"intSigned"} | ${"Int32LE"}  | ${0x12345678}
  `("$fn processes a $type", ({ fn, type, value }: EachRecord) => {
    const buffer = getBuffer(type, value);
    const process = jest.fn(v => v.toString());
    const parser = new Parser(buffer)[fn]("val") as Parser<{ val: number }>;
    const processor = new Parser(buffer)[fn]("val", process) as Parser<{
      val: string;
    }>;
    expect(parser.vars().val).toBe(value);
    expect(processor.vars().val).toBe(value.toString());
    expect(process).toHaveBeenCalledWith(value);
  });

  test("sha processes a UInt32LE", () => {
    const buffer = getBuffer("UInt32LE", 12345678);
    const parser = new Parser(buffer).sha("val") as Parser<{
      val: string;
    }>;
    expect(parser.vars().val).toBe("bc614e");
  });
});
