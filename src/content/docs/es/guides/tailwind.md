---
title: Integración con Tailwind CSS v4
description: Optimiza tu flujo de trabajo integrando ngx-theme-stack con Tailwind CSS v4.
---

Si estás utilizando **Tailwind CSS v4**, puedes lograr un HTML mucho más limpio mapeando las variables de tu `themes.css` a tu tema de Tailwind. Esto evita llenar tus componentes con variantes `dark:`.

## 1. Configura Variantes Personalizadas

En tu archivo principal `styles.css`, define cómo Tailwind debe detectar tus temas:

```css
/* src/styles.css */
@import 'tailwindcss';

/* Si usas el modo Class */
@custom-variant dark (&:where(.dark, .dark *));

/* Si usas el modo Attribute */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

## 2. Mapea Variables Semánticas

Extiende tu tema de Tailwind usando las variables definidas en `themes.css`:

```css
@theme {
  --color-main-bg: var(--bg-color);
  --color-main-text: var(--text-color);
  --color-card-bg: var(--card-bg);
}
```

## 3. Uso en Componentes

Ahora, en lugar de escribir `<div class="bg-white dark:bg-black">`, simplemente escribes:

```html
<div class="bg-main-bg text-main-text shadow-xl">
  <!-- Esto cambia de color automáticamente según el tema activo -->
</div>
```

Este enfoque mantiene el código de tu UI limpio, semántico y totalmente sincronizado con `ngx-theme-stack`.
