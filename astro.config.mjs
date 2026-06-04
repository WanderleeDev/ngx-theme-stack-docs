import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import starlightThemeNext from 'starlight-theme-next';

// https://astro.build/config
export default defineConfig({
  markdown: {
    gfm: true,
  },
  integrations: [
      starlight({
          title: 'Ngx-theme-stack',
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
            { icon: 'rocket', label: 'Demo', href: 'https://demo-ngx-theme-stack.wanderlee.site/' }
          ],
          sidebar: [
              {
                  label: 'Introduction',
                  translations: { es: 'Introducción' },
                  items: [
                      { label: 'Quick Start', translations: { es: 'Inicio Rápido' }, slug: 'guides/quick-start' },
                      { label: 'Getting Started', translations: { es: 'Primeros Pasos' }, slug: 'guides/getting-started' },
                      { label: 'Configuration', translations: { es: 'Configuración' }, slug: 'guides/configuration' },
                  ],
              },
              {
                  label: 'Guides',
                  translations: { es: 'Guías' },
                  items: [
                      { label: 'Styling', translations: { es: 'Estilos' }, slug: 'guides/styling' },
                      { label: 'Tailwind CSS v4', slug: 'guides/tailwind' },
                      { label: 'Performance', translations: { es: 'Rendimiento' }, slug: 'guides/performance' },
                      { label: 'Testing', translations: { es: 'Pruebas' }, slug: 'guides/testing' },
                      { label: 'AI Agent Integration', translations: { es: 'Integración con Agentes de IA' }, slug: 'guides/agent-integration' },
                  ],
              },
              {
                  label: 'Utilities',
                  translations: { es: 'Utilidades' },
                  items: [
                      { label: 'Toggle', slug: 'guides/utilities/toggle' },
                      { label: 'Select', translations: { es: 'Selección' }, slug: 'guides/utilities/select' },
                      { label: 'Cycle', translations: { es: 'Ciclo' }, slug: 'guides/utilities/cycle' },
                      { label: 'Custom', translations: { es: 'Personalizado' }, slug: 'guides/utilities/custom' },
                  ],
              },
              {
                  label: 'Reference',
                  translations: { es: 'Referencia' },
                  items: [
                      { label: 'API Reference', translations: { es: 'Referencia API' }, slug: 'reference/api' },
                      { label: 'Common Errors', translations: { es: 'Errores Comunes' }, slug: 'reference/errors' },
                  ],
              },
          ],
          plugins: [starlightThemeNext()],
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});