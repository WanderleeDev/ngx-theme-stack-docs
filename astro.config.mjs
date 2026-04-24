import starlight from '@astrojs/starlight';
import starlightCatppuccin from '@catppuccin/starlight';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          title: 'ngx-theme-stack',
          components: {
            Banner: './src/components/GlobalBanner.astro',
          },
          customCss: ['./src/styles/global.css'],
          defaultLocale: 'root',
          locales: {
              root: { label: 'English', lang: 'en' },
              es: {
                  label: 'Español',
                  lang: 'es',
              },
          },
          logo: {
            src: './src/assets/logo.webp',
          },
          social: [
            { icon: 'github', label: 'GitHub', href: 'https://github.com/WanderleeDev/ngx-theme-stack' },
            { icon: 'external', label: 'Demo', href: 'https://demo-ngx-theme-stack.wanderlee.site/' }
          ],
          sidebar: [
              {
                  label: 'Introduction',
                  items: [
                      { label: 'Getting Started', slug: 'guides/getting-started' },
                      { label: 'Configuration', slug: 'guides/configuration' },
                  ],
              },
              {
                  label: 'Guides',
                  items: [
                      { label: 'Styling', slug: 'guides/styling' },
                      { label: 'Tailwind CSS v4', slug: 'guides/tailwind' },
                      { label: 'Performance', slug: 'guides/performance' },
                      { label: 'Testing', slug: 'guides/testing' },
                  ],
              },
              {
                  label: 'Utilities',
                  items: [
                      { label: 'Toggle', slug: 'guides/utilities/toggle' },
                      { label: 'Select', slug: 'guides/utilities/select' },
                      { label: 'Cycle', slug: 'guides/utilities/cycle' },
                      { label: 'Custom', slug: 'guides/utilities/custom' },
                  ],
              },
              {
                  label: 'Reference',
                  autogenerate: { directory: 'reference' },
              },
          ],
          plugins: [
            starlightCatppuccin({
              dark: { flavor: 'macchiato', accent: 'sky' },
              light: { flavor: 'latte', accent: 'sky' },
            }),
          ],
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});