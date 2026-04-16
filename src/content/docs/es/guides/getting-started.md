---
title: Primeros Pasos
description: Aprende cómo instalar y configurar ngx-theme-stack en tu proyecto Angular.
---

<div style="display: flex; justify-content: center; margin-bottom: 2rem;">
  <img 
    src="https://raw.githubusercontent.com/WanderleeDev/ngx-theme-stack/main/projects/ngx-theme-stack/banner.png" 
    alt="ngx-theme-stack banner" 
    style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);"
  />
</div>

Un gestor de temas potente y sencillo para **Angular**. Diseñado para rendimiento y soporte SSR.

## Instalación

Para instalar la librería y configurarla automáticamente en tu proyecto, ejecuta:

```bash
ng add ngx-theme-stack
```

### Modos de Instalación

Al ejecutar `ng add`, se te presentarán dos opciones de configuración:

1.  **Modo Rápido (Quick Mode)**:
    - Aplica la configuración por defecto al instante.
    - Tema inicial: `system`.
    - Modo de aplicación: `class` (añade la clase del tema al elemento `<html>`).
    - Temas disponibles: `['light', 'dark', 'system']`.
    - **Estrategia**: `critters` (Cero parpadeo mediante CSS inlining).

2.  **Modo Personalizado (Custom Mode)**:
    - Elige qué temas incluir (por ejemplo, si tienes un tema `blue` o `high-contrast`).
    - Configura el tema por defecto al iniciar la aplicación.
    - Cambia la clave de `localStorage` donde se guarda la elección del tema.
    - Decide cómo aplicar los temas: mediante clases (`class`), atributos (`data-theme`), o ambos.
    - **Elige tu estrategia**: `critters` para apps modernas con SSR/SSG o `blocking` para SPAs convencionales.

## ¿Qué hace `ng add` por ti?

Para ofrecer una experiencia "Zero Config", el comando de instalación automatiza lo siguiente:

- **`package.json`**: Añade un script `"prebuild"` que ejecuta la sincronización automáticamente antes de cada compilación.
- **`angular.json`**: 
    - Añade `src/themes.css` a la lista de estilos globales.
    - Configura la optimización `inlineCritical` según la estrategia seleccionada.
- **`index.html`**: Inyecta el marcador y el script de bloqueo anti-parpadeo en el `<head>`.
- **`themes.css`**: Crea un archivo base con selectores listos para que definas tus variables.

## Uso Básico

Inyecta los servicios en tus componentes usando la función `inject()` de Angular.

### Cambio Sencillo (Toggle)

La forma más fácil de añadir un interruptor de tema es usando `ThemeToggleService`.

```typescript
import { Component, inject } from '@angular/core';
import { ThemeToggleService } from 'ngx-theme-stack';

@Component({
  selector: 'app-theme-switch',
  template: `
    <button (click)="theme.toggle()">
      {{ theme.isDark() ? '🌙' : '☀️' }}
    </button>
  `,
  standalone: true
})
export class ThemeSwitchComponent {
  protected readonly theme = inject(ThemeToggleService);
}
```

### Control Avanzado

Para escenarios más complejos, utiliza `CoreThemeService` para acceder a la lista completa de temas y señales específicas.

```typescript
import { Component, inject } from '@angular/core';
import { CoreThemeService } from 'ngx-theme-stack';

@Component({
  template: `
    <select [value]="theme.selectedTheme()" (change)="onThemeChange($event)">
      @for (t of theme.availableThemes; track t) {
        <option [value]="t">{{ t }}</option>
      }
    </select>
  `
})
export class SettingsComponent {
  protected readonly theme = inject(CoreThemeService);

  onThemeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.theme.setTheme(value);
  }
}
```

## Siguientes Pasos

Ahora que tienes la librería instalada, puedes:
- [Configurar el provider inicial](/es/guides/configuration)
- [Añadir tus variables CSS](/es/guides/styling)
- [Ver la Referencia de API completa](/es/reference/api)

