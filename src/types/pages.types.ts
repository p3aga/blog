import type { CollectionEntry } from 'astro:content';
import type { Page } from 'astro';

export interface BlogListPageProps {
  page: Page<CollectionEntry<'blog'>>;
}

export interface BlogPostPageProps {
  post: CollectionEntry<'blog'>;
}
