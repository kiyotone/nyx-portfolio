# Update or create README.md

@"

# Next.js App Template

![Develop CI](https://github.com/yourusername/next-js-app-template/workflows/Develop%20CI/badge.svg?branch=develop)
![Production CI](https://github.com/yourusername/next-js-app-template/workflows/Production%20CI/badge.svg?branch=production)
![Main CI](https://github.com/yourusername/next-js-app-template/workflows/Main%20CI/badge.svg?branch=main)

A professional Next.js template with TypeScript, ESLint, Prettier, and complete CI/CD setup.

## 🌳 Branch Strategy

- **`main`** - Stable releases only (tagged versions)
- **`production`** - Production-ready code, no test files
- **`develop`** - Active development with all features
- **`feature/*`** - Feature branches

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/next-js-app-template.git
cd next-js-app-template

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📋 Available Scripts

| Script                 | Description                                |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Start development server                   |
| `npm run build`        | Build for production                       |
| `npm run start`        | Start production server                    |
| `npm run lint`         | Run ESLint                                 |
| `npm run lint:fix`     | Auto-fix linting issues                    |
| `npm run format`       | Format code with Prettier                  |
| `npm run format:check` | Check code formatting                      |
| `npm run type-check`   | Run TypeScript type checking               |
| `npm run check-all`    | Run all checks (format, lint, type, build) |

## 🔧 Development Workflow

### Create New Feature

```powershell
# PowerShell
.\scripts\new-feature.ps1 my-feature

# Or manually
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
git push -u origin feature/my-feature
```

### Work on Feature

```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push

# Create PR on GitHub: feature/my-feature → develop
# CI checks run automatically
# Merge when all checks pass ✅
```

### Deploy to Production

```powershell
# PowerShell
.\scripts\deploy-to-production.ps1

# Or create PR on GitHub: develop → production
```

### Create Release

```bash
# Create PR: production → main
# After merge:
git checkout main
git pull origin main
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## 🤖 CI/CD Pipeline

All branches have automated checks:

- ✅ **Code Formatting** (Prettier)
- ✅ **Linting** (ESLint with TypeScript support)
- ✅ **Type Checking** (TypeScript)
- ✅ **Build Verification**

### Branch-Specific Workflows

| Branch       | Workflow      | Checks                                      |
| ------------ | ------------- | ------------------------------------------- |
| `develop`    | Develop CI    | Format, Lint, Type-check, Build             |
| `production` | Production CI | Format, Lint, Type-check, Build + Artifacts |
| `main`       | Main CI       | Full quality check + Release artifacts      |
| `feature/*`  | Feature CI    | Lint, Build (quick checks)                  |

## 📦 Project Structure

```
next-js-app-template/
├── .github/
│   └── workflows/          # CI/CD workflows
├── src/
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   │   └── atoms/          # Atomic design - base components
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── scripts/                # Helper scripts
├── .eslintrc.json          # ESLint configuration
├── .prettierrc.json        # Prettier configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Code Quality Tools

### ESLint

- Next.js recommended rules
- TypeScript support
- React hooks validation
- Import sorting

### Prettier

- Consistent code formatting
- Integrates with ESLint
- Auto-format on save (VS Code)

### TypeScript

- Strict type checking
- Path aliases configured
- Incremental builds

## 🛡️ Branch Protection

Protected branches require:

- ✅ Pull request reviews
- ✅ All CI checks to pass
- ✅ Up-to-date with base branch
- ❌ No force pushes
- ❌ No deletions

## 📝 Commit Convention

We follow conventional commits:

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc
refactor: code restructuring
test: adding tests
chore: updating build tasks, package manager configs, etc
```

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Ensure all checks pass locally: `npm run check-all`
4. Push and create a pull request
5. Wait for CI checks and review
6. Merge when approved

## 📄 License

MIT

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
# nexus-portfolio
