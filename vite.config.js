import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      },
      // '/auth': {
      //   target: 'http://localhost:3001',
      //   changeOrigin: true,
      //   secure: false,
      // },
      '/socket.io': {
        target: 'ws://localhost:3001',
        ws: true
      }
    }
  }
});
