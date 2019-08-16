import { EventEmitter } from "events";
import DE1 from "./de1";
import { StateInfo, State, SubState, Shot } from "./converters";
import HeatLogger from "./development/heatLogger";

export interface De1Events {
  connected: void;
  disconnected: void;
  heating: {
    goal: number;
    temp: number;
    tempRemaining: number;
    timeElapsed: number;
    experimentalTimeRemaining?: number;
    debug?: Record<string, any>;
  };
}

export type De1EventName = keyof De1Events;

export type De1Listener<N extends De1EventName> = (
  value: De1Events[N]
) => Promise<void> | void;

interface LastStateInfo {
  state: State;
  substate: SubState;
  time: number;
}

export default class Events {
  private de1: DE1;
  private emitter = new EventEmitter();
  private lastStateInfo?: LastStateInfo;
  private heatHistory: { time: number; shot: Shot }[] = [];
  private heatStart?: { time: number; shot: Shot };
  private heatLogger: HeatLogger = new HeatLogger();

  constructor(de1: DE1) {
    this.de1 = de1;
  }

  // todo this should happen automatically on connect / disconnect
  public addListeners(): void {
    const service = this.de1.getBleService();
    service.on("stateInfo", this.onStateInfo.bind(this));
    service.on("shot", this.onShot.bind(this));
  }

  public removeListeners(): void {
    const service = this.de1.getBleService();
    service.off("stateInfo", this.onStateInfo.bind(this));
    service.off("shot", this.onShot.bind(this));
  }

  public on<N extends De1EventName>(event: N, listener: De1Listener<N>): void {
    this.emitter.on(event, listener);
  }

  public once<N extends De1EventName>(
    event: N,
    listener: De1Listener<N>
  ): void {
    this.emitter.once(event, listener);
  }

  public off<N extends De1EventName>(event: N, listener: De1Listener<N>): void {
    this.emitter.off(event, listener);
  }

  public emit<N extends De1EventName>(event: N, params: De1Events[N]): void {
    this.emitter.emit(event, params);
  }

  private async onStateInfo({ state, substate }: StateInfo): Promise<void> {
    this.heatLogger.onStateChange({ state, substate });
    if (!this.isHeating() && substate === "heating") {
      this.heatHistory = [];
      this.heatStart = undefined;
    }
    this.lastStateInfo = { state, substate, time: Date.now() };
  }

  private onShot(shot: Shot): void {
    this.heatLogger.onShot(shot);
    if (typeof this.heatStart === "undefined") {
      this.heatStart = { shot, time: Date.now() };
    }
    if (this.isHeating()) this.emitHeating(shot);
  }

  private emitHeating(shot: Shot): void {
    const time = Date.now();
    const goal = shot.setMixTemp;
    const temp = shot.mixTemp;
    const tempRemaining = goal - temp;
    const timeElapsed = time - this.lastStateInfo!.time;

    this.heatHistory.push({ time, shot });
    if (this.heatHistory.length > 30) this.heatHistory.shift();

    const startTime = this.heatStart!.time;
    const startTemp = this.heatStart!.shot.mixTemp;
    const timeDiff = time - startTime;
    const heatDiff = temp - startTemp;
    const heatPerSecond = heatDiff / timeDiff;
    const heatRemaining = goal - temp;
    const experimentalTimeRemaining = Math.floor(heatRemaining / heatPerSecond);

    const event = {
      goal,
      temp,
      tempRemaining,
      timeElapsed,
      experimentalTimeRemaining
    };
    this.emitter.emit("heating", event);
  }

  private isHeating(): boolean {
    if (!this.lastStateInfo) return false;
    return this.lastStateInfo.substate === "heating";
  }
}
