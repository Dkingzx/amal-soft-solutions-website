# GitHub upload steps

1. Create a new **empty** repository on GitHub. Do not add a README, .gitignore, or license there because this project already has a README.
2. Open this project folder in VS Code.
3. Open Terminal > New Terminal and run:

```bash
git init
git add .
git commit -m "Prepare Amal Soft Solutions React website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-NEW-REPO.git
git push -u origin main
```

Replace `YOUR-USERNAME/YOUR-NEW-REPO` with your actual GitHub username and repository name.

If `remote origin already exists`, run:
```bash
git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-NEW-REPO.git
git push -u origin main
```

Before sharing with your TL:
```bash
npm install
npm run build
```
Make sure the build completes successfully, then send your TL the GitHub repository URL.
