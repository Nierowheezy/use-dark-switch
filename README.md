# ✨ useDarkSwitch ✨

`useDarkSwitch` is a powerful [React Hook](https://reactjs.org/docs/hooks-overview.html) designed to simplify implementing dark mode in your applications. It offers enhanced features such as customizable class names, sync with system preferences, and seamless state persistence using `localStorage`.

❤️ it? ⭐️ it on [GitHub](https://github.com/nierowheezy/use-dark-switch/stargazers) or [Tweet](https://twitter.com/intent/tweet?text=Check%20out%20the%20useDarkSwitch%20custom%20React%20Hook%20that%20simplifies%20adding%20a%20persistent%20dark%20mode%20setting%20to%20your%20app.&url=https%3A%2F%2Fgithub.com%2Fnierowheezy%2Fuse-dark-switch&via=__nierowheezy&hashtags=reactjs,hooks,darkmode)
about it.

![Version](https://img.shields.io/npm/v/use-dark-switch) ![Version](https://img.shields.io/npm/v/use-dark-switch.svg) ![Downloads](https://img.shields.io/npm/dt/use-dark-switch.svg) ![License](https://img.shields.io/npm/l/use-dark-switch.svg) ![NPM Weekly Downloads](https://img.shields.io/npm/dw/use-dark-switch.svg) ![Contributors](https://img.shields.io/github/contributors/nierowheezy/use-dark-switch.svg) ![Issues](https://img.shields.io/github/issues/nierowheezy/use-dark-switch.svg) ![Forks](https://img.shields.io/github/forks/nierowheezy/use-dark-switch.svg)

[GitHub Repository](https://github.com/nierowheezy/use-dark-switch) | [Report Issues](https://github.com/nierowheezy/use-dark-switch/issues)

![usedarkswitch](/files/darkmode.gif)

---

## Features

- **Customizable**: Configure class names for dark and light modes, or use a callback for advanced use cases.

- **Persistent State**: Automatically saves user preferences in `localStorage`.

- **System Preference Support**: Syncs with the user's system-wide dark mode setting.

- **Cross-tab Synchronization**: Updates the theme across multiple tabs.

- **SSR Compatibility**: Works seamlessly in server-side rendering environments.

---

## Requirements

- **React Version**: `>=18.0.0`

- **Peer Dependencies**:

- `react`

- `react-dom`

---

## Installation

Install `useDarkSwitch` via npm or yarn:

```bash

npm  install  use-dark-switch

```

or

```bash

yarn  add  use-dark-switch

```

---

## Usage

### Basic Example

```jsx
import React from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const App = () => {
  const { value, toggle, enable, disable } = useDarkSwitch();

  return (
    <div>
      <button onClick={disable}>☀ Light Mode</button>

      <button onClick={toggle}>Toggle</button>

      <button onClick={enable}>☾ Dark Mode</button>

      <p>Current mode: {value ? 'Dark' : 'Light'}</p>
    </div>
  );
};

export default App;
```

---

## API

### Hook Signature

```tsx
const { value, enable, disable, toggle } = useDarkSwitch(initialValue, config);
```

Here's the updated content formatted as tables:

---

### Parameters

| Parameter    | Type    | Default | Description                                                          |
| ------------ | ------- | ------- | -------------------------------------------------------------------- |
| initialValue | boolean | false   | Initial state for dark mode (true for dark, false for light).        |
| config       | object  | {}      | Configuration options for advanced use cases. See below for details. |

---

### Configuration Options

| Key            | Type        | Default       | Description                                                        |
| -------------- | ----------- | ------------- | ------------------------------------------------------------------ |
| classNameDark  | string      | dark-mode     | CSS class for dark mode.                                           |
| classNameLight | string      | light-mode    | CSS class for light mode.                                          |
| element        | HTMLElement | document.body | Element to which the class is applied.                             |
| onChange       | function    | undefined     | Callback triggered when the mode changes. Use for custom handling. |
| storageKey     | string      | darkMode      | Key used in localStorage to persist state.                         |
| syncWithSystem | boolean     | true          | Whether to sync with the system's dark mode preference.            |

---

### Return Value

The hook returns an object with the following properties:

| Property | Type     | Description                                      |
| -------- | -------- | ------------------------------------------------ |
| value    | boolean  | Current mode (true for dark, false for light).   |
| enable   | function | Function to enable dark mode.                    |
| disable  | function | Function to disable dark mode.                   |
| toggle   | function | Function to toggle between dark and light modes. |

---

## Example: Advanced Usage

```jsx
import React from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const CustomDarkModeApp = () => {
  const darkMode = useDarkSwitch(false, {
    classNameDark: 'my-dark-mode',

    classNameLight: 'my-light-mode',

    element: document.getElementById('root'),

    onChange: (isDark) => {
      console.log(`Dark mode is now ${isDark ? 'enabled' : 'disabled'}`);
    },

    storageKey: 'customDarkMode',

    syncWithSystem: true,
  });

  return (
    <div>
      <button onClick={darkMode.disable}>Light</button>

      <button onClick={darkMode.toggle}>Toggle</button>

      <button onClick={darkMode.enable}>Dark</button>
    </div>
  );
};

export default CustomDarkModeApp;
```

---

## More Examples

### Beginner Usage

#### 1. Basic Toggle with Icon

```jsx
import React from 'react';

import { useDarkSwitch } from 'use-dark-switch';

import { Moon, Sun } from 'lucide-react';

const BasicToggleWithIcon = () => {
  const { isDark, toggle } = useDarkSwitch();

  return (
    <button onClick={toggle} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
      {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
    </button>
  );
};
```

#### 2. Theme-Aware Text Component

```jsx
import React from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const ThemeAwareText = ({ children }) => {
  const { isDark } = useDarkSwitch();

  return <p className={`${isDark ? 'text-white' : 'text-black'}`}>{children}</p>;
};

// Usage

const App = () => (
  <div>
    <ThemeAwareText>This text adapts to the current theme!</ThemeAwareText>
  </div>
);
```

#### 3. Simple Theme Switcher with Radio Buttons

```jsx
import React from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const ThemeSwitcher = () => {
  const { isDark, setMode } = useDarkSwitch();

  return (
    <div>
      <label>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={!isDark}
          onChange={() => setMode(false)}
        />
        Light
      </label>

      <label>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={isDark}
          onChange={() => setMode(true)}
        />
        Dark
      </label>
    </div>
  );
};
```

### Intermediate Usage

#### 4. Theme Toggle with Transition

```jsx
import React from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const TransitionToggle = () => {
  const { isDark, toggle } = useDarkSwitch({
    transitionDuration: 300,
  });

  return (
    <div
      className={`p-4 transition-colors duration-300 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <button
        onClick={toggle}
        className={`px-4 py-2 rounded transition-colors duration-300 ${
          isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'
        }`}
      >
        Toggle Theme
      </button>

      <p className="mt-2">Current theme: {isDark ? 'Dark' : 'Light'}</p>
    </div>
  );
};
```

#### 5. Theme-Aware Image Component

```jsx
import React from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const ThemeAwareImage = ({ lightSrc, darkSrc, alt }) => {
  const { isDark } = useDarkSwitch();

  return <img src={isDark ? darkSrc : lightSrc} alt={alt} className="max-w-full h-auto" />;
};

// Usage

const App = () => (
  <ThemeAwareImage
    lightSrc="/images/logo-light.png"
    darkSrc="/images/logo-dark.png"
    alt="Company Logo"
  />
);
```

#### 6. Theme Persistence with Custom Storage Key

```jsx
import React from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const PersistentThemeToggle = () => {
  const { isDark, toggle } = useDarkSwitch({
    storageKey: 'my-app-theme-preference',
  });

  return (
    <div>
      <button onClick={toggle}>Switch to {isDark ? 'Light' : 'Dark'} Mode</button>

      <p>Your theme preference will be remembered even after you close the browser.</p>
    </div>
  );
};
```

### Advanced Usage

#### 7. Theme Provider with Context API

```jsx
import React, { createContext, useContext } from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const darkSwitch = useDarkSwitch({
    onChange: (isDark) => {
      // You can perform side effects here, like updating your backend or analytics

      console.log('Theme changed:', isDark ? 'dark' : 'light');
    },
  });

  return (
    <ThemeContext.Provider value={darkSwitch}>
      <div className={darkSwitch.isDark ? 'dark' : 'light'}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Usage

const ThemedButton = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className={`px-4 py-2 rounded ${
        isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
      }`}
    >
      Toggle Theme
    </button>
  );
};

const App = () => (
  <ThemeProvider>
    <ThemedButton />
  </ThemeProvider>
);
```

#### 8. Multi-Theme Selector with CSS Variables

```jsx
import React, { useState, useEffect } from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const themes = {
  light: {
    '--bg-color': '#ffffff',

    '--text-color': '#000000',

    '--primary-color': '#3498db',
  },

  dark: {
    '--bg-color': '#1a1a1a',

    '--text-color': '#ffffff',

    '--primary-color': '#3498db',
  },

  sepia: {
    '--bg-color': '#f1e7d0',

    '--text-color': '#433422',

    '--primary-color': '#d95d39',
  },
};

const MultiThemeSelector = () => {
  const { isDark, setMode } = useDarkSwitch();

  const [currentTheme, setCurrentTheme] = useState(isDark ? 'dark' : 'light');

  useEffect(() => {
    const root = document.documentElement;

    Object.entries(themes[currentTheme]).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [currentTheme]);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);

    setMode(theme === 'dark');
  };

  return (
    <div className="p-4" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <h2 className="text-2xl mb-4">Select a Theme</h2>

      <div className="flex space-x-4">
        {Object.keys(themes).map((theme) => (
          <button
            key={theme}
            onClick={() => handleThemeChange(theme)}
            className={`px-4 py-2 rounded ${
              currentTheme === theme ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>

      <p className="mt-4" style={{ color: 'var(--primary-color)' }}>
        This text uses the primary color of the selected theme.
      </p>
    </div>
  );
};
```

#### 9. Animated Theme Switch with Framer Motion

```jsx

import  React  from  'react';

import { useDarkSwitch } from  'use-dark-switch';

import { motion } from  'framer-motion';



const  AnimatedThemeSwitch = () => {

const { isDark, toggle } = useDarkSwitch();



return (

<motion.div

className={`p-8 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-white'}`}

animate={{

backgroundColor:  isDark ? '#1a202c' : '#ffffff',

}}

transition={{ duration:  0.3 }}

>

<motion.button

onClick={toggle}

className={`px-4 py-2 rounded-full ${

isDark ? 'bg-yellow-400 text-gray-900' : 'bg-indigo-600 text-white'

}`}

whileHover={{ scale:  1.05 }}

whileTap={{ scale:  0.95 }}

>

<motion.span

animate={{ rotate:  isDark ? 0 : 180 }}

transition={{ duration:  0.5 }}

>

{isDark ? '☀️' : '🌙'}

</motion.motion.span>

Toggle Theme

</motion.button>

<motion.p

className="mt-4"

animate={{

color:  isDark ? '#ffffff' : '#1a202c',

}}

transition={{ duration:  0.3 }}

>

Current theme: {isDark ? 'Dark' : 'Light'}

</motion.p>

</motion.div>

);

};

```

#### 10. Theme-Aware Chart Component (using Chart.js)

```jsx
import React, { useEffect, useRef } from 'react';

import { useDarkSwitch } from 'use-dark-switch';

import Chart from 'chart.js/auto';

const ThemeAwareChart = () => {
  const { isDark } = useDarkSwitch();

  const chartRef = useRef(null);

  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'bar',

      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],

        datasets: [
          {
            label: '# of Votes',

            data: [12, 19, 3, 5, 2, 3],

            backgroundColor: isDark
              ? [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',

                  'rgba(75, 192, 192, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                  'rgba(255, 159, 64, 0.8)',
                ]
              : [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',

                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],

            borderColor: isDark
              ? [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',

                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ]
              : [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',

                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],

            borderWidth: 1,
          },
        ],
      },

      options: {
        responsive: true,

        scales: {
          y: {
            beginAtZero: true,

            ticks: {
              color: isDark ? '#ffffff' : '#666666',
            },

            grid: {
              color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            },
          },

          x: {
            ticks: {
              color: isDark ? '#ffffff' : '#666666',
            },

            grid: {
              color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            },
          },
        },

        plugins: {
          legend: {
            labels: {
              color: isDark ? '#ffffff' : '#666666',
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isDark]);

  return (
    <div className={`p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <canvas ref={chartRef} />
    </div>
  );
};
```

### Best Practices and Tips

11. Use CSS Variables for Flexible Theming

```css
:root {
  --bg-primary: #ffffff;

  --text-primary: #000000;

  --accent-color: #3498db;
}

.dark {
  --bg-primary: #1a1a1a;

  --text-primary: #ffffff;

  --accent-color: #3498db;
}

body {
  background-color: var(--bg-primary);

  color: var(--text-primary);
}

.accent {
  color: var(--accent-color);
}
```

12. Implement a Theme Toggle Component

```jsx
import React from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const ThemeToggle = () => {
  const { isDark, toggle } = useDarkSwitch();

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-full ${
        isDark ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
      }`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? '🌞' : '🌙'}
    </button>
  );
};
```

13. Handle Initial Page Load Flash

To prevent a flash of unstyled content when the page first loads, you can add a script to your HTML that sets the initial theme based on the user's preference:

```html
<!DOCTYPE html>

<html lang="en">
  <head>
    <script>
      (function () {
        const darkMode = localStorage.getItem('dark-mode') === 'true';

        document.documentElement.classList.toggle('dark', darkMode);
      })();
    </script>

    <!-- Other head elements -->
  </head>

  <body>
    <!-- Your app content -->
  </body>
</html>
```

14. Use Media Queries for System Preference

You can use CSS media queries to detect the user's system preference for dark mode:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a1a1a;

    --text-primary: #ffffff;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #ffffff;

    --text-primary: #000000;
  }
}
```

15. Implement Smooth Transitions

To create a smooth transition between themes, add transition properties to your CSS:

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.theme-transition * {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

### Advanced Topics

#### Server-Side Rendering (SSR) Considerations

When using `useDarkSwitch` with SSR frameworks like Next.js, you need to handle the initial render carefully to avoid hydration mismatches. Here's an example of how to do this:

```jsx
import React, { useEffect, useState } from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const ThemeWrapper = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  const { isDark } = useDarkSwitch();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return <div className={isDark ? 'dark' : 'light'}>{children}</div>;
};

export default ThemeWrapper;
```

#### Performance Optimization

To optimize performance when using `useDarkSwitch`, consider the following:

1. Memoize components that don't need to re-render on theme changes:

```jsx
import React, { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  // Render expensive component
});

export default ExpensiveComponent;
```

2. Use the `useMemo` hook for computed values based on the theme:

```jsx
import React, { useMemo } from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const ThemeAwareComponent = () => {
  const { isDark } = useDarkSwitch();

  const themeStyles = useMemo(
    () => ({
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',

      color: isDark ? '#ffffff' : '#000000',
    }),
    [isDark],
  );

  return <div style={themeStyles}>{/* Component content */}</div>;
};
```

#### Accessibility Considerations

When implementing dark mode, it's crucial to maintain good accessibility practices:

1. Ensure sufficient color contrast in both light and dark modes.

2. Use semantic HTML elements and ARIA attributes where appropriate.

3. Provide a clear visual indication of the current theme and how to switch it.

Here's an example of an accessible theme toggle:

```jsx
import React from 'react';

import { useDarkSwitch } from 'use-dark-switch';

const AccessibleThemeToggle = () => {
  const { isDark, toggle } = useDarkSwitch();

  return (
    <button
      onClick={toggle}
      aria-pressed={isDark}
      className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
    >
      <span className="sr-only">Toggle dark mode</span>

      <span aria-hidden="true">{isDark ? '🌙' : '☀️'}</span>
    </button>
  );
};
```

### Troubleshooting

If you encounter issues while using `useDarkSwitch`, consider the following:

1.  **Theme not persisting**: Ensure that localStorage is available and not blocked by privacy settings.

2.  **Flickering on page load**: Implement the initial theme script as shown in the "Handle Initial Page Load Flash" section.

3.  **Theme not syncing across tabs**: The package should handle this automatically, but if issues persist, check for any conflicting localStorage manipulations in your app.

4.  **Performance issues**: Review the "Performance Optimization" section and ensure you're not causing unnecessary re-renders.

### Conclusion

---

The `useDarkSwitch` package provides a flexible and powerful solution for implementing dark mode in React applications. By following these examples, best practices, and advanced topics, you can create a robust and user-friendly theming system for your project.

Remember to always consider accessibility, performance, and user preferences when implementing dark mode. With `useDarkSwitch`, you have the tools to create an excellent theme-switching experience that enhances your application's usability and appeal.

For more information, bug reports, or feature requests, please visit our [GitHub repository](https://github.com/nierowheezy/use-dark-switch) or join our [community discussions](https://github.com/nierowheezy/use-dark-switch/discussions).
