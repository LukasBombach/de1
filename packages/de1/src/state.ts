import Machine from "./machine";

type DE1State = string;

export default class State {
  public static async start(state: DE1State): Promise<void> {
    await State.write(state);
  }

  public static async stop(state: DE1State): Promise<void> {
    const currentState = await State.read();
    if (currentState === state) await State.write("idle");
  }

  public static async stopEverything(): Promise<void> {
    const currentState = await State.read();
    if (currentState !== "sleep") await State.write("idle");
  }

  public static async getState(): Promise<string> {
    if (!Machine.isConnected()) return "disconnected";
    const { state, substate } = await Machine.read("stateInfo");
    if (state === "sleep") return "sleep";
    if (substate === "heating") return "heating";
    if (state === "espresso") return "espresso";
    if (state === "steam") return "steam";
    if (state === "hotWater") return "hotWater";
    if (state === "hotWaterRinse") return "flushing";
    if (state === "descale") return "descale";
    return "idle";
  }

  public static async read() {
    return await Machine.read("state");
  }

  public static async write(value: string) {
    await Machine.write("state", value);
  }
}
