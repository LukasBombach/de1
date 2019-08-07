A001    R     Get versions          
A002    RW    Get / Set State without substate and without notification
A003   [RW]   [SetTime]           
A004   [R]    [ShotDirectory]     
A005   [RW]   [ReadFromMMR]       
A006   [W]    [WriteToMMR]        
A007   [W]    [ShotMapRequest]    
A008   [W]    [DeleteShotRange]   
A009   [W]    [FWMapRequest]      
A00A   [R]    [Temperatures]      
A00B   [RW]   [ShotSettings]      
A00C   [RW]   [Deprecated]        
A00D   [R]    [ShotSample]        
A00E   [R]    [StateInfo]         
A00F   [RW]   [HeaderWrite]       
A010   [RW]   [FrameWrite]        
A011   [RW]   [WaterLevels]       
A012   [RW]   [Calibration]       










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
