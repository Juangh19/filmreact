/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#dc3545',
				gray: '#1e2129',
				grayTransparent: 'rgba(30, 33, 41, 0.65)',
			},
		},
	},
	plugins: [],
};
