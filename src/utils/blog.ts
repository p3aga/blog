import { type CollectionEntry, getCollection } from 'astro:content';

export async function getBlogPosts() {
  let blogPosts: CollectionEntry<'blog'>[] = await getCollection('blog');
  if (!import.meta.env.DEV) {
    blogPosts = blogPosts.filter(post => !post.data.draft);
  }

  return blogPosts;
}

export async function getOrderedBlogPosts() {
  const blogPosts = await getBlogPosts();
  return blogPosts.sort(
    (a, b) =>
      new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf(),
  );
}
