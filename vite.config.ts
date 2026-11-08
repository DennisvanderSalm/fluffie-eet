import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react(), { name: 'production-network-policy', apply: 'build', transformIndexHtml: html => html.replace("connect-src 'self'", "connect-src 'none'") }], base: './', build: { target: 'safari15.4' } });
