import { Converter } from "sblendid";
import Parser from "../parser";

export interface ShotFrame {
  frameToWrite: number;
  flag: number;
  setVal: number;
  temp: number;
  frameLen: number;
  triggerVal: number;
  maxVol: number;
}

function decode(data: Buffer): ShotFrame {
  return new Parser<ShotFrame>(data)
    .char("frameToWrite")
    .char("flag")
    .char("setVal", v => v / 16)
    .char("temp", v => v / 2)
    .char("frameLen", convertF817ToFloat)
    .char("triggerVal", v => v / 16)
    .short("maxVol", convertBottom10OfU10P0)
    .vars();
}

function convertF817ToFloat(value: number): number {
  const highBit = value & 128;
  return highBit === 0 ? value / 10 : value & 127;
}

function convertBottom10OfU10P0(value: number): number {
  return value & 1023;
}

const converter: Converter<ShotFrame> = {
  uuid: "a010",
  decode
};

export default converter;
