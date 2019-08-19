# Shot Description Header

**UUID**: `a00f`
**Operations**: --
**Description**: --

#### Encoding

| Name                    | Description | Type | Binary Type | Parsed Type | How to Parse  |
| ----------------------- | ----------- | ---- | ----------- | ----------- | ------------- |
| headerV                 |             | char |             | number      |               |
| numberOfFrames          |             | char |             | number      |               |
| numberOfPreinfuseFrames |             | char |             | number      |               |
| minimumPressure         |             | char |             | number      | `v => v / 16` |
| maximumFlow             |             | char |             | number      | `v => v / 16` |
