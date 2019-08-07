import { Converter } from "sblendid";
import state, { State } from "./state";
import water, { Water } from "./water";
import versions, { Versions } from "./versions";
import shot, { Shot } from "./shot";
import shotSettings, { ShotSettings } from "./shotSettings";
import stateInfo, { StateInfo } from "./stateInfo";
import shotDescriptionHeader, {
  ShotDescriptionHeader
} from "./shotDescriptionHeader";
import shotFrame, { ShotFrame } from "./shotFrame";
import calibrate, { Calibrate } from "./calibrate";

export { State } from "./state";
export { Water } from "./water";
export { Versions } from "./versions";
export { Shot } from "./shot";
export { ShotSettings } from "./shotSettings";
export { StateInfo } from "./stateInfo";
export { ShotDescriptionHeader } from "./shotDescriptionHeader";
export { ShotFrame } from "./shotFrame";
export { Calibrate } from "./calibrate";

export interface Converters {
  state: Converter<State>;
  water: Converter<Water>;
  versions: Converter<Versions>;
  shot: Converter<Shot>;
  shotSettings: Converter<ShotSettings>;
  stateInfo: Converter<StateInfo>;
  shotDescriptionHeader: Converter<ShotDescriptionHeader>;
  shotFrame: Converter<ShotFrame>;
  calibrate: Converter<Calibrate>;
}

const converters: Converters = {
  state,
  water,
  versions,
  shot,
  shotSettings,
  stateInfo,
  shotDescriptionHeader,
  shotFrame,
  calibrate
};

export default converters;
