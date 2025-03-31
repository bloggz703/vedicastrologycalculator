import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react-helmet-async'],
  },
  build: {
    rollupOptions: {
      external: ['react-helmet-async'],
    },
  },
});