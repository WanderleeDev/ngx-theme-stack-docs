---
title: Tailwind CSS v4 Integration
description: Optimize your workflow by integrating ngx-theme-stack with Tailwind CSS v4.
---

import { Aside } from '@astrojs/starlight/components';

If you are using **Tailwind CSS v4**, you can map your `themes.css` variables directly to Tailwind design tokens. This gives you clean, theme-aware utility classes that update automatically — **no `dark:` prefix needed**.

## Recommended approach

### 1. Map semantic variables

In your `src/styles.css`, expose your theme variables as Tailwind tokens:

```css
/* src/styles.css */
@import 'tailwindcss';

@theme {
  --color-main-bg: var(--bg-color);
  --color-main-text: var(--text-color);
  --color-card-bg: var(--card-bg);
}
```

### 2. Use in components

```html
<div class="bg-main-bg text-main-text shadow-xl">
  <!-- automatically reflects the active theme (dark, light, sunset, etc.) -->
</div>
```

<Aside type="tip" title="Why this works">
The anti-flash script sets the theme class/attribute on `<html>` before Angular boots, so the CSS variables are already resolved. Since Tailwind tokens (`--color-main-bg`) point directly to those variables, **this single approach covers all themes** — no extra configuration needed.
</Aside>

---

## Optional: enable the `dark:` prefix

Only needed if you want to use `dark:` utilities tied to ngx-theme-stack's toggle (e.g. `dark:bg-black`).

```css
/* src/styles.css */
@import 'tailwindcss';

/* Class mode */
@custom-variant dark (&:where(.dark, .dark *));

/* Attribute mode */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

<Aside type="caution" title="Important limitation">
Overriding `@custom-variant dark` disconnects `dark:` from the OS preference and only covers the built-in `dark` theme. For multi-theme support (e.g. `sunset`, `ocean`), the semantic variable approach above is the correct solution.
</Aside>
