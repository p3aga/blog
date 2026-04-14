// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite'; 
import astroExpressiveCode from 'astro-expressive-code';

import { siteConfig } from './src/site.config';
import remarkDirective from 'remark-directive';
import rehypeTableProcessor from './src/plugins/rehype-table-processor';


// https://astro.build/config
export default defineConfig({
  site: siteConfig.Url,
  base: '/blog/',
  trailingSlash: 'ignore',
  integrations: [
    astroExpressiveCode({
      themes: ['gruvbox-dark-medium'],
      styleOverrides: {
        borderRadius: '4px',
        uiFontFamily: 'var(--font-sans), sans-serif',
        codeFontFamily: 'var(--font-mono), monospace',
        frames: {
          frameBoxShadowCssValue: "none",
        },
      }
    }),
    mdx(),
    icon(),
  ],
  markdown: {
    remarkPlugins: [
      remarkDirective,
    ],
    rehypePlugins: [
      rehypeTableProcessor,
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  },
  devToolbar: {
    enabled: false,
  },
});
