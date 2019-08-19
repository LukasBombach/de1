# Calibrate

**UUID**: `a012`
**Operations**: --
**Description**: --

#### Encoding

| Name           | Description | Type      | Binary Type | Parsed Type | How to Parse                                |
| -------------- | ----------- | --------- | ----------- | ----------- | ------------------------------------------- |
| writeKey       |             | int       | Uint32      | string      | `v => v.toString(16))`                      |
| calCommand     |             | char      | Uint8       | number      |                                             |
| calTarget      |             | char      | Uint8       | number      |                                             |
| de1ReportedVal |             | int       | Uint32      | number      | `v => Math.round(100 * (v / 65536)) / 100)` |
| measuredVal    |             | intSigned | Int32       | number      | `v => Math.round(100 * (v / 65536)) / 100)` |
