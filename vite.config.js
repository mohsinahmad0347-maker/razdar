import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  root: '.',
  publicDir: 'public',

  server: {
    port: 3000,
    open: true,
    // Pre-warm the home page entry so first load is instant in dev
    warmup: {
      clientFiles: ['./src/js/main.js', './src/css/main.css']
    }
  },

  build: {
    outDir: 'dist',
    // Raise the chunk warning threshold — our lazy pages are intentionally split
    chunkSizeWarningLimit: 600,
    // Minify with esbuild (default, fastest)
    minify: 'esbuild',
    // Generate source maps only for development builds
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split vendor / core / pages into separate cache-friendly chunks
        manualChunks(id) {
          // Core framework chunks (always needed)
          if (id.includes('/core/')) return 'core';
          if (id.includes('/components/')) return 'components';
          if (id.includes('/data/')) return 'data';
          if (id.includes('/utils/')) return 'utils';

          // Admin pages — only loaded by admins
          if (id.includes('/pages/admin/')) return 'pages-admin';

          // Seller pages
          if (id.includes('/pages/seller/')) return 'pages-seller';

          // Dashboard pages
          if (id.includes('/pages/dashboard/')) return 'pages-dashboard';

          // Remaining pages — each gets its own small chunk via dynamic import
          // (Vite handles this automatically for dynamic import() calls)
        },
        // Deterministic file names for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },

  // Pre-bundle only what's truly needed at startup
  optimizeDeps: {
    include: []
  }
});
