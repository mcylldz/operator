/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                roasell: {
                    black: '#ffffff',
                    card: '#f8f9fb',
                    dark: '#f1f3f6',
                    gold: '#023a97',
                    goldLight: '#1a52b5',
                    goldDark: '#012870',
                    gray: '#6b7280',
                    border: '#e5e7eb'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 3s infinite',
                'shimmer': 'shimmer 2.5s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                }
            }
        }
    },
    plugins: [],
}
