import Parser from "../../src/parser";

type Methods = "char"; // | "short" | "int" | "intSigned" | "sha;";

describe("parser", () => {
  function getParser<T = any>(num: number): Parser<T> {
    if (num > 0xff) throw new Error(`num must be smaller than ${0xff}`);
    return new Parser(Buffer.from([num]));
  }

  function uInt4(value: number) {
    return value & 0xf;
  }

  function int4(value: number) {
    var ref = uInt4(value);
    return ref > 0x7 ? ref - 0x10 : ref;
  }

  function uInt8(value: number) {
    return value & 0xff;
  }

  function int8(value: number) {
    var ref = uInt8(value);
    return ref > 0x7f ? ref - 0x100 : ref;
  }

  function uInt16(value: number) {
    return value & 0xffff;
  }

  function int16(value: number) {
    var ref = uInt16(value);
    return ref > 0x7fff ? ref - 0x10000 : ref;
  }

  test("works with an empty buffer", () => {
    const buffer = Buffer.from([0]);
    const parser = new Parser(buffer);
    expect(parser.vars()).toStrictEqual({});
  });

  test.each`
    fn        | type       | num
    ${"char"} | ${"Uint8"} | ${uInt8(8)}
  `("$fn processes a $type", ({ fn, num }: { fn: Methods; num: number }) => {
    const process = jest.fn(v => v.toString());
    const parser = getParser(num)[fn]("val");
    const processor = getParser(num).char("val", process);
    expect(parser.vars().val).toBe(num);
    expect(processor.vars().val).toBe(num.toString());
    expect(process).toHaveBeenCalledWith(num);
  });
});
