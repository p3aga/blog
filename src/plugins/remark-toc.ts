import { visit } from "unist-util-visit";


function getText(node) {
  return node.children
    .map((child) => child.value ?? getText(child))
    .join("");
}

function generateID(text, usedIDs) {
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
  return (tree, file) => {
    const toc: Array<{level: number, text: string, id: string}> = [];
    const usedIDs = new Set();

    visit(tree, "heading", (node) => {
      const level = node.depth;

      // only process h2,h3,h4
      if (level > 4 || level === 1) return;

      const text = getText(node);
      const id = generateID(text, usedIDs);

      if (!node.data) node.data = {}
      if (!node.data.hProperties) node.data.hProperties = {}
      node.data.hProperties.id = id

      toc.push({level, text, id});
    });

    if (!file.data.astro) file.data.astro = {}
    if (!file.data.astro.frontmatter) file.data.astro.frontmatter = {}
    file.data.astro.frontmatter.toc = toc;
  };
}