---
title: API Reference
description: Detailed documentation of the services, tokens, and types provided by ngx-theme-stack.
---

`ngx-theme-stack` provides a powerful and flexible API designed around Angular Signals for maximum reactivity.

## Core Service

### `CoreThemeService`

The brain of the library. It handles theme persistence, system preference detection, and DOM updates.

#### Signals and Properties

| Signal / Prop | Type | Description |
| :--- | :--- | :--- |
| `selectedTheme` | `Signal<NgTheme>` | The theme explicitly selected by the user (can be `'system'`). |
| `resolvedTheme` | `Signal<NgTheme>` | The actual theme applied to the DOM (resolves `'system'` to `'light'` or `'dark'`). Never `'system'`. |
| `isDark` | `Signal<boolean>` | `true` if the resolved theme is `'dark'`. |
| `isLight` | `Signal<boolean>` | `true` if the resolved theme is `'light'`. |
| `isSystem` | `Signal<boolean>` | `true` if the selected theme is `'system'`. |
| `isHydrated` | `Signal<boolean>` | `true` after client-side hydration. **Crucial for avoiding SSR flicker.** |
| `availableThemes` | `NgTheme[]` | List of all configured themes (including custom ones). |

#### Methods

- `setTheme(theme: NgTheme): void`: Changes the active theme and persists the choice. Throws an `NgxThemeStackError` if the theme is not in the valid themes list.

---

## Convenience Services

These services internally inject `CoreThemeService` and expose **all of its state signals** so you don't have to inject both services.

#### Common signals in all services:
- `selectedTheme`, `resolvedTheme`, `isDark`, `isLight`, `isSystem`, `isHydrated`.

### `ThemeToggleService`

Ideal for simple switches.

- `toggle()`: Toggles between `'dark'` and `'light'`.

### `ThemeCycleService`

Ideal for buttons that rotate through all available themes.

- `cycle()`: Advances to the next theme in the `themes` array.
- `availableThemes`: Array of themes configured for the cycle.
- `cycleIndex`: `Signal<number>` - Index of the current theme.
- `preceding`: `Signal<NgTheme>` - The previous theme.
- `upcoming`: `Signal<NgTheme>` - The next theme.

### `ThemeSelectService`

Ideal for dropdown menus.

- `select(theme: NgTheme)`: Sets the active theme.
- `availableThemes`: Array of all configured themes.

---

## Configuration

### `provideThemeStack(config?: Partial<NgConfig>)`

Initializes the library. Custom themes passed in `config.themes` are automatically **merged** with the default themes (`['light', 'dark', 'system' ]`).

#### `NgConfig` Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `defaultTheme` | `NgTheme` | `'system'` | Theme used on first visit. |
| `storageKey` | `string` | `'ngx-theme-stack'` | Key for `localStorage`. |
| `mode` | `NgMode` | `'class'` | How to apply theme to `<html>`: `'class'`, `'attribute'` or `'both'`. |
| `strategy` | `NgStrategy` | `'critters'` | Anti-flash strategy: `'critters'` (SSR) or `'blocking'`. |
| `themes` | `NgTheme[]` | `['light', 'dark', 'system']` | Additional supported themes. They are merged with the basic ones. |

---

## Types

### `NgTheme<T>`

A type-safe union. If used with `as const` in the configuration, it provides exact autocomplete.

### `NgMode`

- `'class'`: Adds the theme name as a class to `<html>`.
- `'attribute'`: Sets `data-theme="name"` on `<html>`.
- `'both'`: Applies both.

### `NgStrategy`

- `'blocking'`: Injects a synchronous script into the `<head>`.
- `'critters'`: Optimized for CSS inlining in SSR/SSG.
