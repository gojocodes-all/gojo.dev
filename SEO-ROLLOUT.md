# GOJO.DEV SEO rollout

Updated: 2026-08-06

## Implemented

- Unique page titles and meta descriptions for the homepage and four case studies.
- Exact-name entity signals for `Owojuyigbe Oluwajomiloju` across visible copy, author metadata, social metadata and structured data.
- Canonical URLs using the live `https://www.gojodev.name.ng/` host.
- Open Graph and X/Twitter metadata, including a custom GOJO.DEV social preview image.
- `Person`, `WebSite`, `ProfilePage`, `ItemList`, `CreativeWork`, and `SoftwareSourceCode` structured data where appropriate.
- Semantic heading structure, descriptive image text, accessible navigation, keyboard focus styles, and a skip link.
- A stronger search-focused homepage heading and clear Lagos location context.
- Dedicated case-study pages for Daar El-Mahfouz, Providence Heights, GOJO.DEV WhatsApp CRM, and A&G Varieties Store.
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, and an index-safe custom 404 page.
- Internal links between the homepage and project pages.
- Automatic learning-month counter based on a December 2025 start date, with an `8+` HTML fallback for crawlers.
- Broken A&G live-demo link removed and the project labelled as an archived build.
- Preserved Google Analytics measurement ID `G-D8CQGQFXN8`.

## Manual follow-up after deployment

1. Add `https://www.gojodev.name.ng/` as a URL-prefix property in Google Search Console.
2. Complete Google's ownership verification and add the supplied verification meta tag to `index.html` if Google chooses that method.
3. Submit `https://www.gojodev.name.ng/sitemap.xml` in Search Console.
4. Request indexing for the homepage and each project URL after the deployment is live.
5. Use Search Console's URL Inspection and Rich Results Test to confirm Google's live rendering.

Do not add a made-up `google-site-verification` value. The token must come from the verified Search Console property.
