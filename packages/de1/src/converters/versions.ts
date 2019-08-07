import { Converter } from "sblendid";
import Parser from "../parser";

export interface Versions {
  bluetooth: {
    apiVersion: number;
    release: number;
    commits: number;
    changes: number;
    sha: string;
  };
  firmware: {
    apiVersion: number;
    release: number;
    commits: number;
    changes: number;
    sha: string;
  };
}

function decode(data: Buffer): Versions {
  return new Parser<Versions>(data)
    .char("bluetooth.apiVersion")
    .char("bluetooth.release")
    .short("bluetooth.commits")
    .char("bluetooth.changes")
    .sha("bluetooth.sha")
    .char("firmware.apiVersion")
    .char("firmware.release")
    .short("firmware.commits")
    .char("firmware.changes")
    .sha("firmware.sha")
    .vars();
}

const converter: Converter<Versions> = {
  uuid: "a001",
  decode
};

export default converter;
