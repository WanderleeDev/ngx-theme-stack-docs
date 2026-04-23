---
title: Configuration
description: Detailed configuration options for ngx-theme-stack.
---

The best way to configure the library is during installation, but you can also manually adjust the providers in your `app.config.ts`.

## Provider Configuration

Import `provideThemeStack` and add it to your providers array:

```typescript
import { provideThemeStack } from 'ngx-theme-stack';

export const appConfig: ApplicationConfig = {
  providers: [
    provideThemeStack({
      themes: ['light', 'dark', 'sunset'], // Your theme identifiers
      defaultTheme: 'system',              // Initial fallback ('system' resolves via matchMedia)
      mode: 'class',                       // 'class', 'attribute' or 'both'
      strategy: 'critters',                // 'critters' (SSR) or 'blocking' (Standard SPA)
      storageKey: 'ngx-theme-stack-theme'  // LocalStorage key
    })
  ]
};
```

## Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `themes` | `string[]` | `['light', 'dark', 'system']` | List of additional theme identifiers. They are **merged** with the basic ones. |
| `defaultTheme` | `string` | `'system'` | Theme used on first visit or when no preference is saved. |
| `mode` | `NgMode` | `'class'` | How the theme is applied: `class`, `attribute` (`data-theme`), or `both`. |
| `strategy` | `NgStrategy`| `'critters'` | Anti-flash performance strategy: `critters` (inlined CSS) or `blocking`. |
| `storageKey` | `string` | `'ngx-theme-stack-theme'` | Key used to persist theme preference in `localStorage`. |

:::important
Whenever you update these settings manually in `app.config.ts`, you should run the sync command to ensure your `index.html` is updated with the correct anti-flash script logic.
:::

## Type-Safe Themes

If you want full type-safety for your themes in your services, you should mark the `themes` array `as const`. This allows the library to infer the exact theme names in your signals.

```typescript
provideThemeStack({
  themes: ['sepia', 'ocean', 'forest'] as const,
  defaultTheme: 'sepia'
})
```

With this configuration, any service you inject will know exactly which themes are available.

## Sync Command

The sync command refreshes the inline script in your `index.html` to match your current configuration.

```bash
ng generate ngx-theme-stack:sync --project YOUR_PROJECT_NAME
```

