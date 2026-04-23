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

ngx-theme-stack proporciona diferentes utilidades para interactuar con los temas:

- [**Toggle**](/es/guides/utilities/toggle): Ideal para interruptores rápidos de tema claro/oscuro.
- [**Select**](/es/guides/utilities/select): Perfecto para menús desplegables con múltiples temas.
- [**Cycle**](/es/guides/utilities/cycle): Útil para botones que rotan secuencialmente por todos los temas.
- [**Custom**](/es/guides/utilities/custom): Para cuando necesitas un control total sobre la lógica del tema.

## Siguientes Pasos

Ahora que tienes la librería instalada, puedes:

- [Configurar el provider inicial](/es/guides/configuration)
- [Añadir tus variables CSS](/es/guides/styling)
- [Ver la Referencia de API completa](/es/reference/api)
