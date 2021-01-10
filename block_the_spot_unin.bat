@echo off
echo *****************
echo Author: @rednek46
echo *****************
echo Removing Patch
del /s /q "%APPDATA%\Spotify\chrome_elf.dll" > NUL 2>&1
del /s /q "%APPDATA%\Spotify\Apps\zlink.spa" > NUL 2>&1
move "%APPDATA%\Spotify\chrome_elf.dll.bak" "%APPDATA%\Spotify\chrome_elf.dll" > NUL 2>&1
move "%APPDATA%\Spotify\Apps\zlink.spa.bak" "%APPDATA%\Spotify\Apps\zlink.spa" > NUL 2>&1
pause