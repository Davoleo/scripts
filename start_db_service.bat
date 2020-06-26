@ECHO OFF

echo Requesting Admin Privileges...
if not "%1"=="am_admin" (powershell start -verb runas '%0' am_admin & exit /b)

echo Starting MySQL Database Service...
sc start MySQL-Database-Server

echo Complete!
PAUSE