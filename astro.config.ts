// @ts-check

import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import type { AstroUserConfig } from 'astro';
import { defineConfig } from 'astro/config';
import astroExpressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import remarkDirective from 'remark-directive';

import rehypeTableProcessor from './src/plugins/rehype-table-processor';
import remarkToc from './src/plugins/remark-toc';

// https://astro.build/config
export default defineConfig({
  site: 'https://p3aga.dev.br',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [
    astroExpressiveCode({
      themes: ['gruvbox-dark-medium'],
      styleOverrides: {
        borderRadius: '4px',
        uiFontFamily: 'var(--font-sans), sans-serif',
        codeFontFamily: 'var(--font-mono), monospace',
        frames: {
          frameBoxShadowCssValue: 'none',
        },
      },
    }),
    icon(),
    sitemap({
      filter: (page) => {
        return !page.includes('/page/') && !page.includes('/tags/')
      }
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkDirective, remarkToc],
      rehypePlugins: [rehypeTableProcessor],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
}) as AstroUserConfig;
