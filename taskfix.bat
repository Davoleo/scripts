:: Fixes Jump Lists error, where the jumplist item shortcut can't be found on the system.
:: Needs to be executed at logon by TaskScheduler with the highest privileges to work.

echo off

C:\WINDOWS\System32\rundll32.exe shell32.dll,SHCreateLocalServerRunDll {c82192ee-6cb5-4bc0-9ef0-fb818773790a} -Embedding

C:\WINDOWS\System32\rundll32.exe C:\WINDOWS\System32\shell32.dll,SHCreateLocalServerRunDll {9aa46009-3ce0-458a-a354-715610a075e6} -Embedding