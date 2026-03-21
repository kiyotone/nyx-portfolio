Write-Host "🚀 Deploying to production..." -ForegroundColor Cyan

# Make sure develop is up to date
git checkout develop
git pull origin develop

# Switch to production and merge
git checkout production
git pull origin production
git merge develop --no-ff -m "Deploy: Merge develop into production"

# Push
git push origin production

Write-Host "✅ Deployed to production! Check GitHub Actions for build status." -ForegroundColor Green
Write-Host "🔗 https://github.com/yourusername/next-js-app-template/actions" -ForegroundColor Cyan
