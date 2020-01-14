import Peripheral from "./peripheral";

export default class Sblendid {
  static async connect(name: string): Promise<Peripheral> {
    if (name !== "DE1") return new Promise(res => {});
    const peripheral = new Peripheral();
    await peripheral.connect();
    return peripheral;
  }
}
