import { Converters } from "@sblendid/sblendid";
import { binary } from "./data";

type Data<C extends Converters> = Record<keyof C, Buffer>;

export default class Service<C extends Converters> {
  private converters: C;
  private data = (binary as unknown) as Data<C>;

  constructor(converters: C) {
    this.converters = converters;
  }

  async read(uuid: keyof C) {
    const data = this.data[uuid];
    const converter = this.converters[uuid];
    return converter.decode ? converter.decode(data) : data;
  }

  async write<K extends keyof C>(uuid: K, value: C[K]) {
    const data = this.data[uuid];
    const converter = this.converters[uuid];
    if (converter.encode) converter.encode(data);
  }
}
