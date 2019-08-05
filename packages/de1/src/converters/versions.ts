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

const converter: Converter<Versions> = {
  // name: "versions",
  uuid: "a001",
  decode
};

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

export default converter;
