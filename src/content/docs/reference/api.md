---
title: API Reference
description: Detailed documentation of the services, tokens, and types provided by ngx-theme-stack.
---

`ngx-theme-stack` provides a powerful and flexible API designed around Angular Signals for maximum reactivity.

## Core Service

### `CoreThemeService`

The brain of the library. It handles theme persistence, system preference detection, and DOM updates.

#### Signals

| Signal | Type | Description |
| :--- | :--- | :--- |
| `selectedTheme` | `Signal<NgTheme>` | The theme explicitly selected by the user (can be `'system'`). |
| `resolvedTheme` | `Signal<NgTheme>` | The actual theme applied to the DOM (resolves `'system'` to `'light'` or `'dark'`). |
| `isDark` | `Signal<boolean>` | True if the resolved theme is `'dark'`. |
| `isLight` | `Signal<boolean>` | True if the resolved theme is `'light'`. |
| `isSystem` | `Signal<boolean>` | True if the selected theme is `'system'`. |
| `isHydrated` | `Signal<boolean>` | True after client-side hydration. **Crucial for SSR.** |

#### Methods

- `setTheme(theme: NgTheme): void`: Changes the active theme. Throws if the theme is invalid.

---

## Convenience Services

These services wrap `CoreThemeService` to provide common interaction patterns.

### `ThemeToggleService`

Ideal for simple "Dark/Light" switches.

- `toggle()`: Toggles between `'dark'` and `'light'`. If current is `'system'`, it switches to the opposite of the current system preference.

### `ThemeCycleService`

Ideal for buttons that rotate through all available themes (e.g., System → Light → Dark → ...).

- `cycle()`: Advances to the next theme in the configured `themes` array.

---

## Configuration

### `provideThemeStack(config?: Partial<NgConfig>)`

Provider function to initialize the library in your `app.config.ts`.

#### `NgConfig` Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `defaultTheme` | `NgTheme` | `'system'` | Theme used on first visit. |
| `storageKey` | `string` | `'ngx-theme...-theme'` | Key for `localStorage`. |
| `mode` | `'class' \| 'attribute' \| 'both'` | `'class'` | How to apply theme to `<html>`. |
| `strategy` | `'blocking' \| 'critters'` | `'critters'` | Anti-flash strategy. |
| `themes` | `NgTheme[]` | `['light', 'dark', 'system']` | Supported themes. |

---

## Types

### `NgTheme<T>`

A type-safe union of themes. By default, it accepts `'light' | 'dark' | 'system'` and any string.

### `NgMode`

- `'class'`: Adds the theme name as a class to `<html>`.
- `'attribute'`: Sets `data-theme="theme-name"` on `<html>`.
- `'both'`: Applies both.

### `NgStrategy`

- `'blocking'`: Standard CSS strategy.
- `'critters'`: Optimized for SSR/SSG (inlined styles).
