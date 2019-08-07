import { Converter } from "sblendid";
import Parser from "../parser";
import { states, State, States } from "./state"; // todo this should be shared

export type SubState =
  | "ready"
  | "heating"
  | "finalHeating"
  | "stabilising"
  | "preinfusion"
  | "pouring"
  | "ending"
  | "refill";

export type SubStates = Record<SubState, number>;

export const subStates: SubStates = {
  ready: 0x00,
  heating: 0x01,
  finalHeating: 0x02,
  stabilising: 0x03,
  preinfusion: 0x04,
  pouring: 0x05,
  ending: 0x06,
  refill: 0x17
};

export interface StateInfo {
  state: State;
  substate: SubState;
}

function decode(data: Buffer): StateInfo {
  return new Parser<StateInfo>(data)
    .char("state", v => getKeyFromValue(states, v))
    .char("substate", v => getKeyFromValue(subStates, v))
    .vars();
}

function getKeyFromValue<Map extends States | SubStates>(
  map: Map,
  value: number
): Map extends States ? State : SubState {
  const values = Object.values(map);
  const keys = Object.keys(map);
  const valueIndex = values.indexOf(value);
  if (valueIndex === -1) throw new Error(`Invalid state value "${value}"`);
  return keys[valueIndex] as Map extends States ? State : SubState;
}

const converter: Converter<StateInfo> = {
  uuid: "a00e",
  decode
};

export default converter;
