@echo off
echo ==================================================
echo 🚀 Running Royal Medical Group Platform...
echo ==================================================

:: Run Backend in new window
start cmd /k "cd server && node index.js"

:: Seed Database
echo ℹ️ Seeding database with initial doctors and tests...
cmd /c "cd server && node seeder.js"

:: Start Frontend
echo ℹ️ Starting Frontend (Vite)...
npm run dev

pause
