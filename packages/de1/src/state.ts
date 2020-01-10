import { PickValue } from "@sblendid/sblendid";
import Machine from "./machine";
import { Converters } from "./converters";

type StateValue = PickValue<Converters, "state">;
export type ExtendedStates = StateValue | "disconnected" | "heating";

export default class State {
  private machine: Machine;

  constructor(machine: Machine) {
    this.machine = machine;
  }

  async start(state: StateValue): Promise<void> {
    await this.write(state);
  }

  async stop(state: StateValue): Promise<void> {
    const currentState = await this.read();
    if (currentState === state) await this.write("idle");
  }

  async stopEverything(): Promise<void> {
    const currentState = await this.read();
    if (currentState !== "sleep") await this.write("idle");
  }

  async getState(): Promise<ExtendedStates> {
    if (!this.machine.isConnected()) return "disconnected";
    const { state, substate } = await this.machine.read("stateInfo");
    if (substate === "heating") return "heating";
    return state;
  }

  async read(): Promise<StateValue> {
    return await this.machine.read("state");
  }

  async write(value: StateValue): Promise<void> {
    await this.machine.write("state", value);
  }
}
