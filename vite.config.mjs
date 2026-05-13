import { defineConfig } from 'vite';

export default defineConfig({
  base: '/aiti-test/',
  build: { outDir: 'dist' },
  server: {
    fs: { deny: ['sbti-test-main'] }
  },
  optimizeDeps: {
    exclude: ['sbti-test-main']
  }
});
