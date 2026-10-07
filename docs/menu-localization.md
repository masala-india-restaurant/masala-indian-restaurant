# Menu language correction

The locale switch and `menu.getCategories({ locale })` already selected the correct
language. The original `seed.items` import, however, published the same English
item name, description and note under all five locales. Category translations
were present, which made the menu appear only partially translated.

`data/menu-translations.ts` supplies Dutch, Spanish, French and Norwegian text for
the original menu. Recognizable dish names and drink brands remain unchanged.
The translation tuples are ordered `nl`, `es`, `fr`, `no`.

The server menu page uses `localizeSeededMenuItem` to correct old English
placeholders without a database rewrite or reseeding. It matches the original
item slug (case-insensitively) and each field's exact original English text. CMS
edits, empty fields, new items, pricing, images, order and dietary flags are
preserved. Existing query rules still control published content and English
fallback. This is a compatibility dictionary, not automatic translation for new
CMS content: new or edited text should be translated and published in the CMS.

Future seeds and the legacy `getLocalizedMenuCategories` helper use the same
translations. **Do not rerun the seed on an existing database**; it inserts
duplicate records. Deploying the Next.js change is enough to correct the existing
public menu; no Convex deployment or data mutation is required for that fix.

Run `pnpm test:menu` with Node 22.15+ (verified with Node 24) for translation
coverage, CMS edit preservation, unchanged prices/images, English behavior,
case-insensitive slug matching, and missing/unknown item behavior. Run
`pnpm lint` and `pnpm build` for project checks.

Browser verification: use the language picker on `/en/menu` to visit `/nl/menu`,
`/es/menu`, `/fr/menu` and `/no/menu`. Check the special menu description and note,
dish names, category labels and protein prices. Switch back to English and repeat
at mobile width. The menu should keep the same dishes and prices throughout.
