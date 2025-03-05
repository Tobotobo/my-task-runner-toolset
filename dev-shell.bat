@echo off
setlocal enabledelayedexpansion

set BAT_DIR=%~dp0
set BAT_DIR=%BAT_DIR:\=/%
set QJS=%BAT_DIR%tools/windows/qjs.exe
set ENV=%BAT_DIR%.env
set GET_DOTENV_VALUE_SJIS=%BAT_DIR%tools/lib/js/get-dotenv-value-sjis.js

if exist "%ENV%" (
    for /f "delims=" %%A in ('%QJS% "%GET_DOTENV_VALUE_SJIS%" "%ENV%" BASH') do set BASH=%%A
)
if not defined BASH set BASH=C:/Program Files/Git/bin/bash.exe

endlocal & set BASH=%BASH% & "%BASH%" "%BAT_DIR%/dev-shell.sh"
