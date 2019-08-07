# Characteristics

## Current assessment and implementation status

- [x]   A001   [R]    [Versions]          `parse_binary_version_desc`     confirmed         although there are a bunch of zeros as FW versions
- [x]   A002   [RW]   [RequestedState]    `parse_state_change`            confirmed         lets read read and set states but not substates, also cannot be subscribed to. maybe for setting states only while A00E is for reading and notifications?
- [x]   A003   [RW]   [SetTime]           _not used on tcl source code_   deprecated maybe  reading this gives you a bunch of zeros
- [x]   A004   [R]    [ShotDirectory]     _not used on tcl source code_   deprecated maybe  reading this gives you a bunch of zeros
- [x]   A005   [RW]   [ReadFromMMR]       _not used on tcl source code_   deprecated maybe  reading this gives you a bunch of zeros
- [x]   A006   [W]    [WriteToMMR]        `firmware_upload_next`          unclear           logs "firmware write ack recved", maybe part of the protocol to update the firmware on the DE1
- [x]   A007   [W]    [ShotMapRequest]    _not used on tcl source code_   deprecated maybe
- [x]   A008   [W]    [DeleteShotRange]   _not used on tcl source code_   deprecated maybe
- [x]   A009   [W]    [FWMapRequest]      `parse_map_request`             unclear           maybe something to prepare an update of the firmware
- [x]   A00A   [R]    [Temperatures]      _not used on tcl source code_   deprecated maybe  reading this gives you a bunch of zeros
- [x]   A00B   [RW]   [ShotSettings]      `parse_binary_hotwater_desc`    confirmed         settingsing for steam, hot water, espresso volume and group temperature
- [x]   A00C   [RW]   [Deprecated]        `parse_binary_shot_desc`        unclear           docs say it's deprecated, reading this gives you a bunch of zeros
- [x]   A00D   [R]    [ShotSample]        `update_de1_shotvalue`          doubts            probably updates on the machines values, esp. during pouring that will probably updates the graphs n stuff
- [x]   A00E   [R]    [StateInfo]         `update_de1_state`              confirmed         state change notifications, probably just for reading and getting notified, writing's done via A002 probably
- [ ]   A00F   [RW]   [HeaderWrite]       `parse_binary_shotdescheader`   unclear           this seems to be in use and the code is readable, I am not sure what this is used for though
- [ ]   A010   [RW]   [FrameWrite]        `parse_binary_shotframe`        unclear           this seems to be in use and the code is readable, I am not sure what this is used for though
- [x]   A011   [RW]   [WaterLevels]       `parse_binary_water_level`      confirmed         returns the current water level and the one the machine started with
- [ ]   A012   [RW]   [Calibration]       `calibration_ble_received`      unclear           for receiving calibration notifications, whatever that means


## Info from the basecamp docs

static T_Versions        I_Versions        = VERSIONINFO; // A001 A R    Versions See T_Versions
static T_RequestedState  I_RequestedState ; // A002 B RW   RequestedState See T_RequestedState
static T_SetTime         I_SetTime        ; // A003 C RW   SetTime Set current time
static T_ShotDirectory   I_ShotDirectory  ; // A004 D R    ShotDirectory View shot directory
static T_ReadFromMMR     I_ReadFromMMR    ; // A005 E RW   ReadFromMMR Read bytes from data mapped into the memory mapped region.
static T_WriteToMMR      I_WriteToMMR     ; // A006 F W    WriteToMMR Write bytes to memory mapped region
static T_ShotMapRequest  I_ShotMapRequest ; // A007 G W    ShotMapRequest Map a shot so that it may be read/written
static T_DeleteShotRange I_DeleteShotRange; // A008 H W    DeleteShotRange Delete all shots in the range given
static T_FWMapRequest    I_FWMapRequest   ; // A009 I W    FWMapRequest Map a firmware image into MMR. Cannot be done with the boot image
static T_Temperatures    I_Temperatures   ; // A00A J R    Temperatures See T_Temperatures
static T_ShotSettings    I_ShotSettings   ; // A00B K RW   ShotSettings See T_ShotSettings
static T_Deprecated      I_Deprecated     ; // A00C L RW   Deprecated Was T_ShotDesc. Now deprecated.
static T_ShotSample      I_ShotSample     ; // A00D M R    ShotSample Use to monitor a running shot. See T_ShotSample
static T_StateInfo       I_StateInfo       = {T_Enum_API_MachineStates::Init, T_Enum_API_Substates::NoState}; // A00E N R    StateInfo The current state of the DE1
static T_HeaderWrite     I_HeaderWrite    ; // A00F O RW   HeaderWrite Use this to change a header in the current shot description
static T_FrameWrite      I_FrameWrite     ; // A010 P RW   FrameWrite Use this to change a single frame in the current shot description
static T_WaterLevels     I_WaterLevels    ; // A011 Q RW   WaterLevels Use this to adjust and read water level settings
static T_Calibration     I_Calibration    ; // A012 R RW   Calibration Use this to adjust and read calibration
