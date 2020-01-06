export default class State {
  async stopEverything(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState !== "sleep") await this.write("state", "idle");
  }

  async startEspresso(): Promise<void> {
    await this.write("state", "espresso");
  }

  async stopEspresso(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "espresso") await this.write("state", "idle");
  }

  async startSteam(): Promise<void> {
    await this.write("state", "steam");
  }

  async stopSteam(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "steam") await this.write("state", "idle");
  }

  async startHotWater(): Promise<void> {
    await this.write("state", "hotWater");
  }

  async stopHotWater(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "hotWater") await this.write("state", "idle");
  }

  async startFlushing(): Promise<void> {
    await this.write("state", "hotWaterRinse");
  }

  async stopFlushing(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "hotWaterRinse") await this.write("state", "idle");
  }

  async startDescaling(): Promise<void> {
    await this.write("state", "descale");
  }

  async stopDescaling(): Promise<void> {
    const currentState = await this.read("state");
    if (currentState === "descale") await this.write("state", "idle");
  }

  async getState(): Promise<string> {
    if (!this.isConnected()) return "disconnected";
    const { state, substate } = await this.read("stateInfo");
    if (state === "sleep") return "sleep";
    if (substate === "heating") return "heating";
    if (state === "espresso") return "espresso";
    if (state === "steam") return "steam";
    if (state === "hotWater") return "hotWater";
    if (state === "hotWaterRinse") return "flushing";
    if (state === "descale") return "descale";
    return "idle";
  }

  private async read(name: string) {
    return await this.getBleService().read(name);
  }

  private async write(name: string, value: string) {
    await this.getBleService().write(name, value);
  }
}
