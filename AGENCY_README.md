# Agency White Label Template - Quick Start Guide

## 🚀 New Client Onboarding Checklist

Follow these steps to deploy a new client site in under 10 minutes.

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_ORG/photography-portfolio-template.git client-name-portfolio
cd client-name-portfolio
npm install --legacy-peer-deps
```

---

### Step 2: Update Site Configuration

Edit `site-config.ts` in the project root:

```typescript
export const siteConfig: SiteConfig = {
  clientName: 'NEW CLIENT NAME',  // ← Change this
  tagline: 'Their Tagline',       // ← Change this
  
  contact: {
    email: 'hello@client.com',    // ← Change this
    phone: '+1 234 567 890',      // ← Change this
    location: 'Client City',      // ← Change this
  },
  
  socials: {
    instagram: 'https://instagram.com/client',  // ← Change this
  },
  
  footer: {
    credit: 'Fikanova',           // Keep or change
    creditUrl: 'https://fikanova.co.ke/',
  },
}
```

---

### Step 3: Create Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Create new project → Name it after the client
3. Copy the **Project ID** from the dashboard
4. Generate an API token (Settings → API → Tokens → Add API Token)

---

### Step 4: Set Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_new_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_new_api_token
NEXT_PUBLIC_SITE_URL=https://client-site.pages.dev
```

---

### Step 5: Seed Sanity Data (Optional)

Update `scripts/seed.ts` with client-specific data, then run:

```bash
npx ts-node --esm scripts/seed.ts
```

---

### Step 6: Create GitHub Repository

1. Create new repo on GitHub: `client-name-portfolio`
2. Push code:

```bash
git remote set-url origin https://github.com/YOUR_ORG/client-name-portfolio.git
git push -u origin main
```

---

### Step 7: Configure Cloudflare Pages

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Pages** → **Create a project** → **Connect to Git**
3. Select the new repository
4. Configure build settings:
   - **Build command**: `npm run pages:build`
   - **Output directory**: `.open-next/assets`
5. Add environment variables in Cloudflare:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SITE_URL`

---

### Step 8: Configure GitHub Actions Secrets

In the new GitHub repo, go to **Settings → Secrets → Actions** and add:

| Secret Name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | Your Cloudflare API token |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `CLOUDFLARE_PROJECT_NAME` | The Cloudflare Pages project name |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Client's Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SITE_URL` | Final production URL |

---

## 🎨 Customization Reference

### Colors
Edit `theme.primaryColor` in site-config.ts or modify `app/globals.css`.

### Typography  
Change `theme.fontFamily` in site-config.ts and update `app/layout.tsx`.

### Navigation
Edit `nav.links` array in site-config.ts.

### Images
Upload client images to Sanity Studio. The custom loader handles optimization.

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `site-config.ts` | **Main config** - branding, contact, etc. |
| `.env.local` | Environment variables (local) |
| `app/layout.tsx` | Root layout with metadata |
| `lib/sanity.ts` | Sanity client configuration |
| `.github/workflows/deploy.yml` | CI/CD pipeline |

---

## 🔧 Local Development

```bash
npm run dev          # Start dev server
npm run pages:build  # Build for Cloudflare
npm run preview      # Preview Cloudflare build locally
```

---

## 📞 Support

Contact the Fikanova dev team for assistance.
