import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default {
  input: 'src/index.js',
  sourceMap: true,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
};
