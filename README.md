# Masala Indian Restaurant

Website for **Masala Indian Restaurant** — an authentic Indian restaurant located at Av. Mediterráneo 33, Local 1B, Guardamar del Segura, Spain.

Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Motion for animations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Animations | Motion 12 (formerly Framer Motion) |
| Language | TypeScript 5 |
| Package manager | pnpm |

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — the app redirects to the default locale (`/en`).

```bash
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # ESLint
```

---

## Project Structure

```
app/
  layout.tsx            # root layout
  page.tsx              # redirects / → /en
  globals.css
  [lang]/               # locale-aware routes (en | nl | es | fr)
    layout.tsx
    page.tsx            # home page
    menu/
      page.tsx          # full menu page

components/
  Navbar.tsx
  Hero.tsx
  Story.tsx
  StatsBar.tsx
  FeaturedDishes.tsx
  MenuPreview.tsx
  Gallery.tsx
  ValuesSection.tsx
  CTASection.tsx
  Footer.tsx
  EntryTransition.tsx
  RevealOnScroll.tsx
  RouteTransitionLink.tsx
  MotionProvider.tsx
  MotionLift.tsx
  MotionPressable.tsx
  MotionReveal.tsx
  menu/
    MenuClient.tsx      # interactive menu with category tabs
    DishCard.tsx
    SectionFrame.tsx
    SpiceIndicator.tsx
    VegMark.tsx
    PepperIcon.tsx
    MenuLegendRow.tsx

data/
  menu.ts               # all menu categories and items

lib/
  i18n.ts               # locales, dictionaries, path helpers
  menu-ui.ts            # menu display utilities

public/
  images/               # food photography
  icon/                 # SVG icons
  menu/                 # PDF menu files
```

---

## Internationalisation

The site supports four locales routed under `app/[lang]/`:

| Code | Language |
|---|---|
| `en` | English (default) |
| `nl` | Dutch |
| `es` | Spanish |
| `fr` | French |
| `no` | Norwegian |

All UI copy lives in `lib/i18n.ts` as typed `SiteDictionary` objects — one per locale. Menu category labels and item notes are also localised there. The `getDictionary(locale)` and `getLocalizedMenuCategories(locale)` helpers are used in server components to pass the correct copy down.

---

## Menu Data

All menu content is defined in `data/menu.ts`. Categories include:

- Special Menu (€19.95 set menu)
- Starters
- Tandoori
- Tandoori Mains
- Main Courses
- Chef's Specials
- Biryani
- Vegetarian
- Kids Meals
- Breads & Rice
- Desserts
- Soft Drinks
- Waters & Indian Drinks (lassi, etc.)
- Wines
- Beer & Spirits
- Cocktails & Coffees

Each item can carry a `spiceLevel` (0–4), a `veg` flag, a `chefSpecial` flag, a protein key, and an optional `note`.

---

## Design & Branding

Site designed and crafted by [lowhp.studio](https://lowhp.studio). Branding elements include:

- A styled `.lowhp-mark` link component (shown on the entry transition splash screen)
- A `ConsoleBrand` component that logs a branded credit message to the browser console
- A `--lowhp-accent` CSS variable (`#7df9c5`) used across brand-highlight states

---

## Notable Features

- **View Transitions** — uses the experimental `viewTransition` Next.js config flag alongside the View Transitions API for page-level animations.
- **Scroll reveal animations** — `RevealOnScroll` and `MotionReveal` components wrap sections with entrance animations powered by Motion.
- **Spice level indicator** — pepper icons (0–4) rendered on every dish card on the menu page.
- **Veg / non-veg marks** — green square dot indicator following the Indian food labelling convention.
- **PDF menus** — printable menus are served from `public/menu/` and linked in the footer.
