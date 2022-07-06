' https://superuser.com/questions/467809/start-outlook-automatically-in-tray

OPTION EXPLICIT

CONST PATH_TO_OUTLOOK = """C:\Program Files\Microsoft Office\root\Office16\OUTLOOK.EXE"""
CONST SHOW_MAXIMIZED = 3
CONST MINIMIZE = 1

DIM shell, outlook

SET shell = WScript.CreateObject("WScript.Shell")

' Open Outlook
shell.Run PATH_TO_OUTLOOK, SHOW_MAXIMIZED, FALSE

ON ERROR RESUME NEXT

' Grab a handle to the Outlook Application and minimize 
SET outlook = WScript.CreateObject("Outlook.Application")
WScript.Sleep(100)
outlook.ActiveExplorer.WindowState = SHOW_MAXIMIZED

' Loop on error to account for slow startup in which case the
' process and/or the main Outlook window is not available
WHILE Err.Number <> 0
  Err.Clear
  WScript.Sleep(100)
  SET outlook = NOTHING
  SET outlook = WScript.CreateObject("Outlook.Application")
  outlook.ActiveExplorer.WindowState = MINIMIZE
WEND

ON ERROR GOTO 0

SET outlook = NOTHING
SET shell = NOTHING