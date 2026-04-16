---
title: Performance Strategies
description: Understand how ngx-theme-stack prevents theme flickering.
---

`ngx-theme-stack` offers two ways to handle the initial theme application to prevent that annoying white flash.

## Available Strategies

### 1. Critters (Default)
Best for **SSR/Static sites**. It uses hidden markers to trick the Angular builder into inlining all your theme CSS variables directly in the HTML `<head>`. 

**Result:** Zero network requests for CSS variables. The theme is applied even before the browser starts downloading external CSS files.

### 2. Blocking
Best for **standard SPAs**. It loads the `themes.css` file as a traditional blocking resource. This ensures the variables are available as soon as the DOM starts rendering.

## How to Configure

The strategy is set during installation, but can be updated in `provideThemeStack`:

```typescript
provideThemeStack({
  strategy: 'critters' // or 'blocking'
})
```

:::warning
If you change the strategy manually, you **must** run the sync command to update the blocking script injected into your `index.html`.
:::

```bash
ng generate ngx-theme-stack:sync
```
