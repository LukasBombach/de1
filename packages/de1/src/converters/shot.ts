import { Converter } from "@sblendid/sblendid";
import Parser from "../parser";

export interface Shot {
  timer: number;
  groupPressure: number;
  groupFlow: number;
  mixTemp: number;
  headTemp: number;
  setMixTemp: number;
  setHeadTemp: number;
  setGroupPressure: number;
  setGroupFlow: number;
  frameNumber: number;
  steamTemp: number;
}

export const herz = 50;

function decode(data: Buffer): Shot {
  return new Parser<Shot>(data)
    .short("timer", v => Math.round(100 * (v / (herz * 2))))
    .short("groupPressure", v => v / 4096)
    .short("groupFlow", v => v / 4096)
    .short("mixTemp", v => v / 256)
    .bytes("headTemp", 3, convert3CharToU24P16)
    .short("setMixTemp", v => v / 256)
    .short("setHeadTemp", v => v / 256)
    .char("setGroupPressure", v => v / 16)
    .char("setGroupFlow", v => v / 16)
    .char("frameNumber")
    .char("steamTemp")
    .vars();
}

function convert3CharToU24P16(buffer: Buffer): number {
  return buffer[0] + buffer[1] / 256 + buffer[2] / 65536;
}

const converter: Converter<Shot> = {
  uuid: "a00d",
  decode,
};

export default converter;
