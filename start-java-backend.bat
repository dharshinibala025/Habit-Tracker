@echo off
echo ============================================
echo   HabitFlow - Java Spring Boot Backend
echo ============================================
echo.
echo Starting Java backend on port 5000...
echo.
SET JAVA_HOME=D:\IntelliJ IDEA 2025.3.4\jbr
SET PATH="%JAVA_HOME%\bin";%PATH%
cd /d "d:\Habit Tracker\java-backend"
call mvnw.cmd spring-boot:run
pause
