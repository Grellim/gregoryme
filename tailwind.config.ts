import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			// Professional brand colors
  			brand: {
  				primary: {
  					50: 'hsl(280 100% 98%)',
  					100: 'hsl(280 100% 95%)',
  					200: 'hsl(280 100% 90%)',
  					300: 'hsl(280 100% 80%)',
  					400: 'hsl(280 100% 70%)',
  					500: 'hsl(280 100% 60%)',
  					600: 'hsl(280 100% 50%)',
  					700: 'hsl(280 100% 40%)',
  					800: 'hsl(280 100% 30%)',
  					900: 'hsl(280 100% 20%)',
  					950: 'hsl(280 100% 10%)'
  				},
  				secondary: {
  					50: 'hsl(320 100% 98%)',
  					100: 'hsl(320 100% 95%)',
  					200: 'hsl(320 100% 90%)',
  					300: 'hsl(320 100% 80%)',
  					400: 'hsl(320 100% 70%)',
  					500: 'hsl(320 100% 60%)',
  					600: 'hsl(320 100% 50%)',
  					700: 'hsl(320 100% 40%)',
  					800: 'hsl(320 100% 30%)',
  					900: 'hsl(320 100% 20%)',
  					950: 'hsl(320 100% 10%)'
  				},
  				accent: {
  					50: 'hsl(200 100% 98%)',
  					100: 'hsl(200 100% 95%)',
  					200: 'hsl(200 100% 90%)',
  					300: 'hsl(200 100% 80%)',
  					400: 'hsl(200 100% 70%)',
  					500: 'hsl(200 100% 60%)',
  					600: 'hsl(200 100% 50%)',
  					700: 'hsl(200 100% 40%)',
  					800: 'hsl(200 100% 30%)',
  					900: 'hsl(200 100% 20%)',
  					950: 'hsl(200 100% 10%)'
  				}
  			}
  		},
  		spacing: {
  			// Custom spacing scale
  			'0-5': '0.125rem',
  			1: '0.25rem',
  			'1-5': '0.375rem',
  			2: '0.5rem',
  			'2-5': '0.625rem',
  			3: '0.75rem',
  			'3-5': '0.875rem',
  			4: '1rem',
  			5: '1.25rem',
  			6: '1.5rem',
  			7: '1.75rem',
  			8: '2rem',
  			9: '2.25rem',
  			10: '2.5rem',
  			11: '2.75rem',
  			12: '3rem',
  			// Section spacing
  			section: '5rem',
  			'section-sm': '3rem',
  			'section-lg': '7rem'
  		},
  		gridTemplateColumns: {
  			'masonry': 'repeat(auto-fill, minmax(280px, 1fr))',
  			'dense': 'repeat(auto-fit, minmax(250px, 1fr))',
  			'portfolio': 'repeat(auto-fit, minmax(320px, 1fr))',
  			'cards': 'repeat(auto-fit, minmax(280px, 1fr))'
  		},
  		gridColumn: {
  			'span-6': 'span 6 / span 6',
  			'span-7': 'span 7 / span 7',
  			'span-8': 'span 8 / span 8'
  		},
  		gridRow: {
  			'span-6': 'span 6 / span 6',
  			'span-7': 'span 7 / span 7'
  		},
  		borderRadius: {
  			'lg': 'var(--radius)',
  			'md': 'calc(var(--radius) - 2px)',
  			'sm': 'calc(var(--radius) - 4px)',
  			'xl': 'calc(var(--radius) + 4px)',
  			'2xl': 'calc(var(--radius) + 8px)',
  			'pill': '9999px',
  			'section': '1.5rem'
  		},
  		boxShadow: {
  			'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  			'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  			'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  			'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  			'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  			'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.07)',
  			'inner': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  			'glass': '0 8px 32px rgba(0, 0, 0, 0.1)'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.6s ease-out',
  			'slide-in-left': 'slideInLeft 0.6s ease-out',
  			'slide-in-right': 'slideInRight 0.6s ease-out',
  			'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
  			'carousel-slide': 'carouselSlide 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  			'loading': 'loading 1.5s infinite',
  			'bounce-slow': 'bounce 2s infinite',
  			'float': 'float 3s ease-in-out infinite',
  			'spin-slow': 'spin 3s linear infinite'
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-10px)' }
  			},
  			pulseGlow: {
  				'0%, 100%': {
  					boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
  				},
  				'50%': {
  					boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)'
  				}
  			}
  		},
  		fontFamily: {
  			sans: ['var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'],
  			mono: ['var(--font-geist-mono), "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", monospace'],
  			inter: ['Inter', 'system-ui', 'sans-serif'],
  			poppins: ['Poppins', 'sans-serif']
  		},
  		fontSize: {
  			// Responsive text scaling
  			'xs': ['clamp(0.75rem, 2vw, 0.875rem)', { lineHeight: '1.25' }],
  			'sm': ['clamp(0.875rem, 2.5vw, 1rem)', { lineHeight: '1.375' }],
  			'base': ['clamp(1rem, 3vw, 1.125rem)', { lineHeight: '1.5' }],
  			'lg': ['clamp(1.125rem, 3.5vw, 1.25rem)', { lineHeight: '1.625' }],
  			'xl': ['clamp(1.25rem, 4vw, 1.5rem)', { lineHeight: '1.75' }],
  			'2xl': ['clamp(1.5rem, 5vw, 2rem)', { lineHeight: '2' }],
  			'3xl': ['clamp(2rem, 6vw, 3rem)', { lineHeight: '2.25' }],
  			'4xl': ['clamp(2.5rem, 7vw, 4rem)', { lineHeight: '2.5' }],
  			'5xl': ['clamp(3rem, 8vw, 5rem)', { lineHeight: '1' }],
  			'6xl': ['clamp(3.75rem, 9vw, 6rem)', { lineHeight: '1' }],
  			'7xl': ['clamp(4.5rem, 10vw, 7rem)', { lineHeight: '1' }]
  		},
  		lineHeight: {
  			loose: '1.75',
  			relaxed: '1.625',
  			normal: '1.5',
  			tight: '1.25',
  			snug: '1.375'
  		},
  		maxWidth: {
  			'8xl': '88rem',
  			'9xl': '96rem',
  			'prose': '65ch'
  		},
  		screens: {
  			'tablet': '640px',
  			'laptop': '1024px',
  			'desktop': '1280px',
  			'2xl': '1536px'
  		},
  		transitionProperty: {
  			'transform': 'transform',
  			'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
  			'height': 'height, max-height',
  			'opacity': 'opacity',
  			'shadow': 'box-shadow'
  		},
  		transitionDuration: {
  			'200': '200ms',
  			'300': '300ms',
  			'500': '500ms',
  			'700': '700ms',
  			'1000': '1000ms'
  		},
  		transitionTimingFunction: {
  			'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
  			'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
  			'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
};
export default config;
