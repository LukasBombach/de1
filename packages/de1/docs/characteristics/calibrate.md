# Calibrate

**UUID**: `a012`
**Operations**: --
**Description**: --

#### Encoding

| Name           | Description | Type      | Binary Type | Parsed Type | How to Parse                                |
| -------------- | ----------- | --------- | ----------- | ----------- | ------------------------------------------- |
| writeKey       |             | int       |             | string      | `v => v.toString(16))`                      |
| calCommand     |             | char      |             | number      |                                             |
| calTarget      |             | char      |             | number      |                                             |
| de1ReportedVal |             | int       |             | number      | `v => Math.round(100 * (v / 65536)) / 100)` |
| measuredVal    |             | intSigned |             | number      | `v => Math.round(100 * (v / 65536)) / 100)` |
