import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: import.meta.env.DEV
      ? '**/*.{md,mdx}'
      : ['**/*.{md,mdx}', '!**/_*.{md,mdx}'],
  }),
  schema: z.object({
    title: z.string().max(30),
    description: z.string().max(100),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).max(5),
  }),
});

export const collections = { blog };
