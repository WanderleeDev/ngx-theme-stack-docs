---
title: Toggle
description: How to use the ThemeToggleService to switch between light and dark themes.
---

The `ThemeToggleService` is the simplest utility for implementing a theme switch (Light/Dark) in your application.

## Usage

Inject the service and use the `toggle()` method to switch between themes.

```typescript
import { Component, inject } from "@angular/core";
import { ThemeToggleService } from "ngx-theme-stack";

@Component({
  selector: "app-theme-toggle",
  template: `
    <button (click)="theme.toggle()">
      {{ theme.isDark() ? "🌙" : "☀️" }}
    </button>
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeToggleService);
}
```

## API Reference

The `ThemeToggleService` provides everything needed to manage a switch:

### Signals

| Signal | Type | Description |
| :--- | :--- | :--- |
| `selectedTheme` | `Signal<NgTheme>` | The theme chosen by the user (can be `'system'`). |
| `resolvedTheme` | `Signal<NgTheme>` | The actual theme applied (never `'system'`). |
| `isDark` | `Signal<boolean>` | `true` if the resolved theme is dark. |
| `isLight` | `Signal<boolean>` | `true` if the resolved theme is light. |
| `isSystem` | `Signal<boolean>` | `true` if the user has chosen the system preference. |
| `isHydrated` | `Signal<boolean>` | `true` after client-side hydration. |

### Methods

- `toggle()`: Switches between `'dark'` and `'light'`.

For more details, see the [ThemeToggleService API Reference](/reference/api#themetoggleservice).
