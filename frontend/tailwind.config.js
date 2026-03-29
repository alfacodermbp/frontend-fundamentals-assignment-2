/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Dark background palette
        bg: {
          primary:   '#07070f',
          secondary: '#0e0e1a',
          card:      '#13131f',
          elevated:  '#1a1a2e',
        },
        // Brand gradient anchors
        brand: {
          purple: '#7c3aed',
          blue:   '#3b82f6',
          violet: '#a855f7',
        },
        // Borders & dividers
        border: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          hover:   'rgba(255,255,255,0.16)',
        },
        // Text hierarchy
        text: {
          primary:   'rgba(255,255,255,0.95)',
          secondary: 'rgba(255,255,255,0.60)',
          muted:     'rgba(255,255,255,0.35)',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
        'card-gradient':  'linear-gradient(145deg, rgba(124,58,237,0.08) 0%, rgba(59,130,246,0.04) 100%)',
        'shimmer':        'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.4' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        fadeUp:  'fadeUp 0.4s ease forwards',
        pulse:   'pulse 1.5s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '4px',
      },
      boxShadow: {
        card:         '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(124,58,237,0.25)',
        glow:         '0 0 20px rgba(124,58,237,0.4)',
      },
    },
  },
  plugins: [],
};
