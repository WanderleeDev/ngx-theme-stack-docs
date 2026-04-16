---
title: Configuración
description: Opciones detalladas de configuración para ngx-theme-stack.
---

La mejor forma de configurar la librería es durante la instalación, pero también puedes ajustar manualmente los proveedores en tu archivo `app.config.ts`.

## Configuración del Provider

Importa `provideThemeStack` y añádelo a tu array de proveedores:

```typescript
import { provideThemeStack } from 'ngx-theme-stack';

export const appConfig: ApplicationConfig = {
  providers: [
    provideThemeStack({
      themes: ['light', 'dark', 'sunset'], // Identificadores de tus temas
      defaultTheme: 'system',              // Fallback inicial ('system' resuelve vía matchMedia)
      mode: 'class',                       // 'class', 'attribute' o 'both'
      strategy: 'critters',                // 'critters' (SSR) o 'blocking' (SPA estándar)
      storageKey: 'ngx-theme-stack-theme'  // Clave de LocalStorage
    })
  ]
};
```

## Opciones de Configuración

| Opción | Tipo | Defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `themes` | `string[]` | `['light', 'dark', 'system']` | Lista de identificadores de temas soportados. |
| `defaultTheme` | `string` | `'system'` | Tema usado en la primera visita o cuando no hay preferencia guardada. |
| `mode` | `NgMode` | `'class'` | Cómo se aplica el tema: `class`, `attribute` (`data-theme`), o `both`. |
| `strategy` | `NgStrategy`| `'critters'` | Estrategia de rendimiento anti-parpadeo: `critters` (CSS inlined) o `blocking`. |
| `storageKey` | `string` | `'ngx-theme-stack-theme'` | Clave utilizada para persistir la preferencia en `localStorage`. |

:::important
Cada vez que actualices estos ajustes manualmente en `app.config.ts`, debes ejecutar el comando de sincronización para asegurar que tu `index.html` se actualice con la lógica correcta del script anti-parpadeo.
:::

## Comando de Sincronización

El comando de sincronización refresca el script inlined en tu `index.html` para que coincida con tu configuración actual.

```bash
ng generate ngx-theme-stack:sync --project NOMBRE_DE_TU_PROYECTO
```
