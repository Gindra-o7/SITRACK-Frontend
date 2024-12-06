/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"], // Mengaktifkan mode gelap berdasarkan kelas
	content: [
	  "./index.html", // Memastikan Tailwind mengakses file HTML di root
	  "./src/**/*.{js,ts,jsx,tsx}", // Menyertakan seluruh file di dalam folder src
	  "node_modules/flowbite/**/*.js", // Menyertakan file dari Flowbite
	],
	theme: {
	  extend: {
		fontFamily: {
		  sans: ["Instrument sans", "sans-serif"], // Menambahkan font khusus
		},
		colors: {
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		  },
		  black: '#000000',
		  white: '#FAFAFA',
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
		  }
		},
		backgroundImage: {
		  pattern: 'url(./assets/pattern.svg)' // Menambahkan latar belakang khusus
		},
		borderRadius: {
		  lg: 'var(--radius)', // Menambahkan radius khusus
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		keyframes: {
		  marquee: {
			from: {
			  transform: 'translateX(0)'
			},
			to: {
			  transform: 'translateX(calc(-100% - var(--gap)))'
			}
		  },
		  'marquee-vertical': {
			from: {
			  transform: 'translateY(0)'
			},
			to: {
			  transform: 'translateY(calc(-100% - var(--gap)))'
			}
		  }
		},
		animation: {
		  marquee: 'marquee var(--duration) infinite linear',
		  'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
		}
	  }
	},
	plugins: [
	  require("flowbite/plugin")({
		charts: true, // Mengaktifkan chart dari Flowbite
		datatables: true, // Mengaktifkan datatables dari Flowbite
	  }),
	  require("tailwindcss-animate") // Mengaktifkan plugin animasi Tailwind
	],
	safelist: [
		'after:duration-[200ms]',
		'hover:duration-[400ms]',
	  ],
  };
  