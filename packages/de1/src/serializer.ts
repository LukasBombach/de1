export default class Serializer {
  public buffer = Buffer.alloc(0);

  char(value: number): this {
    this.addUintBuffer(1, value);
    return this;
  }

  short(value: number): this {
    this.addUintBuffer(2, value);
    return this;
  }

  int(value: number): this {
    this.addUintBuffer(4, value);
    return this;
  }

  intSigned(value: number): this {
    this.addIntBuffer(4, value);
    return this;
  }

  sha(value: string): this {
    this.addIntBuffer(4, parseInt(value, 16));
    return this;
  }

  private addUintBuffer(byteLength: number, value: number): void {
    const buffer = Buffer.alloc(byteLength);
    buffer.writeUIntBE(value, 0, byteLength);
    this.buffer = Buffer.concat([this.buffer, buffer]);
  }

  private addIntBuffer(byteLength: number, value: number): void {
    const buffer = Buffer.alloc(byteLength);
    buffer.writeIntBE(value, 0, byteLength);
    this.buffer = Buffer.concat([this.buffer, buffer]);
  }
}
