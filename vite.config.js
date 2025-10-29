import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // server: {
  //   https: true, // Enable HTTPS
  //   host: true, // Allow connections from external devices
  // },
  css: {
    devSourcemap: false,
  },

});
