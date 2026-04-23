---
title: Estilos
description: Cómo definir los colores de tus temas usando variables CSS.
---

El comando `ng add` crea automáticamente un archivo `src/themes.css` en tu proyecto. Aquí es donde debes definir tus variables CSS específicas para cada tema.

La librería apunta al elemento `<html>` por defecto. Dependiendo del `mode` configurado, deberás definir tus variables como se muestra a continuación.

## Usando Clases (Por defecto)

Si elegiste `mode: 'class'`, utiliza selectores de clase:

```css
/* src/themes.css */

:root,
.light {
  --bg-color: #ffffff;
  --text-color: #333333;
}

.dark {
  --bg-color: #121212;
  --text-color: #ffffff;
}

.sunset {
  --bg-color: #ff5f6d;
  --text-color: #ffffff;
}
```

## Usando Atributos

Si elegiste `mode: 'attribute'`, utiliza selectores de atributos de datos:

```css
/* src/themes.css */

[data-theme='light'] {
  --bg-color: #ffffff;
  --text-color: #333333;
}

[data-theme='dark'] {
  --bg-color: #121212;
  --text-color: #ffffff;
}

[data-theme='sunset'] {
  --bg-color: #ff5f6d;
  --text-color: #ffffff;
}
```

## Transiciones Suaves

Para que el cambio de tema no sea brusco, se recomienda añadir una transición suave al color de fondo y al texto en tu archivo de estilos globales (ej. `styles.css`):

```css
/* src/styles.css */
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

Esto hará que el cambio de tema se sienta mucho más fluido y "premium" para el usuario.

## Mejores Prácticas

1.  **Define un Fallback**: Siempre ten un `:root` o una clase de tema por defecto definida primero.
2.  **Usa Nombres Semánticos**: En lugar de `--blue`, usa `--primary-color`.
3.  **Estilos Globales**: Recuerda que `src/themes.css` se añade al array de estilos en `angular.json`, por lo que estas variables estarán disponibles globalmente.
