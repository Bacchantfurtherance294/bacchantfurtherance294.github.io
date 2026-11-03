# Daniel Grandi BBQ

A static, bilingual recipe website built with Astro 5, Markdown content collections and Pagefind. Portuguese is the default at `/pt/`; English lives at `/en/`. There is no database, backend, account system or paid service dependency.

## Run locally

1. Install Node.js 22 or newer.
2. Run `npm install`.
3. Run `npm run dev` and open the address shown in the terminal.
4. For the complete search experience, run `npm run build`, then `npm run preview`. Pagefind generates its index after Astro's production build; it is unavailable in the ordinary development server.

## Where to find this guide and add recipes

This guide is `README.md` in the root of the project source files. Open it in your repository browser or a code editor. Recipes live in `src/content/recipes/`; recipe photos go in `public/images/`. There is no recipe editor or upload screen on the public website. Publish source changes through the connected repository to trigger a Netlify rebuild. You can also send the recipe text, photo and Instagram video link in this conversation for help adding it.

## Add a recipe, step by step

1. Copy `src/content/recipes/picanha.pt.md` to `src/content/recipes/your-recipe.pt.md`.
2. Set `key` to a unique, stable, URL-friendly name, such as `costela-assada`. This creates `/pt/recipes/costela-assada/` and `/en/recipes/costela-assada/`.
3. Keep `lang: "pt"` and fill in the title, description, ingredients and preparation steps. The ingredients and steps are YAML lists; their order controls the displayed order. Steps are numbered automatically.
4. Choose one or more category IDs: `meats` (beef), `chicken`, `pork`, `salads`, `desserts`. Their displayed names are automatically translated.
5. Enter the publication `date` as `YYYY-MM-DD`. Newest dates appear first. Set `servings` to the number of people served when known; omit it when no yield is supplied. The date is required; total preparation time is not used.
6. Put your cover photo in `public/images/` and set `image` to `/images/your-photo.jpg`. Optimize photos before committing them. The image field is optional; without it the detail page omits the photo and the card uses the site's default food image.
7. Replace `instagram` with the specific Instagram Reel or video URL. It opens in a new tab. The sample recipe video buttons link to Instagram’s homepage until specific video URLs are supplied. The header and footer link to Daniel Grandi’s profile.
8. Save the Markdown file and publish the changes through your connected repository. Netlify rebuilds the static site and its search index automatically.

Example:

```yaml
---
key: "costela-assada"
lang: "pt"
title: "Costela assada"
description: "Costela macia preparada lentamente."
categories:
  - "meats"
ingredients:
  - "1,5 kg de costela bovina"
  - "Sal a gosto"
steps:
  - "Tempere a carne."
  - "Descreva aqui o preparo completo, incluindo temperatura, tempo e ponto seguro."
instagram: "https://www.instagram.com/reel/SEU_VIDEO/"
image: "/images/costela.jpg"
date: "2026-11-03"
servings: 4
---

Optional additional tips and notes can go here as regular Markdown.
```

The example above illustrates the fields; replace the preparation with your complete tested method before publishing. Quote text containing colons or other YAML punctuation. The sample files use JSON-style lists, which are also valid YAML.

## Ingredient groups and measurement translations

Keep these measurement translations for every new recipe:

- Teaspoon (tsp) = colher de chá.
- Tablespoon (tbsp) = colher de sopa.
- Cup = xícara.

Preserve supplied quantities; do not infer package sizes or servings. A colher de café is a coffee spoon, not a teaspoon (colher de chá), so keep that distinction in English. Use `ingredientGroups` for separate lists such as sauces, translating each group's title and items in the English file. See `chimichanga.pt.md` and `chimichanga.en.md` for examples. List an ingredient once per component; cilantro in the filling and cilantro in the sauce remain separate entries.

## Add an English translation

Copy the Portuguese file to `your-recipe.en.md`. Keep exactly the same `key`, set `lang: "en"`, and translate the title, description, ingredient list, steps and any Markdown notes. Keep category IDs unchanged. Maintain one file per key and language, and always include the Portuguese version.

If English is missing, the English recipe route renders the Portuguese recipe with a visible explanation. The header language switch preserves the recipe, category or other page. English interface text remains English around a Portuguese fallback. Both languages are indexed separately by Pagefind, including fallback text; searches match the language of the actual recipe content.

## Customize your site

- **Brand name, footer Instagram URL, translated interface and category names:** `src/lib/site.ts`. The header and footer use the supplied Daniel Grandi profile URL.
- **About introduction:** update `aboutTitle`, `aboutIntro`, `aboutBody` and `aboutMore` in both languages in `src/lib/site.ts`.
- **Logo:** update `public/images/daniel-grandi-logo.webp` for the header and `public/favicon.png` for the browser-tab icon.
- **Colors and fonts:** change the CSS variables at the top of `src/styles/global.css`. Google Fonts are free; Georgia and sans-serif fallbacks remain usable if the font service is unavailable.
- **New category:** add its ID to the category enum in `src/content.config.ts` and its Portuguese and English labels in `src/lib/site.ts`. Category pages are generated automatically.
- **Domain:** update `site` in `astro.config.mjs` and the sitemap address in `public/robots.txt` if you add a custom domain.

The site generates page titles, descriptions, canonical links, language alternatives, a sitemap, Twitter share-image metadata and Recipe structured data. Netlify supplies the Open Graph share image. Each recipe photo is also included in its structured data.

## Deploy on Netlify

Connect the repository. `netlify.toml` installs the locked dependencies with `npm ci --include=dev --no-audit --no-fund`, runs `npm run build`, and publishes `dist`. The explicit install also supports deployments launched directly through the Netlify CLI without a prior dependency installation. No environment variables are required. The build creates all pages and Pagefind's static assets. The root URL redirects to `/pt/`.

## Sample content and images

Four complete sample recipes are included in Portuguese and English: picanha, lemon chicken, tomato and burrata salad, and grilled pineapple. Adapt them to your own recipes and videos. The starter introduction is editable copy, not a verified biography.

The bundled illustrative food images are downloaded from Unsplash (image IDs `photo-1546833999-b9f581a1996d`, `photo-1532550907401-a500c9a57435`, `photo-1515543904379-3d757afe72e4`, `photo-1550258987-190a2d41a8ba`). Replace them with your own finished-dish photography as you publish. They are stored locally, so visitors do not depend on an external photo service.
