import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";


export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  appType: 'spa',
  plugins: [
    react(),
    {
      name: 'apps-static-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith('/apps/')) return next();

          let filePath = path.join(__dirname, 'public', req.url);

          if (filePath.endsWith('/')) {
            filePath = path.join(filePath, 'index.html');
          }

          if (!fs.existsSync(filePath)) return next();

          const ext = path.extname(filePath);
          const mimeTypes: Record<string, string> = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.svg': 'image/svg+xml',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
          };

          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
          fs.createReadStream(filePath).pipe(res);
        });
      },
    },
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,

  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          motion: ['framer-motion'],
          i18n: ['i18next', 'react-i18next']
        }
      }
    }
  }
}));
