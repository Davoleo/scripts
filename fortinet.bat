::Coded By Davoleo
::Davoleo - (c) - 2022
::Description: Barebones simple script to start FortiClient VPN when it's relative Service is in Manual mode
@ECHO OFF

SET FORTICLIENT="C:\Program Files\Fortinet\FortiClient\FortiClient.exe"

echo Requesting Admin Privileges...
if not "%1"=="am_admin" (powershell start -verb runas '%0' am_admin & exit /b)
cls

echo Launching Fortinet VPN Service...
net start FA_Scheduler

echo Launching Fortinet VPN Client...
start %FORTICLIENT%
exit