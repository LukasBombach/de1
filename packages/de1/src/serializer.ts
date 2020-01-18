export default class Serializer {
  public buffer = Buffer.alloc(0);

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
