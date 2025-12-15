$missing = @()
$dirs = @("app", "components", "lib", "hooks", "sdks", "reference", "tools", "cli", "tests/conformance")
foreach ($dir in $dirs) {
    if (Test-Path $dir) {
        Get-ChildItem -Path $dir -Include *.ts,*.tsx,*.js,*.jsx,*.py -Recurse | Where-Object { $_.Directory.Name -ne "dist" -and $_.Directory.Name -ne "node_modules" } | ForEach-Object {
            $firstLine = Get-Content $_.FullName -TotalCount 1
            if ($firstLine -notmatch "Copyright 2025") {
                $missing += $_.FullName.Replace("$PWD\", "")
            }
        }
    }
}
if ($missing.Count -gt 0) {
    Write-Host "Missing headers in $($missing.Count) files:" -ForegroundColor Yellow
    $missing | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "All source files have copyright headers!" -ForegroundColor Green
}
