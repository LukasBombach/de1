import fs from "fs";
import path from "path";

import { StateInfo, Shot } from "../converters";

const dir =
  "/Users/lbombach/Projekte/DecentEspresso/de1/packages/de1/src/development/heatingLogs/";

export interface ExpecetedShotToBeImplenented {
  time: number;
  timer: number;
  groupPressure: number;
  groupFlow: number;
  mixTemp: number;
  headTemp1: number;
  headTemp2: number;
  headTemp3: number;
  setMixTemp: number;
  setHeadTemp: number;
  setGroupPressure: number;
  setGroupFlow: number;
  frameNumber: number;
  steamTemp: number;
}

export default class HeatLogger {
  private shots: ExpecetedShotToBeImplenented[] = [];

  public async onStateChange(stateInfo: StateInfo) {
    if (stateInfo.substate === "heating") {
      this.startLogging();
    } else {
      await this.stopLogging();
    }
  }

  public onShot(shot: ExpecetedShotToBeImplenented) {
    this.shots.push(shot);
  }

  private startLogging() {
    this.shots = [];
  }

  private async stopLogging() {
    const filename = new Date().toLocaleString().replace(":", ".");
    const file = path.resolve(dir, `${filename}.json`);
    const serializedShots = JSON.stringify(this.shots);
    await fs.promises.writeFile(file, serializedShots);
  }
}
