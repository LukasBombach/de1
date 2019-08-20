import { EventEmitter } from "events";
import { Service } from "sblendid";
import { Converters } from "./converters";
import { Shot } from "./converters";

export type State =
  | "disconnected"
  | "sleep"
  | "idle"
  | "espresso"
  | "steam"
  | "hotWater"
  | "descale"
  | "hotWaterRinse"
  | "steamRinse"
  | "refill"
  | "heating"
  | "cooling";

export type EspressoPhase = "finalHeating" | "preinfusion" | "pouring";

export interface Events {
  connected: void;
  disconnected: void;
  state: State;
  temperature: {
    goal: number;
    temperature: number;
    experimentalTimeRemaining?: number;
  };
}

export type Event = keyof Events;
export type Value<E extends Event> = Events[E];
export type Listener<E extends Event> = (value: Value<E>) => Promish<void>;
type Promish<T> = Promise<T> | T;

export default class De1EventEmitter {
  private emitter = new EventEmitter();

  public addEventListeners(service: Service<Converters>): void {
    service.on("shot", this.onShot.bind(this));
  }

  public removeEventListeners(service: Service<Converters>): void {
    service.off("shot", this.onShot.bind(this));
  }

  public on<N extends Event>(event: N, listener: Listener<N>): void {
    this.emitter.on(event, listener);
  }

  public once<N extends Event>(event: N, listener: Listener<N>): void {
    this.emitter.once(event, listener);
  }

  public off<N extends Event>(event: N, listener: Listener<N>): void {
    this.emitter.off(event, listener);
  }

  public emit<N extends Event>(event: N, params: Events[N]): void {
    this.emitter.emit(event, params);
  }

  private onShot(shot: Shot): void {
    this.emitTemperature(shot);
  }

  private emitTemperature(shot: Shot): void {
    const goal = shot.setMixTemp;
    const temperature = shot.mixTemp;
    this.emit("temperature", { goal, temperature });
  }
}
