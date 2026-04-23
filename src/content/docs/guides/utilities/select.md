---
title: Select
description: How to use the ThemeSelectService to allow users to pick a specific theme.
---

The `ThemeSelectService` is ideal for dropdown menus where users can choose from all configured themes.

## Usage

Inject the service and use `availableThemes` to list the options and `select()` to change the theme.

```typescript
import { Component, inject } from "@angular/core";
import { ThemeSelectService } from "ngx-theme-stack";

@Component({
  selector: "app-theme-select",
  template: `
    <select name="select-theme" (change)="onThemeChange($event)">
      @for (t of this.theme.availableThemes; track t) {
        <option [value]="t" [selected]="this.theme.selectedTheme() === t">
          {{ t }}
        </option>
      }
    </select>
  `,
})
export class ThemeSelect {
  protected readonly theme = inject(ThemeSelectService);

  onThemeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.theme.select(value);
  }
}
```

## API Reference

The `ThemeSelectService` simplifies integration with selection components:

### Signals and Properties

| Signal / Prop | Type | Description |
| :--- | :--- | :--- |
| `availableThemes` | `string[]` | Array containing all configured themes. |
| `selectedTheme` | `Signal<NgTheme>` | The theme chosen by the user (can be `'system'`). |
| `resolvedTheme` | `Signal<NgTheme>` | The actual theme applied (never `'system'`). |
| `isDark` | `Signal<boolean>` | `true` if the resolved theme is dark. |
| `isLight` | `Signal<boolean>` | `true` if the resolved theme is light. |
| `isSystem` | `Signal<boolean>` | `true` if the user has chosen the system preference. |
| `isHydrated` | `Signal<boolean>` | `true` after client-side hydration. |

### Methods

- `select(theme: NgTheme)`: Changes the active theme to the provided value.

For more details, see the [ThemeSelectService API Reference](/reference/api#themeselectservice).
