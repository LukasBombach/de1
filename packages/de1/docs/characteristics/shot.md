# Shot

#### UUID

`a00d`

#### Description

???

#### Encoding

| Name             | Description | Operations | Type  | Binary Type | Parsed Type | How to Parse                              |
| ---------------- | ----------- | ---------- | ----- | ----------- | ----------- | ----------------------------------------- |
| timer            | number      | `R` / `N`  | short |             |             | `v => Math.round(100 * (v / (herz * 2)))` |
| groupPressure    | number      | `R` / `N`  | short |             |             | `v => v / 4096`                           |
| groupFlow        | number      | `R` / `N`  | short |             |             | `v => v / 4096`                           |
| mixTemp          | number      | `R` / `N`  | short |             |             | `v => v / 256`                            |
| headTemp1        | number      | `R` / `N`  | char  |             |             |                                           |
| headTemp2        | number      | `R` / `N`  | char  |             |             |                                           |
| headTemp3        | number      | `R` / `N`  | char  |             |             |                                           |
| setMixTemp       | number      | `R` / `N`  | short |             |             | `v => v / 256`                            |
| setHeadTemp      | number      | `R` / `N`  | short |             |             | `v => v / 256`                            |
| setGroupPressure | number      | `R` / `N`  | char  |             |             | `v => v / 16`                             |
| setGroupFlow     | number      | `R` / `N`  | char  |             |             | `v => v / 16`                             |
| frameNumber      | number      | `R` / `N`  | char  |             |             |                                           |
| steamTemp        | number      | `R` / `N`  | char  |             |             |                                           |

`herz = 50`
