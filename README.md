# Sriya.AI ROI Estimator

A professional ROI calculator for decision-makers considering Sriya.AI's Large Numerical Models (LNMs).

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/sriya-roi-estimator)

## 📋 Features

- **4-Step User Flow**: Industry selection → Current KPI → Target setting → ROI results
- **4 Industries**: Supply Chain, Financial Services, Healthcare, Retail & E-commerce
- **12 KPIs**: With definitions, typical ranges, and world-class targets
- **Professional Design**: Clean, whitespace-focused, business-appropriate
- **Accurate Calculations**: ROI projections based on industry benchmarks
- **Cost Comparisons**: LNM (CPU) vs Traditional LLM (GPU) analysis
- **Mobile Responsive**: Works perfectly on all devices

## 🛠 Tech Stack

- **React 18** with Vite
- **Tailwind CSS** + shadcn/ui components
- **Lucide React** icons
- **Responsive Design** (mobile-first)

## 🚀 Deployment Instructions

### Option 1: Deploy to Vercel (Recommended)

1. **Fork this repository** to your GitHub account
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your forked repository
   - Vercel will auto-detect the settings
3. **Deploy**: Click "Deploy" - Vercel handles everything automatically!

### Option 2: Manual Vercel CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Clone the repository
git clone https://github.com/YOUR_USERNAME/sriya-roi-estimator.git
cd sriya-roi-estimator

# Install dependencies
pnpm install

# Deploy to Vercel
vercel --prod
```

### Option 3: Other Platforms

The app works on any static hosting platform:

- **Netlify**: Drag and drop the `dist` folder after running `pnpm run build`
- **GitHub Pages**: Enable Pages in repository settings
- **Firebase Hosting**: Use `firebase deploy`

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/sriya-roi-estimator.git
cd sriya-roi-estimator

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## 📁 Project Structure

```
src/
├── App.jsx              # Main application component
├── App.css              # Tailwind CSS configuration
├── components/ui/       # shadcn/ui components
└── assets/              # Static assets
```

## 🎯 Usage

1. **Select Industry**: Choose from Supply Chain, Financial Services, Healthcare, or Retail
2. **Choose KPI**: Pick the key performance indicator you want to improve
3. **Enter Current Value**: Input your current performance metric
4. **Set Target**: Define where you want your KPI to be
5. **View ROI**: See projected improvements and cost savings

## 📊 Example Results

**Supply Chain - Backorder Rate**: 12% → 3%
- **75% improvement** in performance
- **$375,000** estimated annual savings
- **$42,000** additional savings from LNM vs LLM technology costs

## 🔧 Customization

### Adding New Industries/KPIs

Edit the `industries` array in `src/App.jsx`:

```javascript
const industries = [
  {
    id: 'your-industry',
    name: 'Your Industry',
    icon: '🏭',
    description: 'Industry Description',
    kpis: [
      {
        id: 'your-kpi',
        name: 'Your KPI Name',
        unit: '%',
        definition: 'KPI definition',
        typical: '10-20%',
        target: '<5%'
      }
    ]
  }
]
```

### Updating Cost Calculations

Modify the `calculateROI()` function in `src/App.jsx` to adjust:
- Base savings amounts per industry
- Technology cost comparisons
- Improvement calculation logic

## 📄 License

MIT License - feel free to use this for your own projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions about Sriya.AI's Large Numerical Models, visit [sriya.ai](https://sriya.ai)

---

**Ready to deploy?** Click the Vercel button above or follow the deployment instructions!

