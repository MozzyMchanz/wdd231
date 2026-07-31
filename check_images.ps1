Write-Host "Image size check:"
Get-ChildItem "C:\Users\MOZZY\Desktop\LIBRARY\wdd231\chamber\images\*.webp" | ForEach-Object {
    $sizeKB = [math]::Round($_.Length / 1KB, 1)
    Write-Host ("{0,-30} {1,8} KB" -f $_.Name, $sizeKB)
}

