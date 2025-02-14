import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/roadmap.sh-fe-projects/15-Flash%20Cards/flashcards-app/',
  plugins: [react()],
})
