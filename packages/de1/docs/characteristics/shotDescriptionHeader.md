# Shot Description Header

#### UUID

`a00f`

#### Description

???

#### Encoding

| Name                    | Description | Operations | Type | Binary Type | Parsed Type | How to Parse  |
| ----------------------- | ----------- | ---------- | ---- | ----------- | ----------- | ------------- |
| headerV                 |             |            | char |             | number      |               |
| numberOfFrames          |             |            | char |             | number      |               |
| numberOfPreinfuseFrames |             |            | char |             | number      |               |
| minimumPressure         |             |            | char |             | number      | `v => v / 16` |
| maximumFlow             |             |            | char |             | number      | `v => v / 16` |
