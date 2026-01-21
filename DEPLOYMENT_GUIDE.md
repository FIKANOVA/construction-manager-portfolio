# Deployment Guide: Bruce Odhiambo Portfolio

Deploy to **Cloudflare Pages** with custom domain `bruce.fikanovaco.ke` and **Sanity Studio** for client content editing.

---

## Part 1: Prepare for Deployment

### 1.1 Add .gitignore entries

```bash
# Add to .gitignore
echo ".open-next" >> .gitignore
echo ".env.local" >> .gitignore
```

### 1.2 Create a new GitHub repository

```bash
# Initialize git (if not already)
git init

# Create GitHub repo (use GitHub CLI or web interface)
# Name: construction-manager-portfolio

git remote add origin https://github.com/YOUR_ORG/construction-manager-portfolio.git
```

### 1.3 Commit and push

```bash
git add .
git commit -m "Initial commit: Bruce Odhiambo portfolio"
git push -u origin main
```

---

## Part 2: Cloudflare Pages Setup

### 2.1 Create Cloudflare Pages project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **Create**
3. Select **Pages** → **Connect to Git**
4. Authorize GitHub and select `construction-manager-portfolio`
5. Configure build settings:

| Setting | Value |
|---------|-------|
| **Framework preset** | None |
| **Build command** | `npm run pages:build` |
| **Build output directory** | `.open-next/assets` |
| **Root directory** | `/` |

### 2.2 Add Environment Variables

In Cloudflare Pages project settings → **Environment Variables**, add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `5x0wp0xx` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `https://bruce.fikanovaco.ke` |
| `SANITY_API_TOKEN` | (your token) |

> ⚠️ Add these for **both** Production and Preview environments.

---

## Part 3: Custom Domain Setup

### 3.1 Add custom domain in Cloudflare Pages

1. In your Pages project → **Custom domains** → **Set up a custom domain**
2. Enter: `bruce.fikanovaco.ke`
3. Click **Activate domain**

### 3.2 Configure DNS (if fikanova.co.ke is on Cloudflare)

Cloudflare will auto-configure DNS. If manual setup needed:

| Type | Name | Target |
|------|------|--------|
| CNAME | vuyo | `construction-manager-portfolio.pages.dev` |

### 3.3 Enable HTTPS

Cloudflare automatically provisions SSL. Wait 1-5 minutes for activation.

---

## Part 4: Client Dashboard (Embedded Studio)

The Sanity Studio is now embedded directly in your application at `/studio`.

### 4.1 Accessing the Dashboard

Once deployed, the dashboard will be available at:
**`https://bruce.fikanovaco.ke/studio`**

No separate deployment is needed! It deploys automatically with your Next.js app.

### 4.2 Configure CORS

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select project `5x0wp0xx`
3. **API** → **CORS Origins**
4. Add credentialed origin: `https://bruce.fikanovaco.ke` (and `http://localhost:3000` for testing)

### 4.3 Invite Client to Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select project `5x0wp0xx`
3. **Settings** → **Members** → **Invite member**
4. Enter client email and set role to **Editor**

---

## Part 5: Final URLs

| Purpose | URL |
|---------|-----|
| **Live Site** | https://bruce.fikanovaco.ke |
| **Client Dashboard** | https://bruce.fikanovaco.ke/studio |
| **Staging** | https://construction-manager-portfolio.pages.dev |

---

## Part 6: GitHub Actions (Auto-Deploy)

The `.github/workflows/deploy.yml` is already configured. Add these secrets to GitHub:

**Repository → Settings → Secrets → Actions → New secret**

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | [Create here](https://dash.cloudflare.com/profile/api-tokens) (Edit Pages) |
| `CLOUDFLARE_ACCOUNT_ID` | Found in Cloudflare dashboard URL |
| `CLOUDFLARE_PROJECT_NAME` | `construction-manager-portfolio` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `5x0wp0xx` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `https://bruce.fikanovaco.ke` |

---

## Quick Command Reference

```bash
# Local development
npm run dev

# Build for Cloudflare
npm run pages:build

# Preview Cloudflare build locally
npm run preview

# Deploy to Cloudflare
npm run deploy

# Deploy Sanity Studio
npx sanity deploy
```

---

## Troubleshooting

**Build fails on Cloudflare?**
- Ensure `--legacy-peer-deps` is used: Add `NPM_FLAGS=--legacy-peer-deps` to env vars

**DNS not working?**
- Wait 5-10 minutes for propagation
- Check Cloudflare DNS settings

**Sanity data not showing?**
- Verify API token has read permissions
- Check browser console for CORS errors
