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
