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

  char(name: string, process?: Processor) {
    const val = this.buffer.readUInt8(this.offset);
    this.setVar(name, val, process);
    this.offset += 1;
    return this;
  }

  short(name: string, process?: Processor) {
    const val = this.buffer.readUInt16BE(this.offset);
    this.setVar(name, val, process);
    this.offset += 2;
    return this;
  }

  int(name: string, process?: Processor) {
    const val = this.buffer.readUInt32LE(this.offset);
    this.setVar(name, val, process);
    this.offset += 4;
    return this;
  }

  intSigned(name: string, process?: Processor) {
    const val = this.buffer.readInt32LE(this.offset);
    this.setVar(name, val, process);
    this.offset += 4;
    return this;
  }

  sha(name: string) {
    const val = this.buffer.readUInt32LE(this.offset);
    this.setVar(name, val, val => (val === 0 ? "" : val.toString(16)));
    this.offset += 4;
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
}
