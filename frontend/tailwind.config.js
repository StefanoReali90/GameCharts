/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: 'rgb(var(--cyber-bg) / <alpha-value>)',
          surface: 'rgb(var(--cyber-surface) / <alpha-value>)',
          panel: 'rgb(var(--cyber-panel) / <alpha-value>)',
          text: 'rgb(var(--cyber-text) / <alpha-value>)',
          muted: 'rgb(var(--cyber-muted) / <alpha-value>)',
          border: 'rgb(var(--cyber-border) / <alpha-value>)',
          cyan: 'rgb(var(--cyber-cyan) / <alpha-value>)',
          purple: 'rgb(var(--cyber-purple) / <alpha-value>)',
          green: 'rgb(var(--cyber-green) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 24px rgb(var(--cyber-cyan) / 0.2)',
        'neon-purple': '0 0 24px rgb(var(--cyber-purple) / 0.22)',
        'neon-green': '0 0 24px rgb(var(--cyber-green) / 0.18)',
        'panel-dark': '0 20px 70px rgb(0 0 0 / 0.38)',
      },
    },
  },
  plugins: [],
}
