import { ValidConverter } from ".";
import Parser from "../parser";
import Serializer from "../serializer";

export interface ShotSettings {
  steamSettings: number;
  targetSteamTemp: number;
  targetSteamLength: number;
  targetHotWaterTemp: number;
  targetHotWaterVol: number;
  targetHotWaterLength: number;
  targetEspressoVol: number;
  targetGroupTemp: number;
}

function decode(data: Buffer): ShotSettings {
  return new Parser<ShotSettings>(data)
    .char("steamSettings")
    .char("targetSteamTemp")
    .char("targetSteamLength")
    .char("targetHotWaterTemp")
    .char("targetHotWaterVol")
    .char("targetHotWaterLength")
    .char("targetEspressoVol")
    .short("targetGroupTemp", v => v / 256)
    .vars();
}

function encode(shotSettings: ShotSettings): Buffer {
  return new Serializer()
    .char(shotSettings.steamSettings)
    .char(shotSettings.targetSteamTemp)
    .char(shotSettings.targetSteamLength)
    .char(shotSettings.targetHotWaterTemp)
    .char(shotSettings.targetHotWaterVol)
    .char(shotSettings.targetHotWaterLength)
    .char(shotSettings.targetEspressoVol)
    .short(shotSettings.targetGroupTemp * 256).buffer;
}

function validate(shotSettings: Partial<ShotSettings>): boolean {
  return Serializer.validate(shotSettings, {
    steamSettings: Number(),
    targetSteamTemp: Number(),
    targetSteamLength: Number(),
    targetHotWaterTemp: Number(),
    targetHotWaterVol: Number(),
    targetHotWaterLength: Number(),
    targetEspressoVol: Number(),
    targetGroupTemp: Number(),
  });
}

const converter: ValidConverter<ShotSettings> = {
  uuid: "a00b",
  encode,
  decode,
  validate,
};

export default converter;
