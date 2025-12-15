# Test script for SSI Gateway
Write-Host "Testing SSI Gateway on http://localhost:4040" -ForegroundColor Cyan

# Test 1: ALLOW scenario (notional under limit)
Write-Host "`n=== Test 1: ALLOW (notional=5000) ===" -ForegroundColor Yellow
$body1 = @{
    client_id = "betsy-test"
    system_id = "trading-prod"
    action = @{
        type = "trade.order.place"
        payload = @{ notional = 5000 }
    }
} | ConvertTo-Json

try {
    $response1 = Invoke-WebRequest -Uri "http://localhost:4040/v1/decisions" -Method POST -Body $body1 -ContentType "application/json" -UseBasicParsing
    Write-Host "Response:" -ForegroundColor Green
    $response1.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: DENY scenario (notional over limit)
Write-Host "`n=== Test 2: DENY (notional=15000) ===" -ForegroundColor Yellow
$body2 = @{
    client_id = "betsy-test"
    system_id = "trading-prod"
    action = @{
        type = "trade.order.place"
        payload = @{ notional = 15000 }
    }
} | ConvertTo-Json

try {
    $response2 = Invoke-WebRequest -Uri "http://localhost:4040/v1/decisions" -Method POST -Body $body2 -ContentType "application/json" -UseBasicParsing
    Write-Host "Response:" -ForegroundColor Green
    $response2.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Tests Complete ===" -ForegroundColor Cyan
