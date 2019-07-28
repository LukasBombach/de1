/// <reference types="node" />
export default class Serializer<T> {
    private static bufferLengths;
    private values;
    char(value: number): this;
    short(value: number): this;
    int(value: number): this;
    sha(value: string): this;
    dataView(): DataView;
    buffer(): Buffer;
    private setValues;
    private add;
    private getBufferLength;
    private typeLength;
}
//# sourceMappingURL=serializer.d.ts.map