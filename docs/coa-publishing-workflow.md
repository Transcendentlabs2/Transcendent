# COA publishing workflow

The public COA library is evidence-first. Only lot-specific records backed by real analytical documentation should be published.

## Source of truth

Public records currently live in `lib/coa.ts` in `COA_RECORDS`.

Do not add:

- demonstration lot numbers;
- invented purity percentages;
- placeholder laboratory names;
- unverified HPLC/MS claims;
- certificates copied from another supplier or lot.

## Minimum recommended record

```ts
{
  lot: "REAL-LOT-ID",
  productName: "Compound name",
  productSlug: "existing-product-slug",
  purity: "99.x%", // only if explicitly documented
  analysisDate: "YYYY-MM-DD",
  status: "VERIFIED",
  methods: ["HPLC", "Mass Spectrometry"], // only methods actually documented
  laboratory: "Laboratory name", // optional
  coaUrl: "https://...", // optional public certificate file
  notes: "Optional lot-specific context"
}
```

## Publishing behavior

- `status: "VERIFIED"` records appear in `/coa`, `/coa/[lot]` and the sitemap.
- Non-verified records are not publicly indexed.
- Each lot page links back to the product when `productSlug` is supplied.
- Each lot page links to the COA interpretation research guide.

## Future phase

Move COA records into a database-backed admin workflow once the team wants non-developer publishing. The public URL structure and SEO layer introduced in SEO-06 can remain unchanged when that migration happens.
