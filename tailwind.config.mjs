/** @type {import('tailwindcss').Config} */

import nativeWindPreset from 'nativewind/preset';

export default {
  theme: {
    extend: {
      colors: {
        secondary: '#4A90E2',
        primary: '#4E944F',
      },
    },
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [nativeWindPreset],
  plugins: [],
};
