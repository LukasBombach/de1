declare module "buffer-dataview" {
  class BufferDataView extends DataView {
    constructor(buffer: Buffer);
  }

  export default BufferDataView;
}
