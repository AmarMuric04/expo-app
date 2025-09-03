/** @type {import('tailwindcss').Config} */

import nativeWindPreset from 'nativewind/preset';

export default {
  theme: {
    extend: {
      colors: {
        secondary: '#ff7d30',
        primary: '##ff3d00',
      },
    },
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [nativeWindPreset],
  plugins: [],
};
