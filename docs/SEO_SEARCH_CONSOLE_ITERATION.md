# Search Console SEO Iteration Plan

This site now has the technical and content foundation for a Search Console feedback loop: sitemap coverage, comparison pages, best-fit guides, expanded curriculum reviews, and clearer page metadata.

## Sitemap to submit

Submit this sitemap in Google Search Console:

- `https://www.thecurriculumcompass.com/sitemap.xml`

The sitemap should include:

- Core pages: `/`, `/quiz`, `/directory`, `/compare`, `/best`, `/blog`
- All curriculum review pages
- All comparison pages
- All best-for landing pages
- Blog posts

## Manual Search Console steps

1. Open Google Search Console.
2. Choose the `https://www.thecurriculumcompass.com/` property.
3. Go to **Sitemaps**.
4. Submit `sitemap.xml`.
5. After deploy, inspect a few representative URLs:
   - `/compare/abeka-vs-bju-press`
   - `/best/christian-homeschool-curriculum`
   - `/curriculum/sonlight`
   - `/quiz`

## 2–4 week iteration window

Wait 2–4 weeks after Google has crawled the new pages before making big conclusions. Early impressions can appear before rankings stabilize.

Track these metrics weekly:

- Impressions by page
- Average position by query
- CTR by page
- Queries with impressions but low CTR
- Pages discovered but not indexed
- Pages indexed but not receiving impressions

## Weekly actions

1. Export Search Console performance data for the last 28 days.
2. Filter for queries containing:
   - `vs`
   - `best`
   - `review`
   - `homeschool curriculum`
   - curriculum names such as `abeka`, `bju`, `sonlight`, `saxon`, `math u see`
3. Improve pages where impressions are growing but CTR is weak:
   - sharpen title
   - make meta description more specific
   - add a clearer verdict near the top
4. Improve pages where average position is 8–20:
   - add internal links from related curriculum reviews
   - add 2–3 more FAQ answers
   - strengthen the comparison table or buying advice section
5. Inspect unindexed URLs and request indexing only after confirming the page renders useful visible content.

## Success signals

The first targets are not immediate traffic spikes. The strongest early signs are:

- New comparison and best-for URLs are indexed
- Long-tail impressions appear for `curriculum A vs curriculum B`
- Best-for pages earn impressions for `best homeschool curriculum for...`
- Curriculum review pages show higher impressions from added internal links
- CTR improves after title/meta tuning

## Next content expansion candidates

Prioritize pages with real query impressions first. If no Search Console data is available yet, expand in this order:

1. More comparison pages around existing curriculum names.
2. More best-for pages for specific grades and learning needs.
3. Deeper individual reviews for pages already getting impressions.
4. Blog posts that support comparison and best-for pages with internal links.
