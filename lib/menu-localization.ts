import { menuCategories, type MenuItem } from "@/data/menu";
import { itemDescriptions, itemNames, itemNotes } from "@/data/menu-translations";
import type { Locale } from "@/lib/locales";

const seededItems = new Map(menuCategories.flatMap((category) =>
  category.items.map((item) => [item.id, item] as const)
));
const localeIndex = { nl: 0, es: 1, fr: 2, no: 3 } as const;

/**
 * Older seeds published the English item copy under every locale. Translate only
 * fields still equal to that item's seed text; edited CMS copy remains authoritative.
 * Unknown items and missing fields retain the CMS query's existing fallback behavior.
 */
export function localizeSeededMenuItem<T extends Pick<MenuItem, "id" | "name" | "description" | "note">>(
  locale: Locale,
  item: T,
): T {
  if (locale === "en") return item;
  const source = seededItems.get(item.id.toLowerCase());
  if (!source) return item;

  const result = { ...item };
  const dictionaries = { name: itemNames, description: itemDescriptions, note: itemNotes };
  for (const field of ["name", "description", "note"] as const) {
    const value = item[field];
    if (!value || value !== source[field]) continue;
    const dictionary = dictionaries[field];
    if (Object.hasOwn(dictionary, value)) {
      result[field] = dictionary[value][localeIndex[locale]];
    }
  }
  return result;
}
