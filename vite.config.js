import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Terminal from 'vite-plugin-terminal'
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Terminal()
  ],
})
