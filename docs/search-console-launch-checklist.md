# Search Console and Indexation Launch Checklist

This checklist is the operational handoff after the technical SEO foundation is deployed.

## 1. Confirm the canonical production domain

Set `NEXT_PUBLIC_SITE_URL` in Vercel to the final public domain, including `https://` and no trailing slash.

Example:

```text
NEXT_PUBLIC_SITE_URL=https://example.com
```

Do not submit a temporary Vercel preview hostname to Search Console if the business will use a custom domain. Canonicals, structured data, sitemap URLs and COA links all derive from `NEXT_PUBLIC_SITE_URL`.

## 2. Google Search Console verification

Create a Google Search Console property for the final production domain.

Preferred option: Domain property with DNS verification.

Optional HTML-meta verification is already supported by the application. Add the token value only (not the full meta tag) to Vercel:

```text
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-token
```

After deployment, verify that the page source contains a `google-site-verification` meta tag.

## 3. Bing Webmaster Tools verification

The application also supports Bing meta verification:

```text
NEXT_PUBLIC_BING_SITE_VERIFICATION=your-bing-token
```

After deployment, verify that the page source contains `msvalidate.01`.

## 4. Submit the sitemap

Submit:

```text
https://YOUR-DOMAIN/sitemap.xml
```

The sitemap includes:

- Home
- `/research-peptides`
- `/research-compounds`
- `/research`
- Published research guides
- `/research/compounds`
- Compound research profiles that meet the minimum-content threshold
- `/coa`
- Verified lot-specific COA pages
- Active product pages

## 5. Inspect priority URLs

Request indexing for the highest-value URLs first:

1. `/`
2. `/research-peptides`
3. `/research`
4. `/coa`
5. `/research/what-are-research-peptides`
6. `/research/hplc-peptide-testing`
7. `/research/how-to-read-peptide-coa`
8. Highest-priority product pages
9. Highest-quality compound research profiles

Do not request indexing for admin, login, checkout, order or other operational URLs.

## 6. Validate crawl controls

Check these public files:

```text
/robots.txt
/sitemap.xml
/manifest.webmanifest
/research/feed.xml
```

Confirm that `/admin`, `/login`, `/checkout`, `/orders` and `/api` are disallowed by robots and that operational pages also carry `noindex` metadata where implemented.

## 7. Validate structured data

Use Google's Rich Results Test or Schema Markup Validator on:

- Home: Organization + WebSite
- Product: Product + Offer + BreadcrumbList
- Research guide: Article + BreadcrumbList
- Research profile: WebPage + BreadcrumbList
- COA lot page: WebPage + Dataset
- Catalog/category pages: CollectionPage + ItemList

Only publish analytical claims that are supported by the actual product or lot record.

## 8. Monitor index coverage weekly

Track:

- Discovered URLs
- Crawled URLs
- Indexed URLs
- Crawled - currently not indexed
- Duplicate/canonical exclusions
- Soft 404s
- Server errors

The goal is not to force every URL into the index. Thin product research profiles are intentionally excluded until they meet the content threshold.

## 9. Monitor search performance by cluster

Measure separately:

- Commercial: research peptides, research compounds, product names
- Analytical: HPLC peptide testing, peptide purity testing, mass spectrometry
- Documentation: peptide COA, certificate of analysis, batch verification
- Stability: lyophilized peptide stability, laboratory storage context
- Brand: Transcendent Labs

## 10. Research feed

The research library publishes an RSS feed at:

```text
/research/feed.xml
```

The root metadata advertises this feed automatically to compatible clients and crawlers.

## Guardrail

Search performance must not be improved by publishing unsupported purity values, fabricated reviews, invented laboratories, demo COAs, medical claims, human-use instructions, dosing information or administration guidance.
