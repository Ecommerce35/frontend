import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: false, // disable CSS source maps to prevent .map warnings
  },
});
