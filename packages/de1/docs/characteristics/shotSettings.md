# Shot Settings

**UUID**: `a00b`
**Operations**: `R` / `W`
**Description**: --

#### Encoding

| Name                 | Description | Type  | Binary Type | Parsed Type | How to Parse   |
| -------------------- | ----------- | ----- | ----------- | ----------- | -------------- |
| steamSettings        |             | char  | Uint8       | number      |                |
| targetSteamTemp      |             | char  | Uint8       | number      |                |
| targetSteamLength    |             | char  | Uint8       | number      |                |
| targetHotWaterTemp   |             | char  | Uint8       | number      |                |
| targetHotWaterVol    |             | char  | Uint8       | number      |                |
| targetHotWaterLength |             | char  | Uint8       | number      |                |
| targetEspressoVol    |             | char  | Uint8       | number      |                |
| targetGroupTemp      |             | short | Uint16      | number      | `v => v / 256` |
