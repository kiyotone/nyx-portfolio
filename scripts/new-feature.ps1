# Usage: .\scripts\new-feature.ps1 feature-name

param(
    [Parameter(Mandatory=$true)]
    [string]$FeatureName
)

Write-Host "Creating feature branch: feature/$FeatureName" -ForegroundColor Cyan

git checkout develop
git pull origin develop
git checkout -b "feature/$FeatureName"
git push -u origin "feature/$FeatureName"

Write-Host "✅ Created and pushed feature/$FeatureName" -ForegroundColor Green
Write-Host "Start working on your feature!" -ForegroundColor Yellow
