Write-Host "🔄 Syncing all branches..." -ForegroundColor Cyan

git checkout main
git pull origin main

git checkout production
git pull origin production

git checkout develop
git pull origin develop

Write-Host "✅ All branches synced!" -ForegroundColor Green
git checkout develop
