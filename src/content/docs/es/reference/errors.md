---
title: Errores
description: Guía de errores personalizados y manejo de excepciones en ngx-theme-stack.
---

Para asegurar una experiencia de desarrollo robusta, `ngx-theme-stack` proporciona una clase de error personalizada que permite distinguir los errores de la librería de otros errores de tiempo de ejecución.

## `NgxThemeStackError`

Es la clase base para todas las excepciones lanzadas por la librería. Se lanza principalmente en dos escenarios:
1.  **Configuración Inválida**: Cuando los parámetros pasados a `provideThemeStack` no son correctos.
2.  **Operaciones en Tiempo de Ejecución**: Cuando se intenta establecer un tema que no existe en la lista de temas permitidos.

### Propiedades

-   **`name`**: Siempre es `'NgxThemeStackError'`.
-   **`message`**: Un mensaje descriptivo que siempre comienza con el prefijo `[ngx-theme-stack]`.

### Manejo de Errores

Puedes usar el operador `instanceof` para capturar y manejar estos errores de forma específica:

```typescript
import { inject } from '@angular/core';
import { ThemeSelectService, NgxThemeStackError } from 'ngx-theme-stack';

// ... en tu componente
const themeSelect = inject(ThemeSelectService);

try {
  // Intentar establecer un tema no registrado
  themeSelect.select('tema-fantasma');
} catch (error) {
  if (error instanceof NgxThemeStackError) {
    console.warn('Error detectado en la configuración de temas:', error.message);
  } else {
    // Otros errores (ej. errores de red, lógica de negocio, etc.)
    throw error;
  }
}
```

:::tip[Manejo Global de Errores]
En lugar de usar `try/catch` en cada componente, puedes crear un `ErrorHandler` global en Angular para capturar todos los errores de la librería en un solo lugar centralizado.
:::

### Ejemplo: Manejador Global de Errores

```typescript
import { ErrorHandler, Injectable } from '@angular/core';
import { NgxThemeStackError } from 'ngx-theme-stack';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    // Desenvuelve el error si está envuelto por Angular
    const originalError = (error as any)?.rejection || error;

    if (originalError instanceof NgxThemeStackError) {
      // Manejar error de temas
      console.warn('[Theme Stack Error]:', originalError.message);
      return;
    }

    // Comportamiento por defecto para otros errores
    console.error('Error de Aplicación:', error);
  }
}

// En app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
```

## Errores Comunes

| Error | Causa | Solución |
| :--- | :--- | :--- |
| `Invalid theme: "X"` | Se intentó activar un tema que no está registrado en el array `themes`. | Añade el tema al array `themes` en el `provideThemeStack`. |
| `"defaultTheme" must be one of...` | El `defaultTheme` configurado no existe en la lista de temas permitidos. | Asegúrate de que el tema por defecto coincida con uno de tus temas definidos. |
| `Theme cannot be empty...` | Un nombre de tema en la configuración está vacío o solo contiene espacios. | Proporciona un nombre válido para cada tema. |

## Advertencias (Warnings)

Además de los errores que interrumpen la ejecución, la librería puede emitir advertencias en la consola si hay problemas menores que no impiden el funcionamiento básico pero afectan a la persistencia.

| Mensaje | Causa | Impacto |
| :--- | :--- | :--- |
| `Could not read theme...` | `localStorage` no está accesible (ej. modo incógnito muy restrictivo). | Se usará el `defaultTheme` cada vez que se recargue la página. |
| `Could not save theme...` | El espacio está lleno o no hay permisos para escribir en `localStorage`. | La elección del tema no se guardará para futuras visitas. |
