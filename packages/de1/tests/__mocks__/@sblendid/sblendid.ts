export default class Sblendid {
  static async connect(name: string): Promise<Peripheral> {
    if (name !== "DE1") return new Promise(res => {});
    return new Peripheral();
  }
}

export class Peripheral {
  async getService(id: string): Promise<Service | undefined> {
    if (id !== "a000") return undefined;
    return new Service();
  }

  async disconnect(): Promise<void> {}
}

export class Service {}
