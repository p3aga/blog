import type { CollectionEntry } from 'astro:content';

export interface linkCardMetadataProps {
  title: string;
  description?: string;
  image?: string;
}

export interface PostPreviewProps {
  post: CollectionEntry<'blog'>;
}

export interface PostDateProps {
  pubDate: Date;
}

export interface HeadProps {
  title: string;
  canonicalUrl?: URL;
}

export interface TocProps {
  toc: {
    level: number;
    text: string;
    id: string;
  }[];
}
