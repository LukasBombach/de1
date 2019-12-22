# Shot Description Header

**UUID**: `a00f`

**Operations**: --

**Description**: --

#### Encoding

| Name                    | Description | Type | Binary Type | Parsed Type | How to Parse  |
| ----------------------- | ----------- | ---- | ----------- | ----------- | ------------- |
| headerV                 |             | char | Uint8       | number      |               |
| numberOfFrames          |             | char | Uint8       | number      |               |
| numberOfPreinfuseFrames |             | char | Uint8       | number      |               |
| minimumPressure         |             | char | Uint8       | number      | `v => v / 16` |
| maximumFlow             |             | char | Uint8       | number      | `v => v / 16` |
