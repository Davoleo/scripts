@ECHO OFF

echo Requesting Admin Privileges...
if not "%1"=="am_admin" (powershell start -verb runas '%0' am_admin & exit /b)

echo Choose one of the Database Services:
echo 1) MySQL
echo 2) MongoDB

SET /p SERV="Your choice: "

if "%SERV%"=="1" then GOTO :1 
else GOTO :2

:1
echo Starting MySQL Database Service...
sc start MySQL-Database-Server

:2
echo Starting MongoDB Database Service...
net start MongoDB

echo Complete!
PAUSE