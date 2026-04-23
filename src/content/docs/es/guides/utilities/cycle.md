---
title: Cycle
description: Cómo usar el ThemeCycleService para rotar por todos los temas disponibles.
---

El `ThemeCycleService` permite implementar un botón que avanza secuencialmente por todos los temas configurados.

## Uso

Inyecta el servicio y usa el método `cycle()` para pasar al siguiente tema.

```typescript
import { Component, inject } from "@angular/core";
import { ThemeCycleService } from "ngx-theme-stack";

@Component({
  selector: "app-theme-cycle",
  template: `
    <button (click)="theme.cycle()">
      🔄 Ciclar Tema
    </button>
  `,
})
export class ThemeCycle {
  protected readonly theme = inject(ThemeCycleService);
}
```

## Referencia de API

El `ThemeCycleService` expone varias señales útiles para construir interfaces reactivas:

### Signals

| Signal / Prop | Tipo | Descripción |
| :--- | :--- | :--- |
| `availableThemes` | `string[]` | Array con todos los temas configurados para el ciclo. |
| `selectedTheme` | `Signal<NgTheme>` | El tema elegido por el usuario (puede ser `'system'`). |
| `resolvedTheme` | `Signal<NgTheme>` | El tema real aplicado (nunca es `'system'`). |
| `cycleIndex` | `Signal<number>` | El índice del tema actual dentro del array de temas. |
| `preceding` | `Signal<NgTheme>` | El tema anterior en el ciclo. |
| `upcoming` | `Signal<NgTheme>` | El tema siguiente en el ciclo (el que se aplicará al llamar a `cycle()`). |
| `isDark` | `Signal<boolean>` | `true` si el tema resuelto es oscuro. |
| `isLight` | `Signal<boolean>` | `true` si el tema resuelto es claro. |
| `isSystem` | `Signal<boolean>` | `true` si el usuario ha elegido la preferencia del sistema. |
| `isHydrated` | `Signal<boolean>` | `true` tras la hidratación en el cliente. |

### Métodos

- `cycle()`: Avanza al tema definido en `upcoming()`.

Para más detalles, consulta la [Referencia de API de ThemeCycleService](/es/reference/api#themecycleservice).
