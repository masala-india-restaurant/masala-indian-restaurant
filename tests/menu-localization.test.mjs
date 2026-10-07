import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

// Node 22.15+ resolves the same @/ aliases that Next.js and Convex use.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      return {
        url: new URL(`../${specifier.slice(2)}.ts`, import.meta.url).href,
        shortCircuit: true,
      };
    }
    return nextResolve(specifier, context);
  },
});

const { menuCategories } = await import("../data/menu.ts");
const { localizeSeededMenuItem } = await import("../lib/menu-localization.ts");
const { getLocalizedMenuCategories } = await import("../lib/i18n.ts");
const { itemNames, itemDescriptions, itemNotes } = await import("../data/menu-translations.ts");
const items = menuCategories.flatMap((category) => category.items);
const special = items.find((item) => item.id === "special-menu-per-person");
const properNames = new Set([
  "Pappadum", "Paneer Pakora", "Gobi Pakora", "Chana Chaat", "Chana Puri",
  "Seekh Kebab", "Paneer Tikka Shashlik", "Korma", "Tikka Masala", "Curry",
  "Rogan Josh", "Karahi", "Bhuna", "Balti", "Jalfrezi", "Madras", "Vindaloo",
  "Palak", "Pathia", "Dhansak", "Aloo Palak", "Chana Masala", "Paneer Jalfrezi",
  "Dal Tarka", "Paneer Palak", "Bombay Aloo", "Gobi Aloo", "Paneer Makhani",
  "Keema Naan", "Peshwari Naan", "Tandoori Roti", "Chapati Roti", "Coca Cola",
  "Cola Zero", "Sprite", "Nestea", "Aquarius", "Gaseosa", "Ribera Del Duero",
  "Embotellado la Propiedad", "Cobra", "San Miguel", "Coronita", "Vodka",
  "Tequila", "Bacardi", "Baileys", "Tia Maria", "Malibu", "Soberano", "Magno",
  "Ballantine's", "Red Label", "Jameson", "J&B", "Jack Daniel's",
  "Sex on the Beach", "Porn Star Martini", "Piña Colada", "Mojito",
  "Espresso Martini", "Tinto de Verano", "Espresso", "Cortado", "Americano",
  "Cappuccino", "Bombon",
]);

test("every seeded menu field has translations or an explicit proper name", () => {
  for (const item of items) {
    assert.ok(properNames.has(item.name) || Object.hasOwn(itemNames, item.name), item.id);
    if (item.description) assert.ok(Object.hasOwn(itemDescriptions, item.description), item.id);
    if (item.note) assert.ok(Object.hasOwn(itemNotes, item.note), item.id);
  }
  for (const dictionary of [itemNames, itemDescriptions, itemNotes]) {
    for (const translations of Object.values(dictionary)) {
      assert.equal(translations.length, 4);
      assert.ok(translations.every((text) => typeof text === "string" && text.trim()));
    }
  }
});

for (const [locale, name, note] of [
  ["nl", "Speciaal menu", "Per persoon"],
  ["es", "Menú especial", "Por persona"],
  ["fr", "Menu spécial", "Par personne"],
  ["no", "Spesialmeny", "Per person"],
]) {
  test(`${locale}: translates dishes and all descriptions while preserving menu data`, () => {
    const original = structuredClone(items);
    assert.equal(localizeSeededMenuItem(locale, special).name, name);
    assert.equal(localizeSeededMenuItem(locale, special).note, note);
    for (const item of items) {
      const translated = localizeSeededMenuItem(locale, item);
      if (item.description) assert.notEqual(translated.description, item.description, item.id);
      if (properNames.has(item.name)) assert.equal(translated.name, item.name);
      const nonText = (value) => Object.fromEntries(
        Object.entries(value).filter(([key]) => !["name", "description", "note"].includes(key)),
      );
      assert.deepEqual(nonText(translated), nonText(item));
      assert.deepEqual(localizeSeededMenuItem(locale, translated), translated);
    }
    assert.deepEqual(items, original);
    assert.deepEqual(
      getLocalizedMenuCategories(locale).flatMap((category) => category.items),
      items.map((item) => localizeSeededMenuItem(locale, item)),
    );
  });
}

test("English content stays unchanged", () => {
  for (const item of items) assert.equal(localizeSeededMenuItem("en", item), item);
});

test("CMS slug casing does not prevent an existing dish from being translated", () => {
  const source = items.find((item) => item.id === "tikka-masala");
  const translated = localizeSeededMenuItem("es", { ...source, id: "Tikka-Masala" });
  assert.equal(translated.id, "Tikka-Masala");
  assert.equal(translated.description, "Tikka marinado cocinado a fuego lento en una salsa de tomate rica y cremosa");
});

test("CMS edits win independently for each field, including untranslated custom copy", () => {
  const custom = { ...special, name: "Menú degustación", description: "Custom seasonal recipe", note: "Solo por la noche", price: 24.95, image: "https://example.com/new.jpg" };
  assert.deepEqual(localizeSeededMenuItem("es", custom), custom);
  const mixed = localizeSeededMenuItem("es", { ...custom, name: special.name });
  assert.equal(mixed.name, "Menú especial");
  assert.equal(mixed.description, custom.description);
  assert.equal(mixed.note, custom.note);
  assert.equal(mixed.price, custom.price);
  assert.equal(mixed.image, custom.image);
});

test("unknown items and intentionally empty CMS fields are not filled from seed data", () => {
  const unknown = { ...special, id: "new-special" };
  assert.equal(localizeSeededMenuItem("es", unknown), unknown);
  for (const value of [undefined, ""]) {
    const translated = localizeSeededMenuItem("fr", { ...special, description: value, note: value });
    assert.equal(translated.description, value);
    assert.equal(translated.note, value);
  }
});
