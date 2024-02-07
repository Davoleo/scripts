::Coded By Davoleo

@ECHO OFF
cd /d %ANDROID_HOME%\tools

echo Requesting Admin Privileges...
if not "%1"=="am_admin" (powershell start -verb runas '%0' am_admin & exit /b)
cls

@title AVD Launch Script
echo.
echo Welcome to Davoleo's AVD Launch Script
echo.
echo Close the Terminal to Cancel the Script
echo This is the list of available AVDs:
emulator -list-avds

echo.
SET /p EMU="Enter the desired AVD name: "

echo Press Enter to start the emulator...
PAUSE
emulator -avd %EMU%

Debug Pause
PAUSE