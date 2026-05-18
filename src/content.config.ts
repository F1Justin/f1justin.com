import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const worksCollection = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    emoji: z.string(),
    tagline: z.string(),
    time_range: z.string(),
    links: z.object({
      github: z.string().url().optional(),
      post: z.string().optional(),
    }).optional(),
    featured: z.boolean().optional().default(false),
    order: z.number().optional(),
  }),
});

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
  }),
});

export const collections = {
  works: worksCollection,
  posts: postsCollection,
};
