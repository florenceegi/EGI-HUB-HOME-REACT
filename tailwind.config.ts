import type { Config } from 'tailwindcss';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#00ffdd',
                secondary: '#0088ff',
                danger: '#ff0044',
                gold: '#ffaa00',
                purple: '#aa00ff',
                // Dark theme palette (used by CorporatePage, WhatIsEgiPage, etc.)
                dark: '#0A1222',
                'dark-light': '#132338',
                light: '#ffffff',
                'glass-dark': 'rgba(5, 8, 12, 0.95)',
                'border-light': 'rgba(255, 255, 255, 0.1)',
                'border-active': 'rgba(0, 255, 221, 0.5)',
                'text-main': '#e0e0e0',
                'text-muted': '#8090a0',
                // Florence EGI Info Colors
                'oro-fiorentino': '#D4A574',
                'verde-rinascita': '#2D5016',
                'blu-algoritmo': '#1B365D',
                'grigio-pietra': '#6B6B6B',
                'rosso-urgenza': '#C13120',
                'arancio-energia': '#E67E22',
                'viola-innovazione': '#8E44AD',
            },
            fontFamily: {
                sans: ['Rajdhani', 'sans-serif'],
                mono: ['Share Tech Mono', 'monospace'],
                // Florence EGI Info Fonts
                'renaissance': ['Playfair Display', 'serif'],
                'body': ['Source Sans Pro', 'sans-serif'],
            },
            spacing: {
                // 8pt grid system
                ...Array.from({ length: 129 }, (_, i) => i * 8).reduce(
                    (acc, val) => ({ ...acc, [val]: `${val}px` }),
                    {}
                ),
            },
            backdropBlur: {
                xs: '2px',
            },
            keyframes: {
                'scroll-left': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'scroll-right': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
            animation: {
                'scroll-left': 'scroll-left 40s linear infinite',
                'scroll-right': 'scroll-right 40s linear infinite',
            },
        },
    },
    plugins: [],
} satisfies Config;
