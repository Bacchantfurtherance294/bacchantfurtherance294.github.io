import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const recipes = defineCollection({
 loader: glob({pattern:'**/*.md', base:'./src/content/recipes'}),
 schema:z.object({key:z.string(),lang:z.enum(['pt','en']),title:z.string(),description:z.string(),categories:z.array(z.enum(['salads','chicken','meats','pork','desserts'])).min(1),ingredients:z.array(z.string()).min(1),ingredientGroups:z.array(z.object({title:z.string(),items:z.array(z.string()).min(1)})).optional(),steps:z.array(z.string()).min(1),instagram:z.string().url().refine(url => new URL(url).hostname === 'www.instagram.com' || new URL(url).hostname === 'instagram.com', 'Use an Instagram URL'),image:z.string().optional(),date:z.coerce.date(),servings:z.number().positive().optional()})
});
export const collections={recipes};
