import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

/**
 * Dev-time Security Headers Plugin
 * Provides baseline HTTP response headers for local preview.
 * (In production, headers such as X-Content-Type-Options, X-Frame-Options,
 * and CSP are served by the hosting CDN / Edge proxy e.g. Cloudflare / Nginx).
 */
function devSecurityHeadersPlugin(): Plugin {
  return {
    name: 'ayyuq-dev-security-headers',
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        // Enforce secure baseline headers during dev
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), devSecurityHeadersPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
