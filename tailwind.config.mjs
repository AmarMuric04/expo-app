/** @type {import('tailwindcss').Config} */

import nativeWindPreset from 'nativewind/preset';

export default {
  theme: {
    extend: {
      colors: {
        murga: '#8e44ad',
      },
    },
  },
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [nativeWindPreset],
  plugins: [],
};
