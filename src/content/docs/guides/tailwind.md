---
title: Tailwind CSS v4 Integration
description: Optimize your workflow by integrating ngx-theme-stack with Tailwind CSS v4.
---

If you are using **Tailwind CSS v4**, you can achieve a much cleaner HTML by mapping your `themes.css` variables to your Tailwind theme. This avoids cluttering your components with `dark:` variants.

## 1. Configure Custom Variants

In your main `styles.css`, define how Tailwind should detect your themes:

```css
/* src/styles.css */
@import 'tailwindcss';

/* If using Class mode */
@custom-variant dark (&:where(.dark, .dark *));

/* If using Attribute mode */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

## 2. Map Semantic Variables

Extend your Tailwind theme using the variables defined in `themes.css`:

```css
@theme {
  --color-main-bg: var(--bg-color);
  --color-main-text: var(--text-color);
  --color-card-bg: var(--card-bg);
}
```

## 3. Usage in Components

Now, instead of writing `<div class="bg-white dark:bg-black">`, you simply write:

```html
<div class="bg-main-bg text-main-text shadow-xl">
  <!-- This automatically changes colors based on the active theme -->
</div>
```

This approach keeps your UI code clean, semantic, and fully synchronized with `ngx-theme-stack`.
