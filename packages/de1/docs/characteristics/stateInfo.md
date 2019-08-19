# State Info

**UUID**: `a00e`
**Operations**: `R` / `N`
**Description**: --

#### Encoding

| Name     | Description | Type | Binary Type | Parsed Type | How to Parse |
| -------- | ----------- | ---- | ----------- | ----------- | ------------ |
| state    |             | char | Uint8       | number      |              |
| substate |             | char | Uint8       | number      |              |

##### State

| Value | Name          | Description |
| ----- | ------------- | ----------- |
| 0x00  | sleep         |             |
| 0x01  | goingToSleep  |             |
| 0x02  | idle          |             |
| 0x03  | busy          |             |
| 0x04  | espresso      |             |
| 0x05  | steam         |             |
| 0x06  | hotWater      |             |
| 0x07  | shortCal      |             |
| 0x08  | selfTest      |             |
| 0x09  | longCal       |             |
| 0x0a  | descale       |             |
| 0x0b  | fatalError    |             |
| 0x0c  | init          |             |
| 0x0d  | noRequest     |             |
| 0x0e  | skipToNext    |             |
| 0x0f  | hotWaterRinse |             |
| 0x10  | steamRinse    |             |
| 0x11  | refill        |             |
| 0x12  | clean         |             |
| 0x13  | inBootLoader  |             |
| 0x14  | airPurge      |             |

##### Sub State

| Value | Name         | Description |
| ----- | ------------ | ----------- |
| 0x00  | ready        |             |
| 0x01  | heating      |             |
| 0x02  | finalHeating |             |
| 0x03  | stabilising  |             |
| 0x04  | preinfusion  |             |
| 0x05  | pouring      |             |
| 0x06  | ending       |             |
| 0x11  | refill       |             |
