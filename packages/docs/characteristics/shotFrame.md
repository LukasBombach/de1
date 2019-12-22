# Shot Frame

**UUID**: `a010`

**Operations**: `R`

**Description**: --

#### Encoding

| Name         | Description | Type  | Binary Type | Parsed Type | How to Parse             |
| ------------ | ----------- | ----- | ----------- | ----------- | ------------------------ |
| frameToWrite |             | char  | Uint8       | number      |                          |
| flag         |             | char  | Uint8       | number      |                          |
| setVal       |             | char  | Uint8       | number      | `v => v / 16`            |
| temp         |             | char  | Uint8       | number      | `v => v / 2`             |
| frameLen     |             | char  | Uint8       | number      | `convertF817ToFloat`     |
| triggerVal   |             | char  | Uint8       | number      | `v => v / 16`            |
| maxVol       |             | short | Uint16      | number      | `convertBottom10OfU10P0` |

```ts
function convertF817ToFloat(value: number): number {
  const highBit = value & 128;
  return highBit === 0 ? value / 10 : value & 127;
}

function convertBottom10OfU10P0(value: number): number {
  return value & 1023;
}
```
