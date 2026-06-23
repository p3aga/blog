import type { Heading, HeadingData, PhrasingContent, Root } from 'mdast';
import { visit } from 'unist-util-visit';
import type { VFile } from 'vfile';

function getText(node: Heading | PhrasingContent): string {
  if ('value' in node) return node.value;
  if ('alt' in node && typeof node.alt === 'string') return node.alt;
  if ('children' in node)
    return node.children
      .map((child: PhrasingContent) => getText(child))
      .join('');
  return '';
}

function generateID(text: string, usedIDs: Set<string>): string {
  const id = text
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  let counter = 1;
  let uniqueID = id;

  while (usedIDs.has(uniqueID)) {
    uniqueID = `${id}-${counter++}`;
    counter++;
  }

  usedIDs.add(uniqueID);
  return uniqueID;
}

export default function remarkToc() {
  return (tree: Root, file: VFile) => {
    const toc: Array<{ level: number; text: string; id: string }> = [];
    const usedIDs = new Set<string>();

    visit(tree, 'heading', (node) => {
      const level = node.depth;

      // only process h2,h3,h4
      if (level > 4 || level === 1) return;

      const text = getText(node);
      const id = generateID(text, usedIDs);

      if (!node.data) node.data = {};
      const data = node.data as HeadingData & { hProperties?: Record<string, unknown> };
      if (!data.hProperties) data.hProperties = {};
      data.hProperties.id = id;

      toc.push({ level, text, id });
    });

    if (!file.data.astro) file.data.astro = {};
    if (!file.data.astro.frontmatter) file.data.astro.frontmatter = {};
    file.data.astro.frontmatter.toc = toc;
  };
}
