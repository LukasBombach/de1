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

type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;

export type Name = Names<Converters>;
export type Value<N extends Name> = PickValue<Converters, N>;
export type Listener<N extends Name> = (value: Value<N>) => void;

export interface ValidConverter<T> extends Converter<T> {
  validate?: (value: Partial<T>) => boolean;
}

export type Converters = {
  state: ValidConverter<State>;
  water: ValidConverter<Water>;
  versions: ValidConverter<Versions>;
  shot: ValidConverter<Shot>;
  shotSettings: ValidConverter<ShotSettings>;
  stateInfo: ValidConverter<StateInfo>;
  shotDescriptionHeader: ValidConverter<ShotDescriptionHeader>;
  shotFrame: ValidConverter<ShotFrame>;
  calibrate: ValidConverter<Calibrate>;
};

const converters: Converters = {
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

export default converters;
