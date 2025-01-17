import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.ts', // Your entry file
  output: [
    {
      file: 'dist/index.cjs.js', // CommonJS build
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js', // ES Module build
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(), // Automatically marks peer dependencies as external
    resolve(), // Allows bundling of node_modules
    commonjs(), // Converts CommonJS modules to ES6
    typescript({
      tsconfig: './tsconfig.json', // Use your existing TypeScript config
    }),
  ],
  external: ['react', 'react-dom'], // Don't bundle React or ReactDOM
};
