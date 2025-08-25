# Woodward Pizza Website

Modern static site for Woodward Pizza (Edmond, OK) optimized for local SEO.

## Deploy to GitHub Pages
1) Create a GitHub repo, copy all files to repo root, push to `main`.
2) Settings → Pages: deploy from branch `main` (root).

## Custom domain (woodwardpizza.com)
- In Pages, set custom domain to `woodwardpizza.com` and **Enforce HTTPS**.
- DNS:
  A @ → 185.199.108.153 / 109.153 / 110.153 / 111.153
  CNAME www → `<username>.github.io`
- (Optional) Commit `CNAME` file with this content:
```
woodwardpizza.com
```

## Search Console
Submit `https://woodwardpizza.com/sitemap.xml` and request indexing for key pages.

## Edits
- Swap hero background images at `/assets/background.*` with your real photos (same names).
- Add GA4 snippet if desired.
