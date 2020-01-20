type Processor = (val: number) => any;

export default class Parser<T> {
  private buffer: Buffer;
  private offset: number;
  private varsInternal: any;

  constructor(buffer: Buffer) {
    this.offset = 0;
    this.buffer = buffer;
    this.varsInternal = {};
  }

  char(name: string, process?: Processor): this {
    this.setVar(name, this.readUint(1), process);
    return this;
  }

  short(name: string, process?: Processor): this {
    this.setVar(name, this.readUint(2), process);
    return this;
  }

  int(name: string, process?: Processor): this {
    this.setVar(name, this.readUint(4), process);
    return this;
  }

  intSigned(name: string, process?: Processor): this {
    this.setVar(name, this.readInt(4), process);
    return this;
  }

  sha(name: string): this {
    this.setVar(name, this.readInt(4), val =>
      val === 0 ? "" : val.toString(16),
    );
    return this;
  }

  bytes(
    name: string,
    byteLength: number,
    process: (bytes: Buffer) => any,
  ): this {
    const bytes = this.buffer.subarray(this.offset, this.offset + byteLength);
    this.offset += byteLength;
    this.setVar(name, process(bytes));
    return this;
  }

  vars(): T {
    return this.varsInternal;
  }

  private setVar(path: string, val: number, process?: Processor) {
    const keys = path.split(".");
    const key = keys[keys.length - 1];
    let node = this.varsInternal;
    keys.slice(0, -1).forEach(function(k) {
      if (node[k] === undefined) node[k] = {};
      node = node[k];
    });
    node[key] = process ? process(val) : val;
  }

  private readUint(byteLength: number): number {
    const val = this.buffer.readUIntBE(this.offset, byteLength);
    this.offset += byteLength;
    return val;
  }

  private readInt(byteLength: number): number {
    const val = this.buffer.readIntBE(this.offset, byteLength);
    this.offset += byteLength;
    return val;
  }
}
