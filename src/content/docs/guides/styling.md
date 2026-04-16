---
title: Styling
description: How to define your theme colors using CSS variables.
---

The `ng add` command automatically creates a `src/themes.css` file in your project. This is where you should define your theme-specific CSS variables.

The library targets the `<html>` element by default. Depending on your configured `mode`, you should define your variables as shown below.

## Using Classes (Default)

If you chose `mode: 'class'`, use class selectors:

```css
/* src/themes.css */

:root,
.light {
  --bg-color: #ffffff;
  --text-color: #333333;
}

.dark {
  --bg-color: #121212;
  --text-color: #ffffff;
}

.sunset {
  --bg-color: #ff5f6d;
  --text-color: #ffffff;
}
```

## Using Attributes

If you chose `mode: 'attribute'`, use data attribute selectors:

```css
/* src/themes.css */

[data-theme='light'] {
  --bg-color: #ffffff;
  --text-color: #333333;
}

[data-theme='dark'] {
  --bg-color: #121212;
  --text-color: #ffffff;
}

[data-theme='sunset'] {
  --bg-color: #ff5f6d;
  --text-color: #ffffff;
}
```

## Best Practices

1.  **Define a Fallback**: Always have a `:root` or a default theme class defined first.
2.  **Use Semantic Names**: Instead of `--blue`, use `--primary-color`.
3.  **Global Styles**: Remember that `src/themes.css` is added to your `angular.json` styles array, so these variables will be available globally.
