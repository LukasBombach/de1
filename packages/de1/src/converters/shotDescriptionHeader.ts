import { Converter } from "@sblendid/sblendid";
import Parser from "../parser";
import Serializer from "../serializer";

export interface ShotDescriptionHeader {
  headerV: number;
  numberOfFrames: number;
  numberOfPreinfuseFrames: number;
  minimumPressure: number;
  maximumFlow: number;
}

function decode(data: Buffer): ShotDescriptionHeader {
  return new Parser<ShotDescriptionHeader>(data)
    .char("headerV")
    .char("numberOfFrames")
    .char("numberOfPreinfuseFrames")
    .char("minimumPressure", v => v / 16)
    .char("maximumFlow", v => v / 16)
    .vars();
}

function encode(shotSettings: ShotDescriptionHeader): Buffer {
  return new Serializer()
    .char(shotSettings.headerV)
    .char(shotSettings.numberOfFrames)
    .char(shotSettings.numberOfPreinfuseFrames)
    .char(shotSettings.minimumPressure * 16)
    .char(shotSettings.maximumFlow * 16).buffer;
}

const converter: Converter<ShotDescriptionHeader> = {
  uuid: "a00f",
  decode,
  encode,
};

export default converter;
