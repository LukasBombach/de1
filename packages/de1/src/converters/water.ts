import { Converter } from "sblendid";
import Parser from "../parser";

export interface Water {
  level: number;
  startFillLevel: number;
}

function decode(data: Buffer): Water {
  return new Parser<Water>(data)
    .short("level", 256)
    .short("startFillLevel", 256)
    .vars();
}

const converter: Converter<Water> = {
  uuid: "a011",
  decode
};

export default converter;
