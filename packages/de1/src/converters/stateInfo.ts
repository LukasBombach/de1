import { Converter } from "sblendid";
import Parser from "../parser";

// todo migrate numbers to strings
export interface StateInfo {
  state: number;
  substate: number;
}

function decode(data: Buffer): StateInfo {
  return new Parser<StateInfo>(data)
    .char("state")
    .char("substate")
    .vars();
}

const converter: Converter<StateInfo> = {
  uuid: "a00e",
  decode
};

export default converter;
