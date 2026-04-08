import { visit } from "unist-util-visit";


export default function rehypeTableProcessor() {
  return (tree: any) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table') return;

      const tableWrapper = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['table-wrapper']
        },
        children: [
          node
        ]
      }

      if (parent && typeof index === 'number') {
        parent.children[index] = tableWrapper;
      }
    })
  }
}
