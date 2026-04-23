---
title: Cycle
description: How to use the ThemeCycleService to rotate through all available themes.
---

The `ThemeCycleService` allows you to implement a button that sequentially advances through all configured themes.

## Usage

Inject the service and use the `cycle()` method to move to the next theme.

```typescript
import { Component, inject } from "@angular/core";
import { ThemeCycleService } from "ngx-theme-stack";

@Component({
  selector: "app-theme-cycle",
  template: `
    <button (click)="theme.cycle()">
      🔄 Cycle Theme
    </button>
  `,
})
export class ThemeCycle {
  protected readonly theme = inject(ThemeCycleService);
}
```

## API Reference

The `ThemeCycleService` exposes several useful signals for building reactive interfaces:

### Signals

| Signal / Prop | Type | Description |
| :--- | :--- | :--- |
| `availableThemes` | `string[]` | Array containing all themes configured for the cycle. |
| `selectedTheme` | `Signal<NgTheme>` | The theme chosen by the user (can be `'system'`). |
| `resolvedTheme` | `Signal<NgTheme>` | The actual theme applied (never `'system'`). |
| `cycleIndex` | `Signal<number>` | The index of the current theme within the theme array. |
| `preceding` | `Signal<NgTheme>` | The previous theme in the cycle. |
| `upcoming` | `Signal<NgTheme>` | The next theme in the cycle (the one applied when calling `cycle()`). |
| `isDark` | `Signal<boolean>` | `true` if the resolved theme is dark. |
| `isLight` | `Signal<boolean>` | `true` if the resolved theme is light. |
| `isSystem` | `Signal<boolean>` | `true` if the user has chosen the system preference. |
| `isHydrated` | `Signal<boolean>` | `true` after client-side hydration. |

### Methods

- `cycle()`: Advances to the theme defined in `upcoming()`.

For more details, see the [ThemeCycleService API Reference](/reference/api#themecycleservice).
