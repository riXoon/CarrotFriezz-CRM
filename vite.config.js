import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/sales_report.php': {
        target: 'http://localhost', // Your PHP backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sales_report.php/, 'sales_report.php'),
      },
    },
  },
});
