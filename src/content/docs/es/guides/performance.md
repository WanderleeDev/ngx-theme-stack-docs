---
title: Estrategias de Rendimiento
description: Entiende cómo ngx-theme-stack evita el parpadeo de temas.
---

`ngx-theme-stack` ofrece dos formas de manejar la aplicación inicial del tema para evitar ese molesto parpadeo blanco.

## Estrategias Disponibles

### 1. Critters (Por defecto)
Ideal para sitios **SSR (Server-Side Rendering) o Estáticos**. Utiliza marcadores internos para engañar al builder de Angular e inyectar todas tus variables CSS de temas directamente en el `<head>` del HTML.

**Resultado:** Cero peticiones de red para las variables CSS. El tema se aplica incluso antes de que el navegador comience a descargar los archivos CSS externos.

### 2. Blocking
Ideal para **SPAs estándar**. Carga el archivo `themes.css` como un recurso de bloqueo tradicional. Esto asegura que las variables estén disponibles tan pronto como el DOM comience a renderizarse.

## Cómo Configurar

La estrategia se establece durante la instalación, pero puede actualizarse en `provideThemeStack`:

```typescript
provideThemeStack({
  strategy: 'critters' // o 'blocking'
})
```

:::warning
Si cambias la estrategia manualmente, **debes** ejecutar el comando de sincronización para actualizar el script de bloqueo inyectado en tu `index.html`.
:::

```bash
ng generate ngx-theme-stack:sync
```
