import { Converters, ConverterValue } from "sblendid";

import state from "./state";
import water from "./water";
import versions from "./versions";
import shot from "./shot";
import shotSettings from "./shotSettings";
import stateInfo from "./stateInfo";

export type Name =
  | "state"
  | "water"
  | "versions"
  | "shot"
  | "shotSettings"
  | "stateInfo";

export type Value<N extends Name> = ConverterValue<De1Converters, N>;
export type De1Converters = Converters<Name>;

const converters: De1Converters = {
  state,
  water,
  versions,
  shot,
  shotSettings,
  stateInfo
};

export default converters;
