import type { CollectionEntry } from 'astro:content';
import type { Page } from 'astro';

export interface BlogListPageProps {
  page: Page<CollectionEntry<'blog'>>;
}

export interface BlogPostPageProps {
  post: CollectionEntry<'blog'>;
}

export interface ProjectsListPageProps {
  page: Page<CollectionEntry<'projects'>>;
}

export interface ProjectsPostPageProps {
  post: CollectionEntry<'projects'>;
}

export interface TagsListPageProps {
  page: Page<CollectionEntry<'blog'>>;
}
