import type { Config } from 'tailwindcss'

// Tailwind is configured to read Ascoser's design tokens straight from
// CSS variables (src/styles/tokens.css) so the same source of truth
// drives both themes without duplicating values here.
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        'surface-hover': 'var(--surface-hover)',
        border: 'var(--border)',
        divider: 'var(--divider)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
      },
      fontFamily: {
        head: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        card: '24px',
        btn: '999px',
        input: '16px',
        dialog: '28px',
      },
      spacing: {
        18: '4.5rem',
      },
      transitionTimingFunction: {
        ascoser: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        DEFAULT: '250ms',
      },
      boxShadow: {
        card: '0 8px 30px rgba(0,0,0,.45)',
        glow: '0 0 40px rgba(197,30,30,.25)',
      },
    },
  },
  plugins: [],
} satisfies Config
