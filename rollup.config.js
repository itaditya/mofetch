import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/development.js',
    output: [
      {
        file: 'dist/development.lib.js',
        format: 'cjs',
      },
      {
        file: 'dist/development.es.js',
        format: 'es',
      },
    ],
    plugins: [terser()],
  },
  {
    input: 'src/production.js',
    output: [
      {
        file: 'dist/production.lib.js',
        format: 'cjs',
      },
      {
        file: 'dist/production.es.js',
        format: 'es',
      },
    ],
    plugins: [terser()],
  },
];
