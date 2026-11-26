import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Use the library source directly so edits in ../src hot-reload without a rebuild.
    alias: {
      'react-flip-numbers': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
    },
    // The library source sits outside this package; make sure it shares the example's React.
    dedupe: ['react', 'react-dom'],
  },
});
