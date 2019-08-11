import { EventEmitter } from "events";
import DE1, { De1State } from "./de1";
import { StateInfo, State, SubState, Shot } from "./converters";

export interface De1Events {
  state: De1State;
  temperature: {
    goal: number;
    temp: number;
  };
  heating: {
    goal: number;
    temp: number;
    timeElapsed: number;
    debug?: Record<string, any>;
  };
  waterlevel: number;
}

export type De1Listener<N extends keyof De1Events> = (
  value: De1Events[N]
) => Promise<void> | void;

interface LastState {
  state: State;
  time: number;
}

interface LastSubState {
  substate: SubState;
  time: number;
}

interface LastShot {
  shot: Shot;
  time: number;
}

export default class Events {
  private de1: DE1;
  private emitter = new EventEmitter();
  private lastState?: LastState;
  private lastSubState?: LastSubState;
  private lastShot?: LastShot;
  private heatingStarted?: number;
  private heatingHistory: number[] = [];

  constructor(de1: DE1) {
    this.de1 = de1;
  }

  // todo this should happen automatically on connect / disconnect
  public setUpListeners(): void {
    const service = this.de1.getBleService();
    service.on("stateInfo", this.onStateInfo.bind(this));
    service.on("shot", this.onShot.bind(this));
  }

  public on<N extends keyof De1Events>(
    event: N,
    listener: De1Listener<N>
  ): void {
    this.emitter.on(event, listener);
  }

  public off<N extends keyof De1Events>(
    event: N,
    listener: De1Listener<N>
  ): void {
    this.emitter.off(event, listener);
  }

  public once<N extends keyof De1Events>(
    event: N,
    listener: De1Listener<N>
  ): void {
    this.emitter.once(event, listener);
  }

  private onStateInfo(stateInfo: StateInfo): void {
    const { state, substate } = stateInfo;
    const { lastState, lastSubState } = this;
    const time = Date.now();

    if (
      substate === "heating" &&
      (!lastSubState || lastSubState.substate !== "heating")
    ) {
      this.heatingStarted = Date.now();
    }

    if (!lastState || lastState.state !== state) {
      this.lastState = { state, time };
    }

    if (!lastSubState || lastSubState.substate !== substate) {
      this.lastSubState = { substate, time };
    }
  }

  private onShot(shot: Shot): void {
    this.emitter.emit("temperature", this.getTemperatureParams(shot));
    if (this.lastSubState && this.lastSubState.substate === "heating") {
      this.emitter.emit("heating", this.getHeatingParams(shot));
    }
    this.updateLastShot(shot);
  }

  private getTemperatureParams(shot: Shot): De1Events["temperature"] {
    const temp = shot.mixTemp;
    const goal = shot.setHeadTemp;
    return { temp, goal };
  }

  private getHeatingParams(shot: Shot): De1Events["heating"] {
    const temp = shot.mixTemp;
    const goal = shot.setHeadTemp;
    const timeElapsed = Date.now() - (this.heatingStarted || 0);
    const { heatingHistory } = this;
    if (!this.lastShot) return { goal, temp, timeElapsed };
    const timeBetweenShots = (Date.now() - this.lastShot.time) / 1000;
    const tempBetweenShots = shot.mixTemp - this.lastShot.shot.mixTemp;
    const tempPerSecond = tempBetweenShots / timeBetweenShots;
    if (tempPerSecond > 0) {
      if (heatingHistory.length >= 40) heatingHistory.shift();
      heatingHistory.push(tempPerSecond);
    }
    const tempPerSecondSum = heatingHistory.reduce((a, b) => a + b, 0);
    const tempPerSecondAvg = tempPerSecondSum / heatingHistory.length;
    const tempToGo = shot.setHeadTemp - shot.mixTemp;
    const timeLeft = Math.floor(tempToGo / Math.abs(tempPerSecondAvg));
    const timeLeftMinutes = (timeLeft / 60).toFixed(2);
    return {
      goal,
      temp,
      timeElapsed,
      debug: {
        timeBetweenShots,
        tempBetweenShots,
        tempPerSecond,
        tempPerSecondSum,
        tempPerSecondAvg,
        tempToGo,
        timeLeft,
        timeLeftMinutes,
        heatingHistory
      }
    };
  }

  private updateLastShot(shot: Shot): void {
    const time = Date.now();
    this.lastShot = { time, shot };
  }
}

/* private getHeatingParams(shot: Shot): De1Events["heating"] {
    const temp = shot.mixTemp;
    const goal = shot.setHeadTemp;
    const timeElapsed = Date.now() - (this.heatingStarted || 0);
    const { heatingHistory } = this;
    if (!this.lastShot) return { goal, temp, timeElapsed };
    const timeBetweenShots = (Date.now() - this.lastShot.time) / 1000;
    const tempBetweenShots = shot.mixTemp - this.lastShot.shot.mixTemp;
    const tempPerSecond = tempBetweenShots / timeBetweenShots;
    if (tempPerSecond > 0) {
      if (heatingHistory.length >= 40) heatingHistory.shift();
      heatingHistory.push(tempPerSecond);
    }
    const tempPerSecondSum = heatingHistory.reduce((a, b) => a + b, 0);
    const tempPerSecondAvg = tempPerSecondSum / heatingHistory.length;
    const tempToGo = shot.setHeadTemp - shot.mixTemp;
    const timeLeft = Math.floor(tempToGo / Math.abs(tempPerSecondAvg));
    const timeLeftMinutes = (timeLeft / 60).toFixed(2);
    return {
      goal,
      temp,
      timeElapsed,
      debug: {
        timeBetweenShots,
        tempBetweenShots,
        tempPerSecond,
        tempPerSecondSum,
        tempPerSecondAvg,
        tempToGo,
        timeLeft,
        timeLeftMinutes,
        heatingHistory
      }
    };
  } */

/* private updateLastShot(shot: Shot): void {
    const time = Date.now();
    this.lastShot = { time, shot };
  } */
