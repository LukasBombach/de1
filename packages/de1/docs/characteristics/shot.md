# Shot

**UUID**: `a00d`
**Operations**: `R` / `N`
**Description**: --

#### Encoding

| Name             | Description | Type  | Binary Type | Parsed Type | How to Parse                              |
| ---------------- | ----------- | ----- | ----------- | ----------- | ----------------------------------------- |
| timer            |             | short | Uint16      | number      | `v => Math.round(100 * (v / (herz * 2)))` |
| groupPressure    |             | short | Uint16      | number      | `v => v / 4096`                           |
| groupFlow        |             | short | Uint16      | number      | `v => v / 4096`                           |
| mixTemp          |             | short | Uint16      | number      | `v => v / 256`                            |
| headTemp1        |             | char  | Uint8       | number      |                                           |
| headTemp2        |             | char  | Uint8       | number      |                                           |
| headTemp3        |             | char  | Uint8       | number      |                                           |
| setMixTemp       |             | short | Uint16      | number      | `v => v / 256`                            |
| setHeadTemp      |             | short | Uint16      | number      | `v => v / 256`                            |
| setGroupPressure |             | char  | Uint8       | number      | `v => v / 16`                             |
| setGroupFlow     |             | char  | Uint8       | number      | `v => v / 16`                             |
| frameNumber      |             | char  | Uint8       | number      |                                           |
| steamTemp        |             | char  | Uint8       | number      |                                           |

`herz = 50`
