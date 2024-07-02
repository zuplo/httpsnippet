import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  ...options,
  bundle: true,
  platform: 'browser',
  target: ['es2022'],
  cjsInterop: true,
  dts: true,
  entry: ['src/index.ts', 'src/helpers/code-builder.ts', 'src/helpers/reducer.ts', 'src/targets/index.ts'],
  format: ['esm', 'cjs'],
  shims: true,
  silent: !options.watch,
  sourcemap: true,
  treeshake: true,
  tsconfig: './tsconfig.json',
  esbuildOptions: opts => {
    opts.plugins = [
      polyfillNode({
        polyfills: {
          url: true,
          querystring: true,
        },
      }),
    ];
  },
}));
