import { defineConfig } from 'vite';

export default defineConfig({
  build: { outDir: 'dist' },
  server: {
    fs: { deny: ['sbti-test-main'] }
  },
  optimizeDeps: {
    exclude: ['sbti-test-main']
  }
});
