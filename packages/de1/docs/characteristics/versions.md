# Versions

**UUID**: `a001`
**Operations**: `R`
**Description**: --

#### Encoding

| Name                 | Description | Type  | Binary Type | Parsed Type | How to Parse          |
| -------------------- | ----------- | ----- | ----------- | ----------- | --------------------- |
| bluetooth.apiVersion |             | char  |             | number      |                       |
| bluetooth.release    |             | char  |             | number      |                       |
| bluetooth.commits    |             | short |             | number      |                       |
| bluetooth.changes    |             | char  |             | number      |                       |
| bluetooth.sha        |             | int   |             | string      | `v => v.toString(16)` |
| firmware.apiVersion  |             | char  |             | number      |                       |
| firmware.release     |             | char  |             | number      |                       |
| firmware.commits     |             | short |             | number      |                       |
| firmware.changes     |             | char  |             | number      |                       |
| firmware.sha         |             | int   |             | string      | `v => v.toString(16)` |

> The data that the machine returns has the length containg all the above values, but
> all firmware values are just zeros (`0`). This means you will get something like this:
> `040901c151092c5ee0000000000000000000` (hex formatted)
> Where the first bytes are those of bluetooth and that zeros are those for the firmware
