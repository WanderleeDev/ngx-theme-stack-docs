---
title: Testing
description: How to unit test components that use ngx-theme-stack.
---

`ngx-theme-stack` already includes exhaustive tests for all its utilities. As a developer, your goal should be to test **your own components** and how they react to theme changes, rather than the internal logic of the library.

## Mocking Services

The recommended way is to create a "Mock" or spy of the utility services to control the theme state during tests.

```typescript
import { ThemeToggleService } from 'ngx-theme-stack';
import { signal } from '@angular/core';

describe('MyComponent', () => {
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

  it('should show the sun icon when not dark', () => {
    // ... your test here
  });
});
```

## Integration Testing

If you prefer testing the real integration, you can use `provideThemeStack()` in your tests, but remember that the service attempts to access `localStorage` and the DOM.

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
For component testing, **Mocking** is usually the best option to avoid side effects and flickering during test suite execution.
:::
