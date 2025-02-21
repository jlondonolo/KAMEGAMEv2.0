// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",    // Añadido index.html en la raíz
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2e04c5',
                'primary-dark': '#1e1e2f',
                secondary: '#7a04c5',
                background: '#0d0d22',
                success: '#50fa7b',
                error: '#ff5555',
            },
            fontFamily: {
                sans: ['Arial', 'sans-serif'],
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            minHeight: {
                'screen-75': '75vh',
            },
            fontSize: {
                xxs: ['0.625rem', { lineHeight: '1rem' }],
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in',
                'slide-in': 'slideIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideIn: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
}