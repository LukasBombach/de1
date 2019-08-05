import { Converter } from "sblendid";
import Parser from "../parser";

export interface Water {
  level: number;
  startFillLevel: number;
}

const converter: Converter<Water> = {
  // name: "water",
  uuid: "a011",
  decode
};

function decode(data: Buffer): Water {
  return new Parser<Water>(data)
    .short("level", 256)
    .short("startFillLevel", 256)
    .vars();
}

export default converter;
