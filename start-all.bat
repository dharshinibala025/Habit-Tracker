@echo off
echo ============================================
echo   HabitFlow - Start Both Servers
echo ============================================
echo.
SET JAVA_HOME=D:\IntelliJ IDEA 2025.3.4\jbr
SET PATH="%JAVA_HOME%\bin";%PATH%
echo [1/2] Starting Java Backend on port 5000...
start "Java Backend" cmd /k "cd /d "%~dp0java-backend" & set "JAVA_HOME=D:\IntelliJ IDEA 2025.3.4\jbr" & set "PATH=D:\IntelliJ IDEA 2025.3.4\jbr\bin;%%PATH%%" & mvnw.cmd spring-boot:run"

timeout /t 5 /nobreak

echo [2/2] Starting React Frontend...
start "React Frontend" cmd /k "cd /d "%~dp0" & npm run dev"

echo.
echo Both servers are starting!
echo Java Backend : http://localhost:5000
echo React App    : http://localhost:5173
echo.
pause
