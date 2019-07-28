/// <reference types="node" />
export default class Parser<T> {
    private dataView;
    private offset;
    private varsInternal;
    constructor(data: DataView | Buffer);
    char(name: string): this;
    short(name: string, divideBy?: number): this;
    int(name: string): this;
    sha(name: string): this;
    vars(): T;
    private getDataView;
    private setVar;
}
//# sourceMappingURL=parser.d.ts.map