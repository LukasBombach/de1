import fs from "fs";
import path from "path";
import { EventEmitter } from "events";
import DE1 from "./de1";
import { StateInfo, State, SubState, Shot } from "./converters";

export interface De1Events {
  heating: {
    goal: number;
    temp: number;
    timeElapsed: number;
    timeRemainingExperimental?: number;
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
  private heatEnd?: { time: number; shot: Shot };

  constructor(de1: DE1) {
    this.de1 = de1;
  }

  // todo this should happen automatically on connect / disconnect
  public setUpListeners(): void {
    const service = this.de1.getBleService();
    service.on("stateInfo", this.onStateInfo.bind(this));
    service.on("shot", this.onShot.bind(this));
  }

  public unloadListeners(): void {
    const service = this.de1.getBleService();
    service.off("stateInfo", this.onStateInfo.bind(this));
    service.off("shot", this.onShot.bind(this));
  }

  public on<N extends De1EventName>(event: N, listener: De1Listener<N>): void {
    this.emitter.on(event, listener);
  }

  public off<N extends De1EventName>(event: N, listener: De1Listener<N>): void {
    this.emitter.off(event, listener);
  }

  private async onStateInfo({ state, substate }: StateInfo): Promise<void> {
    if (!this.isHeating() && substate === "heating") {
      this.heatHistory = [];
      this.heatStart = undefined;
    }
    if (this.isHeating() && substate !== "heating") {
      const file =
        "/Users/lbombach/Projekte/DecentEspresso/de1/packages/de1/src/heatinglog.txt";
      const data = { start: this.heatStart, end: this.heatEnd };
      await fs.promises.appendFile(file, JSON.stringify(data) + "\n");
    }
    this.lastStateInfo = { state, substate, time: Date.now() };
  }

  private onShot(shot: Shot): void {
    if (typeof this.heatStart === "undefined") {
      this.heatStart = { shot, time: Date.now() };
    }
    if (this.isHeating()) this.emitHeating(shot);
  }

  private emitHeating(shot: Shot): void {
    const time = Date.now();
    const goal = shot.setHeadTemp;
    const temp = shot.mixTemp;
    const timeElapsed = time - this.lastStateInfo!.time;

    this.heatHistory.push({ time, shot });
    if (this.heatHistory.length > 30) this.heatHistory.shift();

    const startTime = this.heatStart!.time;
    const startTemp = this.heatStart!.shot.mixTemp;

    const timeDiff = time - startTime;
    const heatDiff = temp - startTemp;
    const heatPerSecond = heatDiff / timeDiff;
    const heatRemaining = goal - temp;
    const timeRemainingExperimental = Math.floor(heatRemaining / heatPerSecond);

    function MMSS(millis: number) {
      var minutes = Math.floor(millis / 60000);
      var seconds = Math.floor((millis % 60000) / 1000);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    const debug = {
      startTime,
      startTemp,
      timeDiff,
      heatDiff,
      heatPerSecond,
      heatRemaining,
      timeRemainingExperimental,
      timeRemainingMinutes: MMSS(timeRemainingExperimental),
      heatHistoryLength: this.heatHistory.length
    };
    const event = { goal, temp, timeElapsed, timeRemainingExperimental, debug };
    this.emitter.emit("heating", event);
    this.heatEnd = { time, shot };
  }

  private isHeating(): boolean {
    if (!this.lastStateInfo) return false;
    return this.lastStateInfo.substate === "heating";
  }
}
