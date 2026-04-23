---
title: Pruebas (Testing)
description: Cómo realizar pruebas unitarias en componentes que utilizan ngx-theme-stack.
---

`ngx-theme-stack` ya incluye pruebas exhaustivas para todas sus utilidades. Como desarrollador, tu objetivo debe ser probar **tus componentes** y cómo reaccionan a los cambios de tema, no la lógica interna de la librería.

## Mocking de Servicios

La forma más recomendada es crear un "Mock" o espía de los servicios de utilidad para controlar el estado del tema durante los tests.

```typescript
import { ThemeToggleService } from 'ngx-theme-stack';
import { signal } from '@angular/core';

describe('MiComponente', () => {
  let mockThemeService: Partial<ThemeToggleService>;

  beforeEach(() => {
    mockThemeService = {
      isDark: signal(false),
      toggle: jasmine.createSpy('toggle')
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ThemeToggleService, useValue: mockThemeService }
      ]
    });
  });

  it('debería mostrar el icono de sol cuando no es oscuro', () => {
    // ... tu test aquí
  });
});
```

## Pruebas de Integración

Si prefieres probar la integración real, puedes usar `provideThemeStack()` en tus tests, pero recuerda que el servicio intenta acceder al `localStorage` y al DOM.

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      provideThemeStack({
        storageKey: 'test-theme'
      })
    ]
  });
});
```

:::tip
Para pruebas de componentes, el **Mocking** suele ser la mejor opción para evitar efectos secundarios y parpadeos durante la ejecución de la suite de tests.
:::
