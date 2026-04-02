@echo off
title تشغيل منصة مختبرات رويال الطبية
echo ==============================================
echo    جاري تشغيل منصة مختبرات رويال الطبية...
echo ==============================================
echo.

:: تشغيل الخادم (Backend) في نافذة جديدة
echo [1/2] جاري تشغيل الخادم (Backend)...
start "Backend - Royal Medical" cmd /k "node server/index.js"

timeout /t 3 /nobreak > nul

:: تشغيل واجهة الموقع (Frontend) في نافذة جديدة
echo [2/2] جاري تشغيل واجهة الموقع (Frontend)...
start "Frontend - Royal Medical" cmd /k "node ./node_modules/vite/bin/vite.js"

echo.
echo ==============================================
echo    المنصة الآن في طور التشغيل!
echo    الواجهة: http://localhost:5173
echo    لوحة التحكم: http://localhost:5173/login
echo ==============================================
echo.
echo ملاحظة: يرجى التأكد من تشغيل MongoDB على جهازك لتعمل البيانات بشكل كامل.
echo.
pause
