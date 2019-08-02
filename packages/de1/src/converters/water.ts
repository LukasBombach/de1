import Parser from "../parser";

interface Water {
  level: number;
  startFillLevel: number;
}

const converter: Converter<number> = {
  name: "water",
  uuid: "a011",
  decode
};

function decode(data: Buffer): number {
  return new Parser<Water>(data)
    .short("level", 256)
    .short("startFillLevel", 256)
    .vars().level;
}

export default converter;
