# SEO implementation changelog

## SEO-01 Technical Foundation

- Dynamic `robots.txt` and `sitemap.xml`.
- Global metadata, canonical URL, Open Graph and Twitter metadata.
- Organization and WebSite structured data.
- Product metadata with Product, Offer and BreadcrumbList structured data.
- `noindex` metadata for admin, login, checkout and order routes.
- Crawl-safe 404 page.
- Shared site SEO constants with `NEXT_PUBLIC_SITE_URL` support.

The default canonical origin is `https://transcendent-gold.vercel.app` until `NEXT_PUBLIC_SITE_URL` is configured with the final production domain.

## SEO-22 Indexation & Internal Authority

- Reinforced internal crawl paths from the Research Library, glossary, quality hub, tools hub, and peptide category.
- Added exact topical glossary pathways for peptide analysis and peptide lot traceability based on Search Console impressions.
- Connected high-impression glossary terms to specialist HPLC, mass-spectrometry, COA, and batch-traceability resources.
- Reused the canonical Organization entity in Article schema to remove incomplete nested Organization markup.
- Tightened selected titles and meta descriptions that were overlong in the live on-page audit.
- Expanded the tools hub with analytical context and specialist research links.
