/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#0F1F2F',
        surface: '#1E3957',
        accent: '#CAA45D',
        accentStrong: '#CC922F',
        muted: '#CDCDC3',
        teal: '#096067'
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        fa: ['Vazirmatn', 'Inter', 'sans-serif']
      },
      boxShadow: {
        premium: '0 20px 40px -24px rgba(0, 0, 0, 0.7)'
      },
      backgroundImage: {
        'gold-sheen': 'radial-gradient(circle at top right, rgba(202,164,93,0.22), transparent 35%), radial-gradient(circle at bottom left, rgba(9,96,103,0.14), transparent 30%)'
      }
    }
  },
  plugins: []
};
