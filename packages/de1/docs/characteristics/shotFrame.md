# Shot Frame

#### UUID

`a010`

#### Description

???

#### Encoding

| Name         | Description | Operations | Type  | Binary Type | Parsed Type          | How to Parse             |
| ------------ | ----------- | ---------- | ----- | ----------- | -------------------- | ------------------------ |
| frameToWrite |             | `R`        | char  |             | frameToWrite: number |                          |
| flag         |             | `R`        | char  |             | flag: number         |                          |
| setVal       |             | `R`        | char  |             | setVal: number       | `v => v / 16`            |
| temp         |             | `R`        | char  |             | temp: number         | `v => v / 2`             |
| frameLen     |             | `R`        | char  |             | frameLen: number     | `convertF817ToFloat`     |
| triggerVal   |             | `R`        | char  |             | triggerVal: number   | `v => v / 16`            |
| maxVol       |             | `R`        | short |             | maxVol: number       | `convertBottom10OfU10P0` |

```ts
function convertF817ToFloat(value: number): number {
  const highBit = value & 128;
  return highBit === 0 ? value / 10 : value & 127;
}

function convertBottom10OfU10P0(value: number): number {
  return value & 1023;
}
```
