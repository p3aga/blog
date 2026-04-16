import type { Element, Parent, Root } from 'hast';
import { visit } from 'unist-util-visit';

export default function rehypeTableProcessor() {
  return (tree: Root) => {
    visit(
      tree,
      'element',
      (
        node: Element,
        index: number | undefined,
        parent: Parent | undefined,
      ) => {
        if (node.tagName !== 'table') return;

        const tableWrapper: Element = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['table-wrapper'],
          },
          children: [node],
        };

        if (parent && typeof index === 'number') {
          parent.children[index] = tableWrapper;
        }
      },
    );
  };
}
