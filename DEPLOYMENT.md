# 🚀 GitHub + Vercel Deployment Guide

## Step-by-Step Instructions

### 1. Upload to GitHub

1. **Create a new repository** on GitHub:
   - Go to [github.com](https://github.com) and click "New repository"
   - Name it `sriya-roi-estimator`
   - Make it public or private (your choice)
   - Don't initialize with README (we already have one)

2. **Upload the project files**:
   - Download and extract the project zip file
   - In your terminal/command prompt:
   ```bash
   cd path/to/extracted/sriya-roi-estimator
   git init
   git add .
   git commit -m "Initial commit: Sriya.AI ROI Estimator"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sriya-roi-estimator.git
   git push -u origin main
   ```

### 2. Deploy to Vercel

#### Option A: Automatic Deployment (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite React app
5. Click "Deploy" - that's it!

#### Option B: One-Click Deploy
Click this button after uploading to GitHub:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/sriya-roi-estimator)

### 3. Configuration (Automatic)

Vercel will automatically:
- ✅ Detect it's a Vite React project
- ✅ Use the correct build command (`pnpm run build`)
- ✅ Set the output directory to `dist`
- ✅ Install dependencies with pnpm
- ✅ Deploy to a custom domain

### 4. Custom Domain (Optional)

In your Vercel dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## 🔧 Build Settings (Pre-configured)

If you need to manually configure:

- **Framework Preset**: Vite
- **Build Command**: `pnpm run build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`
- **Development Command**: `pnpm run dev`

## 📁 What's Included

```
sriya-roi-estimator/
├── README.md                 # Comprehensive documentation
├── vercel.json              # Vercel configuration
├── package.json             # Dependencies and scripts
├── .gitignore              # Git ignore rules
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── src/
│   ├── App.jsx             # Main application
│   ├── App.css             # Tailwind styles
│   └── components/ui/      # UI components
└── public/                 # Static assets
```

## 🎯 Features Ready for Production

- ✅ Fully responsive design
- ✅ Professional business interface
- ✅ 4 industries with 12 KPIs
- ✅ Accurate ROI calculations
- ✅ Clean, modern UI
- ✅ Fast loading (optimized build)
- ✅ SEO-friendly
- ✅ Mobile-first design

## 🚨 Important Notes

1. **Update Repository URL**: Change `YOUR_USERNAME` in package.json to your actual GitHub username
2. **Custom Branding**: Update colors, logos, or content as needed
3. **Analytics**: Consider adding Google Analytics or similar
4. **Contact Forms**: Connect the "Book Pilot" button to your actual booking system

## 🆘 Troubleshooting

**Build Fails?**
- Check that all dependencies are in package.json
- Ensure Node.js version compatibility

**Deployment Issues?**
- Verify vercel.json configuration
- Check build logs in Vercel dashboard

**Styling Problems?**
- Tailwind CSS is pre-configured
- All components use shadcn/ui

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- **React Docs**: [react.dev](https://react.dev)

---

**Ready to deploy?** Follow the steps above and your ROI estimator will be live in minutes!

