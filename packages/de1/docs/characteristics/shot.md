# Shot

**UUID**: `a00d`
**Operations**: `R` / `N`
**Description**: --

#### Encoding

| Name             | Description | Type  | Binary Type | Parsed Type | How to Parse                              |
| ---------------- | ----------- | ----- | ----------- | ----------- | ----------------------------------------- |
| timer            |             | short |             | number      | `v => Math.round(100 * (v / (herz * 2)))` |
| groupPressure    |             | short |             | number      | `v => v / 4096`                           |
| groupFlow        |             | short |             | number      | `v => v / 4096`                           |
| mixTemp          |             | short |             | number      | `v => v / 256`                            |
| headTemp1        |             | char  |             | number      |                                           |
| headTemp2        |             | char  |             | number      |                                           |
| headTemp3        |             | char  |             | number      |                                           |
| setMixTemp       |             | short |             | number      | `v => v / 256`                            |
| setHeadTemp      |             | short |             | number      | `v => v / 256`                            |
| setGroupPressure |             | char  |             | number      | `v => v / 16`                             |
| setGroupFlow     |             | char  |             | number      | `v => v / 16`                             |
| frameNumber      |             | char  |             | number      |                                           |
| steamTemp        |             | char  |             | number      |                                           |

`herz = 50`
