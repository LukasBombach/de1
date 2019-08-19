# Shot Frame

**UUID**: `a010`
**Operations**: `R`
**Description**: --

#### Encoding

| Name         | Description | Type  | Binary Type | Parsed Type          | How to Parse             |
| ------------ | ----------- | ----- | ----------- | -------------------- | ------------------------ |
| frameToWrite |             | char  |             | frameToWrite: number |                          |
| flag         |             | char  |             | flag: number         |                          |
| setVal       |             | char  |             | setVal: number       | `v => v / 16`            |
| temp         |             | char  |             | temp: number         | `v => v / 2`             |
| frameLen     |             | char  |             | frameLen: number     | `convertF817ToFloat`     |
| triggerVal   |             | char  |             | triggerVal: number   | `v => v / 16`            |
| maxVol       |             | short |             | maxVol: number       | `convertBottom10OfU10P0` |

```ts
function convertF817ToFloat(value: number): number {
  const highBit = value & 128;
  return highBit === 0 ? value / 10 : value & 127;
}

function convertBottom10OfU10P0(value: number): number {
  return value & 1023;
}
```
