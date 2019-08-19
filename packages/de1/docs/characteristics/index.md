# Characteristics

| Name                        | Value                                              |
| --------------------------- | -------------------------------------------------- |
| **uuid:**                   | `a001`                                             |
| **name:**                   | Versions                                           |
| **operations:**             | `R` /                                              |
| **info:**                   | [encoding / info](./versions.md)                   |
| **TCL /TK Implementation:** | `parse_binary_version_desc`                        |
| **Description:**            | Version descriptons for Bluetooth and the firmware |

| Name                        | Value                                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **uuid:**                   | `a002`                                                                                                                                     |
| **name:**                   | Requested State                                                                                                                            |
| **operations:**             | `R` / `W`                                                                                                                                  |
| **info:**                   | [encoding / info](./state.md)                                                                                                              |
| **TCL /TK Implementation:** | `parse_state_change`                                                                                                                       |
| **Description:**            | Lets read read and set states (but not substates), cannot be subscribed to. Mainly use for setting state (ie. start espresso or steam etc) |

| Name                        | Value                                                    |
| --------------------------- | -------------------------------------------------------- |
| **uuid:**                   | `a003`                                                   |
| **name:**                   | Set Time                                                 |
| **operations:**             | `R` / `W`                                                |
| **info:**                   | _deprecated_                                             |
| **TCL /TK Implementation:** | _not used on tcl source code_                            |
| **Description:**            | deprecated maybe reading this gives you a bunch of zeros |

| Name                        | Value                                                    |
| --------------------------- | -------------------------------------------------------- |
| **uuid:**                   | `a004`                                                   |
| **name:**                   | Shot Directory                                           |
| **operations:**             | `R` /                                                    |
| **info:**                   | _deprecated_                                             |
| **TCL /TK Implementation:** | _not used on tcl source code_                            |
| **Description:**            | deprecated maybe reading this gives you a bunch of zeros |

| Name                        | Value                                                    |
| --------------------------- | -------------------------------------------------------- |
| **uuid:**                   | `a005`                                                   |
| **name:**                   | Read From Memory                                         |
| **operations:**             | `R` / `W`                                                |
| **info:**                   | _deprecated_                                             |
| **TCL /TK Implementation:** | _not used on tcl source code_                            |
| **Description:**            | deprecated maybe reading this gives you a bunch of zeros |

| Name                        | Value                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| **uuid:**                   | `a006`                                                                                                 |
| **name:**                   | Write To Memory                                                                                        |
| **operations:**             | `-` / `W`                                                                                              |
| **info:**                   | `-`                                                                                                    |
| **TCL /TK Implementation:** | `firmware_upload_next`                                                                                 |
| **Description:**            | _unclear_ logs "firmware write ack recved" \[sic!\], maybe part of the protocol to update the firmware |

| Name                        | Value                         |
| --------------------------- | ----------------------------- |
| **uuid:**                   | `a007`                        |
| **name:**                   | Shot Map Request              |
| **operations:**             | `-` / `W`                     |
| **info:**                   | _deprecated_                  |
| **TCL /TK Implementation:** | _not used on tcl source code_ |
| **Description:**            | deprecated maybe              |

| Name                        | Value                         |
| --------------------------- | ----------------------------- |
| **uuid:**                   | `a008`                        |
| **name:**                   | Delete Shot Range             |
| **operations:**             | `-` / `W`                     |
| **info:**                   | _deprecated_                  |
| **TCL /TK Implementation:** | _not used on tcl source code_ |
| **Description:**            | deprecated maybe              |

| Name                        | Value                                                          |
| --------------------------- | -------------------------------------------------------------- |
| **uuid:**                   | `a009`                                                         |
| **name:**                   | Fw Map Request                                                 |
| **operations:**             | `-` / `W`                                                      |
| **info:**                   | encoding                                                       |
| **TCL /TK Implementation:** | `parse_map_request`                                            |
| **Description:**            | _unclear_ maybe something to prepare an update of the firmware |

