---
title: Getting Started
description: Learn how to install and set up ngx-theme-stack in your Angular project.
---

<div style="display: flex; justify-content: center; margin-bottom: 2rem;">
  <img 
    src="https://raw.githubusercontent.com/WanderleeDev/ngx-theme-stack/main/projects/ngx-theme-stack/banner.png" 
    alt="ngx-theme-stack banner" 
    style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);"
  />
</div>

A simple and powerful headless theme manager for **Angular**. Built for performance and SSR support.

## Installation

To install the library and configure it automatically in your project, run:

```bash
ng add ngx-theme-stack
```

### Installation Modes

When running `ng add`, you will be presented with two configuration options:

1.  **Quick Mode**:
    - Applies default configuration instantly.
    - Initial theme: `system`.
    - Apply mode: `class` (adds the theme class to the `<html>` element).
    - Available themes: `['light', 'dark', 'system']`.
    - **Strategy**: `critters` (Zero-flash via CSS inlining).

2.  **Custom Mode**:
    - Choose which themes to include (e.g., if you have a `blue` or `high-contrast` theme).
    - Configure the default theme upon app startup.
    - Change the `localStorage` key where the theme choice is saved.
    - Decide how to apply themes: via classes (`class`), attributes (`data-theme`), or both.
    - **Pick your strategy**: `critters` for modern SSR/SSG apps or `blocking` for standard SPA.

## What does `ng add` do?

To provide a "Zero Config" experience, the installation command automates the following:

- **`package.json`**: Adds a `"prebuild"` script that executes the synchronization automatically before every build.
- **`angular.json`**: 
    - Adds `src/themes.css` to the global styles list.
    - Configures the `inlineCritical` optimization based on your selected strategy.
- **`index.html`**: Inyecta el marcador y el script de bloqueo anti-parpadeo en el `<head>`.
- **`themes.css`**: Crea un archivo base con selectores listos para que definas tus variables.

## Next Steps

Now that you have the library installed, you can:
- [Configure the initial provider](/guides/configuration)
- [Add your CSS variables](/guides/styling)
- [Use the services in your components](/reference/api)
