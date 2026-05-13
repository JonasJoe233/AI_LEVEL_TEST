import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: { outDir: 'dist' },
  server: {
    fs: { deny: ['sbti-test-main'] }
  },
  optimizeDeps: {
    exclude: ['sbti-test-main']
  }
});
