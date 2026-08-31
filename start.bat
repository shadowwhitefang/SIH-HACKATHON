@echo off
title CivicTrack React Server
echo ==========================================
echo   Starting CivicTrack React Application
echo ==========================================
set "PATH=C:\Users\DELL\AppData\Local\ms-playwright-go\1.57.0;%PATH%"

REM Rebuild standalone bundle
node -e "require('esbuild').buildSync({ entryPoints: ['src/main.jsx'], bundle: true, outfile: 'react-app.bundle.js', loader: { '.jsx': 'jsx' } })"

echo Opening browser at http://localhost:3000/#/
start http://localhost:3000/#/

python -m http.server 3000
pause
