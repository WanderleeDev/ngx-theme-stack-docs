---
title: Referencia de la API
description: Documentación detallada de servicios y señales (Signals).
---

`ngx-theme-stack` proporciona un conjunto de servicios reactivos basados en Angular Signals.

## CoreThemeService

El servicio fundamental que gestiona el estado del tema. Se encarga de la persistencia, detección del sistema y manipulación segura del DOM.

### Signals (Señales)

| Signal | Tipo | Descripción |
| :--- | :--- | :--- |
| `selectedTheme` | `Signal<string>` | El tema exacto elegido por el usuario (`dark`, `light`, `system`, etc.). |
| `resolvedTheme` | `Signal<string>` | El tema finalmente aplicado al DOM (resuelve `system` a `dark` o `light`). |
| `isDark` | `Signal<boolean>` | True si el tema resuelto es `dark`. |
| `isLight` | `Signal<boolean>` | True si el tema resuelto es `light`. |
| `isSystem` | `Signal<boolean>` | True si el usuario ha seleccionado la preferencia `system`. |
| `isHydrated` | `Signal<boolean>` | True después del primer renderizado en el navegador. Útil para prevenir errores de hidratación. |

### Métodos

#### `setTheme(newTheme: string)`
Valida el identificador del tema, lo aplica al DOM y lo guarda en `localStorage`.

```typescript
themeService.setTheme('dark');
```

---

## Servicios de Utilidad

Estos servicios se basan en `CoreThemeService` para proporcionar lógica de UI común.

### ThemeToggleService
Un interruptor binario sencillo entre `light` y `dark`.

- `toggle()`: Cambia el tema.
- `isDark()`: Señal de ayuda.

### ThemeSelectService
Expone la lista completa de temas y métodos para seleccionarlos.

- `themes()`: Señal con la lista de temas disponibles.
- `setTheme(theme: string)`: Selecciona un tema.

### ThemeCycleService
Una función circular para rotar a través de todos los temas disponibles.

- `cycle()`: Pasa al siguiente tema en el array `themes` configurado.
