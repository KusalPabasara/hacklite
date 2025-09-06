/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line scans all your components
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Theme-aware colors using CSS custom properties
        'theme-bg': 'var(--theme-bg)',
        'theme-surface': 'var(--theme-surface)',
        'theme-card': 'var(--theme-card)',
        'theme-text': 'var(--theme-text)',
        'theme-text-secondary': 'var(--theme-text-secondary)',
        'theme-text-muted': 'var(--theme-text-muted)',
        'theme-border': 'var(--theme-border)',
        'theme-border-light': 'var(--theme-border-light)',
        'theme-primary': 'var(--theme-primary)',
        'theme-primary-hover': 'var(--theme-primary-hover)',
        'theme-primary-light': 'var(--theme-primary-light)',
        'theme-success': 'var(--theme-success)',
        'theme-warning': 'var(--theme-warning)',
        'theme-error': 'var(--theme-error)',
        'theme-shadow': 'var(--theme-shadow)',
        'theme-shadow-lg': 'var(--theme-shadow-lg)',
      },
      transitionProperty: {
        'theme': 'var(--theme-transition)',
      },
      animation: {
        'theme-transition': 'var(--theme-transition)',
      },
    },
  },
  plugins: [],
}