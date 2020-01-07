type DE1State = string;

export default class State {
  public async start(state: DE1State): Promise<void> {
    await this.write(state);
  }

  public async stop(state: DE1State): Promise<void> {
    const currentState = await this.read();
    if (currentState === state) await this.write("idle");
  }

  async stopEverything(): Promise<void> {
    const currentState = await this.read();
    if (currentState !== "sleep") await this.write("idle");
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

  public async read() {
    return await this.getBleService().read("state");
  }

  public async write(value: string) {
    await this.getBleService().write(value);
  }
}