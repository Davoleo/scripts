:: Written by Davoleo : on 19/07/2021
:: use nircmd.exe to change default communication device between the two I use

if exist "headphones" (
    nircmd.exe setdefaultsounddevice "Speakers" 1
    nircmd.exe setdefaultsounddevice "Speakers" 2
    del "headphones"
) else (
    nircmd.exe setdefaultsounddevice "Headphones" 1
    nircmd.exe setdefaultsounddevice "Headphones" 2
    echo 0>"headphones"
)
