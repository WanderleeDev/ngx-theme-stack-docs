---
title: Referencia de API
description: Documentación detallada de los servicios, tokens y tipos proporcionados por ngx-theme-stack.
---

`ngx-theme-stack` ofrece una API potente y flexible diseñada en torno a Angular Signals para una reactividad máxima.

## Servicio Core

### `CoreThemeService`

El cerebro de la librería. Gestiona la persistencia del tema, la detección de preferencias del sistema y las actualizaciones del DOM.

#### Signals y Propiedades

| Signal / Prop | Tipo | Descripción |
| :--- | :--- | :--- |
| `selectedTheme` | `Signal<NgTheme>` | El tema seleccionado explícitamente por el usuario (puede ser `'system'`). |
| `resolvedTheme` | `Signal<NgTheme>` | El tema real aplicado al DOM (resuelve `'system'` a `'light'` o `'dark'`). Nunca es `'system'`. |
| `isDark` | `Signal<boolean>` | `true` si el tema resuelto es `'dark'`. `false` para temas personalizados (ej. `'sunset'`). |
| `isLight` | `Signal<boolean>` | `true` si el tema resuelto es `'light'`. `false` para temas personalizados. |
| `isSystem` | `Signal<boolean>` | `true` si el tema seleccionado es `'system'`. |
| `isHydrated` | `Signal<boolean>` | `true` tras la hidratación en el cliente. **Crucial para evitar parpadeos en SSR.** |
| `availableThemes` | `NgTheme[]` | La lista completa de temas resueltos (built-ins + personalizados, tras el merge). |

#### Métodos

- `setTheme(theme: NgTheme): void`: Cambia el tema activo y persiste la elección. Lanza un `NgxThemeStackError` si el tema no está en la lista de temas válidos.

---

## Servicios de Conveniencia

Estos servicios inyectan internamente `CoreThemeService` y exponen **todas sus señales de estado** para que no tengas que inyectar ambos servicios.

#### Señales comunes en todos los servicios:
- `selectedTheme`, `resolvedTheme`, `isDark`, `isLight`, `isSystem`, `isHydrated`.

### `ThemeToggleService`

Ideal para interruptores sencillos.

- `toggle()`: Alterna entre `'dark'` y `'light'`.

### `ThemeCycleService`

Ideal para botones que rotan por todos los temas disponibles.

- `cycle()`: Avanza al siguiente tema en el array `themes`.
- `availableThemes`: Array con los temas configurados para el ciclo.
- `cycleIndex`: `Signal<number>` - Índice del tema actual.
- `preceding`: `Signal<NgTheme>` - El tema anterior.
- `upcoming`: `Signal<NgTheme>` - El tema siguiente.

### `ThemeSelectService`

Ideal para menús desplegables.

- `select(theme: NgTheme)`: Establece el tema activo.
- `availableThemes`: Array con todos los temas configurados.

---

## Configuración

### `provideThemeStack(config?: Partial<NgConfig>)`

Inicializa la librería. Los temas personalizados pasados en `config.themes` se **fusionan** automáticamente con los temas por defecto (`['light', 'dark', 'system']`).

#### Opciones de `NgConfig`

| Opción | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `defaultTheme` | `NgTheme` | `'system'` | Tema usado en la primera visita. |
| `storageKey` | `string` | `'ngx-theme-stack'` | Clave para `localStorage`. |
| `mode` | `NgMode` | `'class'` | Cómo aplicar el tema al `<html>`: `'class'`, `'attribute'` o `'both'`. |
| `strategy` | `NgStrategy` | `'critters'` | Entrega de CSS: `'critters'` inyecta las vars en `<head>` (cero peticiones); `'blocking'` carga `themes.css` como hoja de estilos bloqueante (cacheable por HTTP). |
| `themes` | `NgTheme[]` | `['light', 'dark', 'system']` | Temas personalizados a añadir. Se **fusionan** con los built-ins — ej. `['sepia']` resuelve a `['system', 'light', 'dark', 'sepia']`. |

---

## Tipos

### `NgTheme<T>`

Unión de tipos segura. Si se usa con `as const` en la configuración, ofrece autocompletado exacto.

### `NgMode`

- `'class'`: Añade el nombre del tema como clase al `<html>`.
- `'attribute'`: Añade `data-theme="nombre"` al `<html>`.
- `'both'`: Aplica ambos.

### `NgStrategy`

- `'critters'` (por defecto): Inyecta todas las variables CSS de temas directamente en `<head>` en tiempo de build. Cero peticiones de red. Funciona con CSR, SSR y SSG.
- `'blocking'`: Carga `themes.css` como hoja de estilos bloqueante externa. Una petición de red (luego cacheada por HTTP). Necesaria para entornos con CSP estricta.

:::note
Ambas estrategias siempre inyectan el script anti-parpadeo inline en `<head>`. La estrategia solo controla **cómo se entregan las variables CSS**.
:::
