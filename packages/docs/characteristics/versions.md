# Versions

**UUID**: `a001`

**Operations**: `R`

**Description**: --

#### Encoding

| Name                 | Description | Type  | Binary Type | Parsed Type | How to Parse          |
| -------------------- | ----------- | ----- | ----------- | ----------- | --------------------- |
| bluetooth.apiVersion |             | char  | Uint8       | number      |                       |
| bluetooth.release    |             | char  | Uint8       | number      |                       |
| bluetooth.commits    |             | short | Uint16      | number      |                       |
| bluetooth.changes    |             | char  | Uint8       | number      |                       |
| bluetooth.sha        |             | int   | Uint32      | string      | `v => v.toString(16)` |
| firmware.apiVersion  |             | char  | Uint8       | number      |                       |
| firmware.release     |             | char  | Uint8       | number      |                       |
| firmware.commits     |             | short | Uint16      | number      |                       |
| firmware.changes     |             | char  | Uint8       | number      |                       |
| firmware.sha         |             | int   | Uint32      | string      | `v => v.toString(16)` |

> The data that the machine returns has the length containg all the above values, but
> all firmware values are just zeros (`0`). This means you will get something like this:
> `040901c151092c5ee0000000000000000000` (hex formatted)
> Where the first bytes are those of bluetooth and that zeros are those for the firmware
