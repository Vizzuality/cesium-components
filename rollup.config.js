import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './index.js',
  output: {
    file: 'dist/react-cesium.js',
    format: 'cjs',
  },
  plugins: [
    resolve({
      modulesOnly: true,
      extensions: ['.js', '.json', '.jsx'],
    }),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
  ],
};
