---
title: Errors
description: Guide to custom errors and exception handling in ngx-theme-stack.
---

To ensure a robust development experience, `ngx-theme-stack` provides a custom error class that allows you to distinguish library-specific errors from other runtime exceptions.

## `NgxThemeStackError`

This is the base class for all exceptions thrown by the library. It is primarily thrown in two scenarios:
1.  **Invalid Configuration**: When the parameters passed to `provideThemeStack` are incorrect.
2.  **Runtime Operations**: When trying to set a theme that does not exist in the allowed themes list.

### Properties

-   **`name`**: Always `'NgxThemeStackError'`.
-   **`message`**: A descriptive message that always starts with the `[ngx-theme-stack]` prefix.

### Error Handling

You can use the `instanceof` operator to catch and handle these errors specifically:

```typescript
import { inject } from '@angular/core';
import { ThemeSelectService, NgxThemeStackError } from 'ngx-theme-stack';

// ... in your component
const themeSelect = inject(ThemeSelectService);

try {
  // Attempt to set an unregistered theme
  themeSelect.select('ghost-theme');
} catch (error) {
  if (error instanceof NgxThemeStackError) {
    console.warn('Detected Theme Stack config error:', error.message);
  } else {
    // Other errors (e.g., network, business logic, etc.)
    throw error;
  }
}
```

:::tip[Global Error Handling]
Instead of using `try/catch` in every component, you can create a global `ErrorHandler` in Angular to capture all library-specific errors in a single centralized location.
:::

### Example: Global Error Handler

```typescript
import { ErrorHandler, Injectable } from '@angular/core';
import { NgxThemeStackError } from 'ngx-theme-stack';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    // Unwraps the error if it's wrapped by Angular (common in some versions)
    const originalError = (error as any)?.rejection || error;

    if (originalError instanceof NgxThemeStackError) {
      // Handle Theme Stack errors
      console.warn('[Theme Stack Error]:', originalError.message);
      return;
    }

    // Fallback for standard errors
    console.error('Application Error:', error);
  }
}

// In app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
```

## Common Errors

| Error | Cause | Solution |
| :--- | :--- | :--- |
| `Invalid theme: "X"` | Tried to activate a theme that is not registered in the `themes` array. | Add the theme to the `themes` array in `provideThemeStack`. |
| `"defaultTheme" must be one of...` | The `defaultTheme` provided in the config is not present in the themes list. | Ensure `defaultTheme` matches one of your defined themes. |
| `Theme cannot be empty...` | A theme name in the configuration is an empty string or whitespace. | Provide a valid string for every theme name. |

## Warnings

In addition to errors that interrupt execution, the library may emit warnings in the console for non-critical issues, typically related to environment restrictions.

| Message | Cause | Impact |
| :--- | :--- | :--- |
| `Could not read theme...` | `localStorage` is not accessible (e.g., restrictive incognito mode). | The `defaultTheme` will be used every time the page reloads. |
| `Could not save theme...` | Quota exceeded or lack of write permissions in `localStorage`. | The user's theme choice will not persist for future visits. |
