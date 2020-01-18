import { Converter, Names, PickValue } from "@sblendid/sblendid";
import state, { State } from "./state";
import water, { Water } from "./water";
import versions, { Versions } from "./versions";
import shot, { Shot } from "./shot";
import shotSettings, { ShotSettings } from "./shotSettings";
import stateInfo, { StateInfo } from "./stateInfo";
import shotDescriptionHeader, {
  ShotDescriptionHeader,
} from "./shotDescriptionHeader";
import shotFrame, { ShotFrame } from "./shotFrame";
import calibrate, { Calibrate } from "./calibrate";

export type Name = Names<Converters>;
export type Value<N extends Name> = PickValue<Converters, N>;
export type Listener<N extends Name> = (value: Value<N>) => void;

export type Converters = {
  state: Converter<State>;
  water: Converter<Water>;
  versions: Converter<Versions>;
  shot: Converter<Shot>;
  shotSettings: Converter<ShotSettings>;
  stateInfo: Converter<StateInfo>;
  shotDescriptionHeader: Converter<ShotDescriptionHeader>;
  shotFrame: Converter<ShotFrame>;
  calibrate: Converter<Calibrate>;
};

export default {
  state,
  water,
  versions,
  shot,
  shotSettings,
  stateInfo,
  shotDescriptionHeader,
  shotFrame,
  calibrate,
};
