# SCULPTURELANDIA Deployment Guide

## ✅ Pre-Deployment Checklist

Your site is ready for deployment! Here's what's been prepared:

- ✅ Build system working (`npm run build` successful)
- ✅ All 12 sculpture drawings properly loaded
- ✅ Netlify configuration created (`netlify.toml`)
- ✅ SPA routing configured for React Router
- ✅ Asset optimization enabled
- ✅ TypeScript compilation clean

## 🚀 Deploy to Netlify (Recommended)

### Option 1: GitHub + Netlify (Continuous Deployment) - RECOMMENDED

This is the best approach for ongoing development:

#### Step 1: Push to GitHub
```bash
# If not already a git repository, initialize one:
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial SCULPTURELANDIA site"

# Create GitHub repository and push
# (Replace YOUR_USERNAME with your GitHub username)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sculpturelandia-site.git
git push -u origin main
```

#### Step 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize GitHub access
5. Select your repository
6. Netlify will auto-detect the settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18
7. Click "Deploy Site"

#### Step 3: Custom Domain (Optional)
- In Netlify dashboard → Site settings → Domain management
- Add your custom domain or use the free `.netlify.app` subdomain

### Option 2: Manual Deploy (Quick Test)

For a quick test without GitHub:

1. Run the build command:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com) and login
3. Drag and drop the `dist` folder directly onto Netlify
4. Your site will be live instantly!

## 🔄 Continuous Deployment Workflow

Once connected to GitHub, your workflow will be:

1. **Make changes** to your code locally
2. **Test locally** with `npm run dev`
3. **Commit changes** with `git add . && git commit -m "Your message"`
4. **Push to GitHub** with `git push`
5. **Netlify automatically** builds and deploys your changes!

## 📁 Project Structure for Deployment

```
dist/                     ← Built files (created by npm run build)
├── index.html           ← Main HTML file
├── assets/
│   ├── index-[hash].js  ← Compiled JavaScript
│   └── drawings/        ← All 12 sculpture drawings
│       ├── atom-chair.PNG
│       ├── double-nauty.PNG
│       └── ... (10 more)
netlify.toml             ← Netlify configuration
package.json             ← Dependencies and scripts
src/                     ← Source code
```

## 🛠 Key Configuration Files

### `netlify.toml` (Created)
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA redirects**: All routes redirect to `index.html`
- **Asset caching**: Optimized cache headers

### `.gitignore` (Existing)
- Excludes `dist/`, `node_modules/`, logs
- Netlify will build fresh on each deployment

## 🎯 Next Steps After Deployment

1. **Test your live site** - All sculpture animations should work
2. **Set up branch protection** on GitHub (optional)
3. **Add environment variables** in Netlify if needed later
4. **Monitor build logs** in Netlify dashboard
5. **Set up domain** if you have a custom one

## 🐛 Troubleshooting

### Common Issues:
- **404 on refresh**: Fixed by SPA redirects in `netlify.toml`
- **Missing images**: All drawing assets are included in build
- **Build fails**: Check build logs in Netlify dashboard

### Build Commands:
```bash
# Local development
npm run dev

# Production build (same as Netlify uses)
npm run build

# Preview production build locally
npm run preview
```

Your site is ready to go live! 🎉
