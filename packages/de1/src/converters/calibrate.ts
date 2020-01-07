import { Converter } from "@sblendid/sblendid";
import Parser from "../parser";

export interface Calibrate {
  writeKey: string;
  calCommand: number;
  calTarget: number;
  de1ReportedVal: number;
  measuredVal: number;
}

function decode(data: Buffer): Calibrate {
  return new Parser<Calibrate>(data)
    .int("writeKey", v => v.toString(16))
    .char("calCommand")
    .char("calTarget")
    .int("de1ReportedVal", v => Math.round(100 * (v / 65536)) / 100)
    .intSigned("measuredVal", v => Math.round(100 * (v / 65536)) / 100)
    .vars();
}

const converter: Converter<Calibrate> = {
  uuid: "a012",
  decode,
};

export default converter;
