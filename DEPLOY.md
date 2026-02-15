# Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd ~/puffpay-tempo
vercel
```

4. Add environment variables when prompted:
```
VITE_PRIVY_APP_ID=cmlnefx9y007c0cl870yu2b9x
VITE_TEMPO_RPC=https://rpc.moderato.tempo.xyz
VITE_TEMPO_CHAIN_ID=42431
```

5. Deploy to production:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new

2. Import your GitHub repository:
   - Connect GitHub account
   - Select: `Tasfia-17/puffpay`

3. Configure project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. Add Environment Variables:
   ```
   VITE_PRIVY_APP_ID=cmlnefx9y007c0cl870yu2b9x
   VITE_TEMPO_RPC=https://rpc.moderato.tempo.xyz
   VITE_TEMPO_CHAIN_ID=42431
   ```

5. Click "Deploy"

### After Deployment

Your app will be live at: `https://puffpay-[random].vercel.app`

You can:
- Set custom domain
- View deployment logs
- Update environment variables
- Redeploy with `vercel --prod`

### Troubleshooting

**Build fails:**
```bash
# Test build locally first
npm run build
```

**Environment variables not working:**
- Make sure they start with `VITE_`
- Redeploy after adding variables

**404 errors:**
- Check `vercel.json` is present
- Verify rewrites configuration

### Update Submission

Once deployed, update your hackathon submission with:
- Live Demo URL: `https://your-app.vercel.app`
