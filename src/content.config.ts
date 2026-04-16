import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.{md,mdx}'
  }),
  schema: z.object({
    title: z.string().max(30),
    description: z.string().max(100),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).max(5),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
