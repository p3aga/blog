import { type CollectionEntry, getCollection } from 'astro:content';

export async function getProjectPosts() {
  let projectPosts: CollectionEntry<'projects'>[] =
    await getCollection('projects');
  if (!import.meta.env.DEV) {
    projectPosts = projectPosts.filter((post) => !post.data.draft);
  }

  return projectPosts;
}

export async function getOrderedProjectPosts() {
  const projectPosts = await getProjectPosts();
  return projectPosts.sort(
    (a, b) =>
      new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf(),
  );
}
