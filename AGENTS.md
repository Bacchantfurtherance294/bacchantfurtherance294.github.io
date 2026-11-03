# Project guide

This is an Astro 5 static website, intentionally without server routes, persistence or a database. Deploy to Netlify with `npm run build` and publish `dist`. The build includes a Pagefind indexing step. Netlify explicitly runs `npm ci --include=dev --no-audit --no-fund` first so CLI deployments have both Astro and Pagefind available. Keep `package-lock.json` synchronized with `package.json`. Do not switch frameworks or add runtime services for content editing.

## Architecture

- `src/content/recipes/*.md`: source of truth for recipe content; one file per recipe language.
- `src/content.config.ts`: glob loader and Zod schema. Always keep a Portuguese entry for each recipe key; at most one entry per key/language.
- `src/lib/site.ts`: branding, category names, all bilingual interface copy, language-aware recipe lookup and Portuguese fallback.
- `src/pages/[...path].astro`: generates home, list, category, about and recipe pages for both languages at build time. Stable recipe keys appear in URLs in both languages.
- `src/layouts/Layout.astro`: document metadata, header, switcher and footer.
- `src/components/Card.astro`: shared recipe card.
- `src/styles/global.css`: shared responsive styles, theme variables, print styles and reduced-motion rules.
- `public/images`: local sample photography. Optional recipe images use a card fallback.
- `netlify.toml`: static build configuration and root redirect.

## Conventions and decisions

Use TypeScript for helpers and Astro templates for presentation. Keep category IDs independent of displayed translations. Use `copy` for interface strings. Use the same recipe key in both language files. New routes must remain statically enumerable.

Pagefind indexes only individual recipe content using `data-pagefind-body`; keys are exported as Pagefind metadata. Search loads the static index on demand and intersects result keys with the selected category on the client. `astro.config.mjs` marks `/pagefind/pagefind.js` as a Rollup external so the browser loads it at runtime; Pagefind generates that module only after the Astro build. Preserve this external configuration when changing the bundler setup. This supports simultaneous text and category filtering without a backend. Sequence IDs prevent stale asynchronous results from overriding newer input. Search requires a production build; development mode provides a clear error rather than silently pretending to search.

English routes always exist, even without a translation; they render Portuguese recipe content with an explanation. Keep the recipe language attribute and localized route metadata intact. Do not add `og:image`; the hosting platform supplies it. Recipe photos appear in Twitter metadata and Recipe JSON-LD.

The Instagram profile and sample video URLs currently point to Instagram's homepage, pending the owner's real links. Never invent personal account handles. About text is intentionally general and editable.

Review changes by reading edited files in agent runs. The platform handles installation and build validation; do not run builds, development servers, tests or TypeScript validation in these runs. Do not commit generated `dist` or Pagefind assets.

## Recipe measurements

For all future recipes, translate teaspoon (tsp) as colher de chá, tablespoon (tbsp) as colher de sopa, and cup as xícara. Preserve supplied quantities and distinguish colher de café (coffee spoon) from colher de chá (teaspoon). Do not invent servings or package sizes.
