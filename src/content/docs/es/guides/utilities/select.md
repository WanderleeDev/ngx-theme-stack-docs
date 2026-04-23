---
title: Select
description: Cómo usar el ThemeSelectService para permitir al usuario elegir un tema específico.
---

El `ThemeSelectService` es ideal para menús desplegables (dropdowns) donde el usuario puede elegir entre todos los temas configurados.

## Uso

Inyecta el servicio y utiliza `availableThemes` para listar las opciones y `select()` para cambiar el tema.

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

## Referencia de API

El `ThemeSelectService` facilita la integración con componentes de selección:

### Signals y Propiedades

| Signal / Prop | Tipo | Descripción |
| :--- | :--- | :--- |
| `availableThemes` | `string[]` | Array con todos los temas configurados. |
| `selectedTheme` | `Signal<NgTheme>` | El tema elegido por el usuario (puede ser `'system'`). |
| `resolvedTheme` | `Signal<NgTheme>` | El tema real aplicado (nunca es `'system'`). |
| `isDark` | `Signal<boolean>` | `true` si el tema resuelto es oscuro. |
| `isLight` | `Signal<boolean>` | `true` si el tema resuelto es claro. |
| `isSystem` | `Signal<boolean>` | `true` si el usuario ha elegido la preferencia del sistema. |
| `isHydrated` | `Signal<boolean>` | `true` tras la hidratación en el cliente. |

### Métodos

- `select(theme: NgTheme)`: Cambia el tema activo al valor proporcionado.

Para más detalles, consulta la [Referencia de API de ThemeSelectService](/es/reference/api#themeselectservice).
