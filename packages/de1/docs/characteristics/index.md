# Characteristics

| uuid   | Name                        | Operations      | Encoding                                             | TCL /TK Implementation        | Description                                                                                                                                |
| ------ | --------------------------- | --------------- | ---------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `a001` | **Versions**                | `R` / `-` / `-` | [Detailed Documentation](./versions.md)              | `parse_binary_version_desc`   | Version descriptons for Bluetooth and the firmware                                                                                         |
| `a002` | **State**                   | `R` / `W` / `-` | [Detailed Documentation](./state.md)                 | `parse_state_change`          | Lets read read and set states (but not substates), cannot be subscribed to. Mainly use for setting state (ie. start espresso or steam etc) |
| `a006` | **Write To Memory**         | `-` / `W` / `-` | Detailed Documentation                               | `firmware_upload_next`        | _unclear_ logs "firmware write ack recved" \[sic!\], maybe part of the protocol to update the firmware                                     |
| `a009` | **Fw Map Request**          | `-` / `W` / `-` | Detailed Documentation                               | `parse_map_request`           | _unclear_ maybe something to prepare an update of the firmware                                                                             |
| `a00b` | **Shot Settings**           | `R` / `W` / `-` | [Detailed Documentation](./shotSettings.md)          | `parse_binary_hotwater_desc`  | Settings for steam, hot water, espresso volume and group temperature                                                                       |
| `a00d` | **Shot**                    | `R` / `-` / `N` | [Detailed Documentation](./shot.md)                  | `update_de1_shotvalue`        | Notifies about the machines values (temparature, pressure and flow sensors) as well as the currently set targes for those values           |
| `a00e` | **State Info**              | `R` / `-` / `N` | [Detailed Documentation](./stateInfo.md)             | `update_de1_state`            | State notifications. Can be used to read - _and get notified about_ - the current machine's state and substate (heating, pouring etc)      |
| `a00f` | **Shot Description Header** | `R` / `W` / `-` | [Detailed Documentation](./shotDescriptionHeader.md) | `parse_binary_shotdescheader` | _unclear_ this seems to be in use and the code is readable, I am not sure what this is used for though                                     |
| `a010` | **Shot Frame**              | `R` / `-` / `-` | [Detailed Documentation](./shotFrame.md)             | `parse_binary_shotframe`      | _unclear_ this seems to be in use and the code is readable, I am not sure what this is used for though                                     |
| `a011` | **Water Levels**            | `R` / `-` / `N` | [Detailed Documentation](./water.md)                 | `parse_binary_water_level`    | Returns the current water level and the one the machine started with                                                                       |
| `a012` | **Calibration**             | `R` / `-` / `-` | [Detailed Documentation](./calibrate.md)             | `calibration_ble_received`    | _unclear_ for receiving calibration notifications, whatever that means                                                                     |

## Deprecated

| uuid   | Name                | Operations | Encoding     | TCL /TK Implementation        | Description                                                                 |
| ------ | ------------------- | ---------- | ------------ | ----------------------------- | --------------------------------------------------------------------------- |
| `a003` | _Set Time_          | `R` / `W`  | _deprecated_ | _not used on tcl source code_ | deprecated maybe reading this gives you a bunch of zeros                    |
| `a004` | _Shot Directory_    | `R`        | _deprecated_ | _not used on tcl source code_ | deprecated maybe reading this gives you a bunch of zeros                    |
| `a005` | _Read From Memory_  | `R`        | _deprecated_ | _not used on tcl source code_ | deprecated maybe reading this gives you a bunch of zeros                    |
| `a007` | _Shot Map Request_  | `-` / `W`  | _deprecated_ | _not used on tcl source code_ | deprecated maybe                                                            |
| `a008` | _Delete Shot Range_ | `-` / `W`  | _deprecated_ | _not used on tcl source code_ | deprecated maybe                                                            |
| `a00a` | _Temperatures_      | `R`        | _deprecated_ | _not used on tcl source code_ | deprecated maybe reading this gives you a bunch of zeros                    |
| `a00c` | _Deprecated_        | `R` / `W`  | _deprecated_ | `parse_binary_shot_desc`      | _unclear_ docs say it's deprecated, reading this gives you a bunch of zeros |
