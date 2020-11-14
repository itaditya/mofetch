import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/mofetch.js',
    output: [
      {
        file: 'dist/mofetch.lib.js',
        format: 'cjs',
      },
      {
        file: 'dist/mofetch.es.js',
        format: 'es',
      },
    ],
    plugins: [terser()],
  },
];
