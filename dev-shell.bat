@echo off
set BAT_DIR=%~dp0
if not defined BASH set BASH="C:/Program Files/Git/bin/bash.exe"
%BASH% "%BAT_DIR:\=/%/dev-shell.sh" 
