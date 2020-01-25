export default class Serializer {
  static validate<R extends Record<string, any>>(
    val: string | number | Partial<R>,
    desc: string | number | R,
  ): val is Partial<R> {
    if (typeof val === "string" && typeof desc === "string") return true;
    if (typeof val === "number" && typeof desc === "number") return true;
    if (!Serializer.isObject(val)) throw new Error("Invalid input for val");
    if (!Serializer.isObject(desc)) throw new Error("Invalid input for desc");
    for (const k of Object.keys(val)) {
      if (typeof val[k] !== typeof desc[k]) return false;
    }
    return true;
  }

  private static isObject(val: any): val is Record<string, any> {
    return typeof val === "object" && val !== null;
  }

  buffer = Buffer.alloc(0);

  char(value: number): this {
    this.addBuffer(1, value, false);
    return this;
  }

  short(value: number): this {
    this.addBuffer(2, value, false);
    return this;
  }

  int(value: number): this {
    this.addBuffer(4, value, false);
    return this;
  }

  intSigned(value: number): this {
    this.addBuffer(4, value, true);
    return this;
  }

  sha(value: string): this {
    this.addBuffer(4, parseInt(value, 16), true);
    return this;
  }

  private addBuffer(length: number, val: number, signed: boolean): void {
    const buffer = Buffer.alloc(length);
    if (signed) buffer.writeIntBE(val, 0, length);
    if (!signed) buffer.writeUIntBE(val, 0, length);
    this.buffer = Buffer.concat([this.buffer, buffer]);
  }
}
