import { type CollectionEntry, getCollection } from 'astro:content';

export async function getOrderedBlogPosts() {
  const blogPosts: CollectionEntry<'blog'>[] = await getCollection('blog');
  const allPostsByDate = blogPosts.sort(
    (a, b) =>
      new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf(),
  );

  return allPostsByDate;
}
