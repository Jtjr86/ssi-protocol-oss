# SSI Protocol System Startup Script
# Run this script to open all required services in separate PowerShell windows

Write-Host "Starting SSI Protocol System..." -ForegroundColor Green

# Start Kernel Service
Write-Host "Starting Kernel Service on port 5050..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\betsy\ssi-protocol-existing\reference\kernel'; Write-Host 'Building kernel...' -ForegroundColor Yellow; npm run build; if (`$LASTEXITCODE -eq 0) { Write-Host 'Starting kernel...' -ForegroundColor Green; Set-Item env:ENVELOPE_LANE 'staging'; npm start } else { Write-Host 'Build failed!' -ForegroundColor Red; Read-Host 'Press Enter to close' }"

# Wait for kernel to start
Start-Sleep 5

# Start Gateway Service  
Write-Host "Starting Gateway Service on port 4040..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\betsy\ssi-protocol-existing\reference\gateway'; Write-Host 'Building gateway...' -ForegroundColor Yellow; npm run build; if (`$LASTEXITCODE -eq 0) { Write-Host 'Starting gateway...' -ForegroundColor Green; npm start } else { Write-Host 'Build failed!' -ForegroundColor Red; Read-Host 'Press Enter to close' }"

# Wait for gateway to start
Start-Sleep 5

# Start Trading Emulator
Write-Host "Starting Trading Emulator..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\betsy\ssi-protocol-existing\reference\client-trader'; npm start"

Write-Host ""
Write-Host "All services starting..." -ForegroundColor Green
Write-Host "   Kernel:  http://localhost:5050" -ForegroundColor Cyan
Write-Host "   Gateway: http://localhost:4040" -ForegroundColor Cyan
Write-Host "   Emulator: Check separate window" -ForegroundColor Cyan
Write-Host ""
Write-Host "Wait 15 seconds for all services to build and start, then:" -ForegroundColor Yellow
Write-Host ""
Write-Host "TEST THE SYSTEM:" -ForegroundColor Magenta
Write-Host "   1. cd c:\Users\betsy\ssi-protocol-existing\tools\policy-feedback" -ForegroundColor White
Write-Host "   2. node dist/cli.js approve TEST-CLOSURE" -ForegroundColor White
Write-Host "   3. node verify-behavior-change.js" -ForegroundColor White
Write-Host ""
Write-Host "SUCCESS: 6500 dollar limit changes from DENY to ALLOW!" -ForegroundColor Green