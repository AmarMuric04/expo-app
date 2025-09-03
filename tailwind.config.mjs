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
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [nativeWindPreset],
  plugins: [],
};
