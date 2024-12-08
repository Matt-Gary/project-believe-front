/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
    	extend: {
    		colors: {
    			accent: '#00b4d8',
    			'accent-variant': '#00738a'
    		},
    		gridTemplateColumns: {
    			'2-auto': 'repeat(2, minmax(auto, 1fr))'
    		},
    		fontSize: {
    			'6xl': ["3.75rem", "1.2"]
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
};