param(
    [int]$Port = 4040
)

Write-Host "Starting SSI Gateway on port $Port..."

Set-Location "$PSScriptRoot"

if (-not (Test-Path "node_modules")) {
    Write-Host "node_modules not found - running npm install..."
    npm install
}

npm run build

# Run server in foreground (use a separate terminal tab/window)
node dist/server.js --port $Port
