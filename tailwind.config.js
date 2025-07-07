/** @type {import('tailwindcss').Config} */
export default {
  // 1. Enable class-based dark mode
  darkMode: ['class', '[data-mode="dark"]'],
  
  // 2. Content sources (include all template files)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // 3. Theme extensions
  theme: {
    extend: {
      // 3.1 Color palette using CSS variables
      colors: ({ colors }) => ({
        inherit: colors.inherit,
        current: colors.current,
        transparent: colors.transparent,
        // Blue palette
        blue: {
          50: 'rgb(var(--color-blue-50) / <alpha-value>)',
          100: 'rgb(var(--color-blue-100) / <alpha-value>)',
          200: 'rgb(var(--color-blue-200) / <alpha-value>)',
          300: 'rgb(var(--color-blue-300) / <alpha-value>)',
          400: 'rgb(var(--color-blue-400) / <alpha-value>)',
          500: 'rgb(var(--color-blue-500) / <alpha-value>)',
          600: 'rgb(var(--color-blue-600) / <alpha-value>)',
          700: 'rgb(var(--color-blue-700) / <alpha-value>)',
          800: 'rgb(var(--color-blue-800) / <alpha-value>)',
          900: 'rgb(var(--color-blue-900) / <alpha-value>)',
        },
        // Dark mode-specific colors
        dark: {
          bg: 'rgb(var(--color-dark-bg) / <alpha-value>)',
          text: 'rgb(var(--color-dark-text) / <alpha-value>)',
          border: 'rgb(var(--color-dark-border) / <alpha-value>)',
        }
      }),
      
      // 3.2 Dark mode variants
      backgroundColor: ({ theme }) => ({
        ...theme('colors'),
        'dark-bg': 'var(--color-dark-bg)',
      }),
      textColor: ({ theme }) => ({
        ...theme('colors'),
        'dark-text': 'var(--color-dark-text)',
      }),
      borderColor: ({ theme }) => ({
        ...theme('colors'),
        'dark-border': 'var(--color-dark-border)',
      }),
    },
  },

  // 4. Core plugins configuration
  corePlugins: {
    // Ensure dark mode variant is enabled
    darkModeVariant: true,
    // Disable float utilities by default
    float: false,
  },

  // 5. Experimental features
  experimental: {
    // Optimize universal selector usage
    optimizeUniversalDefaults: true,
  }
}