import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/MUI/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('@mui/icons-material')
            ) {
              return 'mui-icons';
            }
            if (
              id.includes('@mui/x-date-pickers')
            ) {
              return 'mui-pickers';
            }
            if (
              id.includes('@emotion/react') ||
              id.includes('@emotion/styled')
            ) {
              return 'emotion';
            }
            if (
              id.includes('@mui/material')
            ) {
              return 'mui-core';
            }
            if (
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('/react/')
            ) {
              return 'react-vendor';
            }
            if (id.includes('dayjs')) {
              return 'date';
            }
          }
          return undefined;
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
