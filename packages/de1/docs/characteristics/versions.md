# Versions

#### UUID

`a001`

#### Description

???

#### Encoding

| Name                 | Description | Operations | Type  | Binary Type | Parsed Type | How to Parse          |
| -------------------- | ----------- | ---------- | ----- | ----------- | ----------- | --------------------- |
| bluetooth.apiVersion |             | `R`        | char  |             | number      |                       |
| bluetooth.release    |             | `R`        | char  |             | number      |                       |
| bluetooth.commits    |             | `R`        | short |             | number      |                       |
| bluetooth.changes    |             | `R`        | char  |             | number      |                       |
| bluetooth.sha        |             | `R`        | int   |             | string      | `v => v.toString(16)` |
| firmware.apiVersion  |             | `R`        | char  |             | number      |                       |
| firmware.release     |             | `R`        | char  |             | number      |                       |
| firmware.commits     |             | `R`        | short |             | number      |                       |
| firmware.changes     |             | `R`        | char  |             | number      |                       |
| firmware.sha         |             | `R`        | int   |             | string      | `v => v.toString(16)` |

> The data that the machine returns has the length containg all the above values, but
> all firmware values are just zeros (`0`). This means you will get something like this:
> `040901c151092c5ee0000000000000000000` (hex formatted)
> Where the first bytes are those of bluetooth and that zeros are those for the firmware
