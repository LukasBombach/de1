import { Converter } from "sblendid";
import Parser from "../parser";

// todo migrate numbers to strings
export interface StateInfo {
  state: number;
  substate: number;
}

const converter: Converter<StateInfo> = {
  // name: "stateInfo",
  uuid: "a00e",
  decode
};

function decode(data: Buffer): StateInfo {
  return new Parser<StateInfo>(data)
    .char("state")
    .char("substate")
    .vars();
}

export default converter;
