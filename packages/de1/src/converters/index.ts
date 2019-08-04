import { Converter } from "sblendid";

import state from "./state";
import water from "./water";
import versions from "./versions";
import shot from "./shot";
import shotSettings from "./shotSettings";
import stateInfo from "./stateInfo";

export type De1Converters = Converter<any>[];

const converters: De1Converters = [
  state,
  water,
  versions,
  shot,
  shotSettings,
  stateInfo
];

export default converters;
