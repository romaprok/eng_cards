import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react({
        // Enable React 19 features
        jsxRuntime: 'automatic',
        // Enable fast refresh
        fastRefresh: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@types': path.resolve(__dirname, './src/types'),
        '@store': path.resolve(__dirname, './src/store'),
        '@services': path.resolve(__dirname, './src/services'),
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: '[name]__[local]__[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`,
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      hmr: {
        overlay: true,
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,
      reportCompressedSize: false, // Faster builds
      chunkSizeWarningLimit: 1000, // Adjust warning threshold
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
          // Better file naming for caching
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      cssCodeSplit: true,
      // Add asset handling
      assetsInlineLimit: 4096,
      // Empty output directory before build
      emptyOutDir: true,
    },
    optimizeDeps: {
      // Pre-bundle these dependencies
      include: ['react', 'react-dom'],
      // Exclude these from pre-bundling
      exclude: ['@types/*', '*.css', '*.scss'],
      // Force dependency pre-bundling
      force: true,
      // Disable pre-bundling in production
      disabled: mode === 'production',
      // Cache directory for pre-bundled dependencies
      cacheDir: 'node_modules/.vite',
      // Options for esbuild
      esbuildOptions: {
        target: 'esnext',
        supported: {
          'top-level-await': true,
        },
      },
    },
    // Add environment variable handling
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      // Expose env variables to the client
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})
