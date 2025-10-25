/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
                serif: ['var(--font-serif)', 'Georgia', 'serif'],
            },
            colors: {
                cream: 'var(--color-cream)',
                'warm-white': 'var(--color-warm-white)',
                'soft-beige': 'var(--color-soft-beige)',
                taupe: 'var(--color-taupe)',
                charcoal: 'var(--color-charcoal)',
                'deep-charcoal': 'var(--color-deep-charcoal)',
                terracotta: 'var(--color-terracotta)',
                rust: 'var(--color-rust)',
                sage: 'var(--color-sage)',
                'deep-sage': 'var(--color-deep-sage)',
                gold: 'var(--color-gold)',
                'soft-gold': 'var(--color-soft-gold)',
            },
            spacing: {
                xs: 'var(--spacing-xs)',
                sm: 'var(--spacing-sm)',
                md: 'var(--spacing-md)',
                lg: 'var(--spacing-lg)',
                xl: 'var(--spacing-xl)',
                '2xl': 'var(--spacing-2xl)',
                '3xl': 'var(--spacing-3xl)',
                '4xl': 'var(--spacing-4xl)',
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
                xl: 'var(--radius-xl)',
                '2xl': 'var(--radius-2xl)',
                full: 'var(--radius-full)',
            },
            boxShadow: {
                sm: 'var(--shadow-sm)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
                xl: 'var(--shadow-xl)',
                '2xl': 'var(--shadow-2xl)',
            },
            transitionDuration: {
                fast: 'var(--transition-fast)',
                base: 'var(--transition-base)',
                slow: 'var(--transition-slow)',
                slowest: 'var(--transition-slowest)',
            },
        },
    },
    plugins: [],
}
