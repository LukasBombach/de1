import { Converter } from "@sblendid/sblendid";
import Parser from "../parser";

export interface Shot {
  timer: number;
  groupPressure: number;
  groupFlow: number;
  mixTemp: number;
  headTemp1: number;
  headTemp2: number;
  headTemp3: number;
  setMixTemp: number;
  setHeadTemp: number;
  setGroupPressure: number;
  setGroupFlow: number;
  frameNumber: number;
  steamTemp: number;
  time: number;
}

export const herz = 50;

function decode(data: Buffer): Shot {
  const time = Date.now();
  const vars = new Parser<Shot>(data)
    .short("timer", v => Math.round(100 * (v / (herz * 2))))
    .short("groupPressure", v => v / 4096)
    .short("groupFlow", v => v / 4096)
    .short("mixTemp", v => v / 256)
    .char("headTemp1")
    .char("headTemp2")
    .char("headTemp3")
    .short("setMixTemp", v => v / 256)
    .short("setHeadTemp", v => v / 256)
    .char("setGroupPressure", v => v / 16)
    .char("setGroupFlow", v => v / 16)
    .char("frameNumber")
    .char("steamTemp")
    .vars();
  return { ...vars, time };
}

const converter: Converter<Shot> = {
  uuid: "a00d",
  decode,
};

export default converter;
