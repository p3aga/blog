import { type CollectionEntry, getCollection } from 'astro:content';

export async function getBlogPosts() {
  let blogPosts: CollectionEntry<'blog'>[] = await getCollection('blog');
  if (!import.meta.env.DEV) {
    blogPosts = blogPosts.filter((post) => !post.data.draft);
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

export async function getAllTags() {
  const blogPosts = await getBlogPosts();
  const tags = new Set<string>();

  blogPosts.forEach((post) => {
    post.data.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags);
}

export async function getOrderedTags() {
  const tags = await getAllTags();
  return tags.sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

export async function getPostsByTag(tag: string) {
  const blogPosts = await getOrderedBlogPosts();
  return blogPosts.filter((post) => post.data.tags.includes(tag));
}

export async function getTagsWithCountPostsByTag() {
  const tags = await getOrderedTags();
  const tagsWithCount = [];

  for (const tag of tags) {
    const postsByTag = await getPostsByTag(tag);
    tagsWithCount.push({
      name: tag,
      postCount: postsByTag.length,
    });
  }

  return tagsWithCount;
}

export async function getMoreTags(limit: number = 10) {
  const tags = await getTagsWithCountPostsByTag();
  return tags.sort((a, b) => b.postCount - a.postCount).slice(0, limit);
}
