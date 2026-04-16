---
title: API Reference
description: Detailed documentation of services and signals.
---

`ngx-theme-stack` provides a set of reactive services powered by Angular Signals.

## CoreThemeService

The foundational service managing the theme state. It manages state, persistence, system detection, and safe DOM manipulation.

### Signals

| Signal | Type | Description |
| :--- | :--- | :--- |
| `selectedTheme` | `Signal<string>` | The exact theme chosen by the user (`dark`, `light`, `system`, etc.). |
| `resolvedTheme` | `Signal<string>` | The theme finally applied to the DOM (resolves `system` to `dark` or `light`). |
| `isDark` | `Signal<boolean>` | True if the resolved theme is `dark`. |
| `isLight` | `Signal<boolean>` | True if the resolved theme is `light`. |
| `isSystem` | `Signal<boolean>` | True if the user has selected the `system` preference. |
| `isHydrated` | `Signal<boolean>` | True after the first browser render. Useful to prevent hydration mismatches. |

### Methods

#### `setTheme(newTheme: string)`
Validates the theme identifier, applies it to the DOM, and saves it to `localStorage`.

```typescript
themeService.setTheme('dark');
```

---

## Utility Services

These services build upon `CoreThemeService` to provide common UI logic.

### ThemeToggleService
A simple binary switch between `light` and `dark`.

- `toggle()`: Switches the theme.
- `isDark()`: Helper signal.

### ThemeSelectService
Exposes the full list of themes and methods to select them.

- `themes()`: Signal with the list of available themes.
- `setTheme(theme: string)`: Selects a theme.

### ThemeCycleService
A circular function to cycle through all available themes.

- `cycle()`: Moves to the next theme in the configured `themes` array.
