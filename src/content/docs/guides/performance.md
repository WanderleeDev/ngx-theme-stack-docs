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

## The Anti-Flicker Script (Blocking Script)

To achieve the "Zero Flicker" effect, the library injects a small synchronous script into the `<head>` of your `index.html`. This script runs **before** the browser paints any DOM elements.

### What does it do exactly?

The script performs the following steps in milliseconds:
1. Reads the saved preference from `localStorage`.
2. If nothing is saved, it uses the `defaultTheme`.
3. If the theme is `'system'`, it resolves the real preference using `matchMedia`.
4. Applies the theme to the `<html>` (via class or attribute) and sets the `color-scheme` property.

### The Injected Code

Here is the code (minified by the library) for your transparency:

```javascript
(function() {
  try {
    var k = "your-storage-key";
    var d = "your-default-theme";
    var m = "your-mode";
    var t = localStorage.getItem(k) || d;
    var e = document.documentElement;

    // Basic security validation
    if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)) t = d;

    // System resolution
    if (t === 'system') {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Immediate DOM application
    if (m === 'class' || m === 'both') e.classList.add(t);
    if (m === 'attribute' || m === 'both') e.setAttribute('data-theme', t);
    if (t === 'dark' || t === 'light') e.style.setProperty('color-scheme', t);
  } catch (x) {}
})();
```

## Preventing Flicker in Conditional Rendering (SSR)

It is important to understand the difference between **styles** and **content**:

1.  **CSS Styles (Automatic)**: The library applies the theme to the `<html>` before Angular loads. You don't need to do anything to prevent flickering in your background or text colors if you use CSS variables.
2.  **Conditional Content (Manual)**: If you need to show a different icon or image based on the theme (e.g., `@if (theme.isDark())`), a small hydration flicker might occur on the server.

For these **conditional content** cases, use the `isHydrated` signal:

```html
<!-- ✅ Recommended for ICONS or IMAGES -->
@if (theme.isHydrated()) {
  <img [src]="theme.isDark() ? 'dark-logo.png' : 'light-logo.png'">
} @else {
  <!-- Optional: A placeholder to avoid visual jumps -->
  <div class="logo-placeholder"></div>
}
```

The `isHydrated` signal ensures that conditional content is only shown once the library has correctly synchronized the client state with `localStorage`.
