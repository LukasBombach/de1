import Service from "./service";

type State = "connecting" | "connected" | "disconnecting" | "disconnected";

export default class Peripheral {
  private state: State = "disconnected";

  async getService(id: string): Promise<Service | undefined> {
    if (id !== "a000") return undefined;
    return new Service();
  }

  async connect(): Promise<void> {
    this.state = "connected";
  }

  async disconnect(): Promise<void> {
    this.state = "disconnected";
  }

  isConnected(): boolean {
    return this.state === "connected";
  }
}
