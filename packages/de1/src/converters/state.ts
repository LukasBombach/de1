import { Converter } from "sblendid";
import Parser from "../parser";
import Serializer from "../serializer";

export type State =
  | "sleep"
  | "goingToSleep"
  | "idle"
  | "busy"
  | "espresso"
  | "steam"
  | "hotWater"
  | "shortCal"
  | "selfTest"
  | "longCal"
  | "descale"
  | "fatalError"
  | "init"
  | "noRequest"
  | "skipToNext"
  | "hotWaterRinse"
  | "steamRinse"
  | "refill"
  | "clean"
  | "inBootLoader"
  | "airPurge";

// type States = { [S in State]: number };
type States = Record<State, number>;

const converter: Converter<State> = {
  // name: "state",
  uuid: "a002",
  encode,
  decode
};

export const states: States = {
  sleep: 0x00,
  goingToSleep: 0x01,
  idle: 0x02,
  busy: 0x03,
  espresso: 0x04,
  steam: 0x05,
  hotWater: 0x06,
  shortCal: 0x07,
  selfTest: 0x08,
  longCal: 0x09,
  descale: 0x0a,
  fatalError: 0x0b,
  init: 0x0c,
  noRequest: 0x0d,
  skipToNext: 0x0e,
  hotWaterRinse: 0x0f,
  steamRinse: 0x10,
  refill: 0x11,
  clean: 0x12,
  inBootLoader: 0x13,
  airPurge: 0x14
};

function decode(data: Buffer): State {
  const value = parse(data);
  const state = getNameFromValue(value);
  if (!state) throw new Error(`Received unexpected state ${value}`);
  return state;
}

function encode(state: State): Buffer {
  const value = states[state];
  if (value === undefined) throw new Error(`Unknown state "${state}"`);
  return serialize(state);
}

function parse(data: Buffer): number {
  return new Parser<{ state: number }>(data).char("state").vars().state;
}

function serialize(state: State): Buffer {
  return new Serializer().char(states[state]).buffer();
}

function getNameFromValue(state: number): State {
  const values = Object.values(states);
  const keys = Object.keys(states);
  const valueIndex = values.indexOf(state);
  if (valueIndex === -1) throw new Error(`Invalid state value "${state}"`);
  return keys[valueIndex] as State;
}

export default converter;
