# Water Level

**UUID**: `a011`
**Operations**: `R` / `N`
**Description**: --

#### Encoding

| Name           | Description | Type  | Binary Type | Parsed Type | How to Parse   |
| -------------- | ----------- | ----- | ----------- | ----------- | -------------- |
| level          |             | short | Uint16      | number      | `v => v / 256` |
| startFillLevel |             | short | Uint16      | number      | `v => v / 256` |
