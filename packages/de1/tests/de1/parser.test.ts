import Parser from "../../src/parser";

type Methods = "char" | "short" | "int" | "intSigned" | "sha";

describe("parser", () => {
  test("works with an empty buffer", () => {
    const buffer = Buffer.from([0]);
    const parser = new Parser(buffer);
    expect(parser.vars()).toStrictEqual({});
  });

  test.each`
    fn             | type        | alloc | num
    ${"char"}      | ${"Uint8"}  | ${1}  | ${0x12}
    ${"short"}     | ${"Uint16"} | ${2}  | ${0x1234}
    ${"int"}       | ${"Uint32"} | ${4}  | ${0x12345678}
    ${"intSigned"} | ${"Int32"}  | ${4}  | ${0x12345678}
    ${"sha"}       | ${"Int32"}  | ${4}  | ${0x12345678}
  `("$fn processes a $type", ({ fn, num }: { fn: Methods; num: number }) => {
    const parser = new Parser();
    const process = jest.fn(v => v.toString());
    const parser = getParser(num)[fn]("val");
    const processor = getParser(num).char("val", process);
    expect(parser.vars().val).toBe(num);
    expect(processor.vars().val).toBe(num.toString());
    expect(process).toHaveBeenCalledWith(num);
  });
});
