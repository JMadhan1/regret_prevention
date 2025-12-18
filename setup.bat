@echo off
echo ========================================
echo Regret Prevention Engine - Setup Script
echo ========================================
echo.

echo [1/4] Setting up Backend...
cd backend

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo [2/4] Checking environment file...
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Edit backend\.env and add your ANTHROPIC_API_KEY
    echo.
) else (
    echo .env file already exists
)

cd ..

echo.
echo [3/4] Setting up Frontend...
cd frontend

echo Installing Node.js dependencies...
call npm install

cd ..

echo.
echo [4/4] Setup Complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Add your Claude API key to backend\.env
echo    ANTHROPIC_API_KEY=your_key_here
echo.
echo 2. Start the backend:
echo    cd backend
echo    venv\Scripts\activate
echo    python api.py
echo.
echo 3. In a NEW terminal, start the frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo ========================================
echo.
pause
