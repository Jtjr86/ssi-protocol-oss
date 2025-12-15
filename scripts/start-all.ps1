# SSI Protocol Stack Startup Script
# Launches Kernel, Gateway, and ASWF in separate PowerShell windows

Write-Host "🚀 Starting SSI Protocol Stack..." -ForegroundColor Cyan
Write-Host ""

# Get the repo root (parent of scripts directory)
$repoRoot = Split-Path -Parent $PSScriptRoot

# Start Kernel
Write-Host "Starting SSI Kernel on :5050..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$repoRoot\reference\kernel'; Write-Host '=== SSI Kernel v0.2.0 ===' -ForegroundColor Cyan; npm start"

# Wait a bit for Kernel to start
Start-Sleep -Seconds 3

# Start Gateway
Write-Host "Starting SSI Gateway on :4040..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$repoRoot\reference\gateway'; Write-Host '=== SSI Gateway ===' -ForegroundColor Cyan; `$env:KERNEL_URL='http://localhost:5050/v1/evaluate'; node dist/server.js"

# Wait a bit for Gateway to start
Start-Sleep -Seconds 2

# Start ASWF (if exists)
$aswfPath = Join-Path $repoRoot "aswf_auto_trader\paper_trading"
if (Test-Path $aswfPath) {
    Write-Host "Starting ASWF Auto Trader..." -ForegroundColor Green
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$aswfPath'; Write-Host '=== ASWF Auto Trader ===' -ForegroundColor Cyan; python live_trader.py"
} else {
    Write-Host "⚠️  ASWF directory not found at $aswfPath" -ForegroundColor Yellow
    Write-Host "   Skipping ASWF startup (Kernel + Gateway will still run)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ SSI Protocol Stack started!" -ForegroundColor Green
Write-Host ""
Write-Host "Services running:" -ForegroundColor Cyan
Write-Host "  - Kernel:  http://localhost:5050" -ForegroundColor White
Write-Host "  - Gateway: http://localhost:4040" -ForegroundColor White
Write-Host "  - ASWF:    (check terminal)" -ForegroundColor White
Write-Host ""
Write-Host "To stop: Close each PowerShell window" -ForegroundColor Gray
