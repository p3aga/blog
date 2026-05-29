// @ts-check

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import type { AstroUserConfig } from 'astro';
import { defineConfig } from 'astro/config';
import astroExpressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import remarkDirective from 'remark-directive';
import rehypeTableProcessor from './src/plugins/rehype-table-processor';
import remarkToc from './src/plugins/remark-toc';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://p3aga.is-a.dev',
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
    sitemap(),
  ],

  markdown: {
    remarkPlugins: [remarkDirective, remarkToc],
    rehypePlugins: [rehypeTableProcessor],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  devToolbar: {
    enabled: false,
  },

  adapter: cloudflare(),
}) as AstroUserConfig;