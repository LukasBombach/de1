import { ValidConverter } from ".";
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

function encode(header: ShotDescriptionHeader): Buffer {
  return new Serializer()
    .char(header.headerV)
    .char(header.numberOfFrames)
    .char(header.numberOfPreinfuseFrames)
    .char(header.minimumPressure * 16)
    .char(header.maximumFlow * 16).buffer;
}

function validate(header: Partial<ShotDescriptionHeader>): boolean {
  return Serializer.validate(header, {
    headerV: Number(),
    numberOfFrames: Number(),
    numberOfPreinfuseFrames: Number(),
    minimumPressure: Number(),
    maximumFlow: Number(),
  });
}

const converter: ValidConverter<ShotDescriptionHeader> = {
  uuid: "a00f",
  decode,
  encode,
  validate,
};

export default converter;
