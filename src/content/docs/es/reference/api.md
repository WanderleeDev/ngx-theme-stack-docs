---
title: Referencia de API
description: Documentación detallada de los servicios, tokens y tipos proporcionados por ngx-theme-stack.
---

`ngx-theme-stack` ofrece una API potente y flexible diseñada en torno a Angular Signals para una reactividad máxima.

## Servicio Core

### `CoreThemeService`

El cerebro de la librería. Gestiona la persistencia del tema, la detección de preferencias del sistema y las actualizaciones del DOM.

#### Signals

| Signal | Tipo | Descripción |
| :--- | :--- | :--- |
| `selectedTheme` | `Signal<NgTheme>` | El tema seleccionado explícitamente por el usuario (puede ser `'system'`). |
| `resolvedTheme` | `Signal<NgTheme>` | El tema real aplicado al DOM (resuelve `'system'` a `'light'` o `'dark'`). |
| `isDark` | `Signal<boolean>` | True si el tema resuelto es `'dark'`. |
| `isLight` | `Signal<boolean>` | True si el tema resuelto es `'light'`. |
| `isSystem` | `Signal<boolean>` | True si el tema seleccionado es `'system'`. |
| `isHydrated` | `Signal<boolean>` | True tras la hidratación en el cliente. **Crucial para SSR.** |

#### Métodos

- `setTheme(theme: NgTheme): void`: Cambia el tema activo. Lanza un error si el tema no es válido.

---

## Servicios de Conveniencia

Estos servicios envuelven a `CoreThemeService` para proporcionar patrones de interacción comunes.

### `ThemeToggleService`

Ideal para interruptores sencillos "Oscuro/Claro".

- `toggle()`: Alterna entre `'dark'` y `'light'`. Si el actual es `'system'`, cambia al opuesto de la preferencia actual del sistema.

### `ThemeCycleService`

Ideal para botones que rotan por todos los temas disponibles (ej., System → Light → Dark → ...).

- `cycle()`: Avanza al siguiente tema en el array `themes` configurado.

---

## Configuración

### `provideThemeStack(config?: Partial<NgConfig>)`

Función proveedora para inicializar la librería en tu `app.config.ts`.

#### Opciones de `NgConfig`

| Opción | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `defaultTheme` | `NgTheme` | `'system'` | Tema usado en la primera visita. |
| `storageKey` | `string` | `'ngx-theme...-theme'` | Clave para `localStorage`. |
| `mode` | `'class' \| 'attribute' \| 'both'` | `'class'` | Cómo aplicar el tema al `<html>`. |
| `strategy` | `'blocking' \| 'critters'` | `'critters'` | Estrategia anti-parpadeo. |
| `themes` | `NgTheme[]` | `['light', 'dark', 'system']` | Temas soportados. |

---

## Tipos

### `NgTheme<T>`

Unión de tipos segura para los temas. Por defecto acepta `'light' | 'dark' | 'system'` y cualquier string.

### `NgMode`

- `'class'`: Añade el nombre del tema como una clase al `<html>`.
- `'attribute'`: Establece `data-theme="nombre-tema"` en el `<html>`.
- `'both'`: Aplica ambos.

### `NgStrategy`

- `'blocking'`: Estrategia de CSS estándar.
- `'critters'`: Optimizado para SSR/SSG (estilos en línea).
