import { Options, defineConfig } from 'tsup'

const currentNodeEnv = process.env.NODE_ENV
const isProd = currentNodeEnv === 'build'

const commonConfig: Options = {
  minify: isProd,
  sourcemap: !isProd,
  shims: true,
  clean: true,
  dts: true
}

export default defineConfig([
  {
    format: ['esm', 'cjs', 'iife'],
    entry: ['./src/index.ts'],
    outDir: 'dist/main',
    platform: 'neutral',
    globalName: 'fy',
    outExtension({ format }) {
      if (format === 'iife') return { js: '.main.js' }
      return { js: `.${format}.js` }
    },
    ...commonConfig
  },
  {
    format: ['esm', 'cjs'],
    entry: ['./packages/Node/index.ts'],
    outDir: 'dist/node',
    platform: 'node',
    ...commonConfig
  }
])
