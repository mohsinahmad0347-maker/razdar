@echo off
echo Starting RAZDAR E-Commerce Platform...
cd /d "%~dp0"
cmd.exe /c ".\node_modules\.bin\vite --host 127.0.0.1 --port 3000 --open"
pause
