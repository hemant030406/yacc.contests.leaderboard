import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        gold: '#FFD700', // Hex code for gold
        silver: '#C0C0C0', // Hex code for silver
        bronze: '#CD7F32', // Hex code for bronze
      },
    }
  },

  plugins: []
} as Config;