| Name                        | Value                                                    |
| --------------------------- | -------------------------------------------------------- |
| **uuid:**                   | `a00a`                                                   |
| **name:**                   | Temperatures                                             |
| **operations:**             | `R`                                                      |
| **info:**                   | _deprecated_                                             |
| **TCL /TK Implementation:** | _not used on tcl source code_                            |
| **Description:**            | deprecated maybe reading this gives you a bunch of zeros |

| Name                        | Value                                                                |
| --------------------------- | -------------------------------------------------------------------- |
| **uuid:**                   | `a00b`                                                               |
| **name:**                   | Shot Settings                                                        |
| **operations:**             | `R` / `W`                                                            |
| **info:**                   | [encoding / info](./shotSettings.md)                                 |
| **TCL /TK Implementation:** | `parse_binary_hotwater_desc`                                         |
| **Description:**            | Settings for steam, hot water, espresso volume and group temperature |

| Name                        | Value                                                                       |
| --------------------------- | --------------------------------------------------------------------------- |
| **uuid:**                   | `a00c`                                                                      |
| **name:**                   | Deprecated                                                                  |
| **operations:**             | `R` / `W`                                                                   |
| **info:**                   | [encoding / info](./.md)                                                    |
| **TCL /TK Implementation:** | `parse_binary_shot_desc`                                                    |
| **Description:**            | _unclear_ docs say it's deprecated, reading this gives you a bunch of zeros |

| Name                        | Value                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **uuid:**                   | `a00d`                                                                                                                           |
| **name:**                   | Shot Sample                                                                                                                      |
| **operations:**             | `R`                                                                                                                              |
| **info:**                   | [encoding / info](./shot.md)                                                                                                     |
| **TCL /TK Implementation:** | `update_de1_shotvalue`                                                                                                           |
| **Description:**            | Notifies about the machines values (temparature, pressure and flow sensors) as well as the currently set targes for those values |

| Name                        | Value                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **uuid:**                   | `a00e`                                                                                                                                |
| **name:**                   | State Info                                                                                                                            |
| **operations:**             | `R`                                                                                                                                   |
| **info:**                   | [encoding / info](./stateInfo.md)                                                                                                     |
| **TCL /TK Implementation:** | `update_de1_state`                                                                                                                    |
| **Description:**            | State notifications. Can be used to read - _and get notified about_ - the current machine's state and substate (heating, pouring etc) |

| Name                        | Value                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| **uuid:**                   | `a00f`                                                                                                 |
| **name:**                   | Header Write                                                                                           |
| **operations:**             | `R` / `W`                                                                                              |
| **info:**                   | [encoding / info](./shotDescriptionHeader.md)                                                          |
| **TCL /TK Implementation:** | `parse_binary_shotdescheader`                                                                          |
| **Description:**            | _unclear_ this seems to be in use and the code is readable, I am not sure what this is used for though |

| Name                        | Value                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| **uuid:**                   | `a010`                                                                                                 |
| **name:**                   | Frame Write                                                                                            |
| **operations:**             | `R` / `W`                                                                                              |
| **info:**                   | [encoding / info](./shotFrame.md)                                                                      |
| **TCL /TK Implementation:** | `parse_binary_shotframe`                                                                               |
| **Description:**            | _unclear_ this seems to be in use and the code is readable, I am not sure what this is used for though |

| Name                        | Value                                                                |
| --------------------------- | -------------------------------------------------------------------- |
| **uuid:**                   | `a011`                                                               |
| **name:**                   | Water Levels                                                         |
| **operations:**             | `R` / `W`                                                            |
| **info:**                   | [encoding / info](./water.md)                                        |
| **TCL /TK Implementation:** | `parse_binary_water_level`                                           |
| **Description:**            | Returns the current water level and the one the machine started with |

| Name                        | Value                                                                  |
| --------------------------- | ---------------------------------------------------------------------- |
| **uuid:**                   | `a012`                                                                 |
| **name:**                   | Calibration                                                            |
| **operations:**             | `R` / `W`                                                              |
| **info:**                   | [encoding / info](./calibrate.md)                                      |
| **TCL /TK Implementation:** | `calibration_ble_received`                                             |
| **Description:**            | _unclear_ for receiving calibration notifications, whatever that means |
