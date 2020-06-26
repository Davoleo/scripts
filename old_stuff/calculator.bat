@echo off
@title Calcolatrice
color 3a
:1
echo inserisci l'operazione:
REM Set /p
set /p operazione=
set /a risultato = %operazione%
echo.
echo Il risultato di %operazione% e' %risultato%
echo.
PAUSE
goto:1