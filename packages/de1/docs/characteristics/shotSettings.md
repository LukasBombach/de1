# Shot Settings

**UUID**: `a00b`
**Operations**: `R` / `W`
**Description**: --

#### Encoding

| Name                 | Description | Type  | Binary Type | Parsed Type | How to Parse   |
| -------------------- | ----------- | ----- | ----------- | ----------- | -------------- |
| steamSettings        |             | char  |             | number      |                |
| targetSteamTemp      |             | char  |             | number      |                |
| targetSteamLength    |             | char  |             | number      |                |
| targetHotWaterTemp   |             | char  |             | number      |                |
| targetHotWaterVol    |             | char  |             | number      |                |
| targetHotWaterLength |             | char  |             | number      |                |
| targetEspressoVol    |             | char  |             | number      |                |
| targetGroupTemp      |             | short |             | number      | `v => v / 256` |
