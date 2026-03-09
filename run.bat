@echo off
echo Starting Backend (Spring Boot)...
start cmd /k ".\mvnw spring-boot:run"

echo Starting Frontend (React/Vite)...
cd medai-frontend
start cmd /k "npm run dev"
