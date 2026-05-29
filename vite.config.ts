/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: (source: string, filename: string) => {
          if (/[\\/]styles[\\/]_?(tokens|mixins)\.scss$/.test(filename)) {
            return source;
          }
          if (/styles[\\/]global\.scss$/.test(filename)) {
            return source;
          }
          return `@use "@/styles/tokens" as *;\n@use "@/styles/mixins" as *;\n${source}`;
        },
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
});
