import fs from 'fs';
import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

const extensions = [
  '.js', '.ts',
];

const name = 'RollupTypeScriptBabel';
const srcDir = path.resolve(__dirname, './src');
const distDir = path.resolve(__dirname, './public');

function createRollupConfig(inputFile) {
  const extname = path.extname(inputFile);
  const basename = path.basename(inputFile, extname);

  return {
    input: path.resolve(srcDir, inputFile),

    // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
    // https://rollupjs.org/guide/en#external-e-external
    external: [],

    plugins: [
      // Copy html files to public folder
      copy({
        targets: [
          path.resolve(srcDir, `${basename}.html`)
        ],
        outputFolder: distDir
      }),
      
      // Allows node_modules resolution
      resolve({ extensions }),

      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs(),

      // Compile TypeScript/JavaScript files
      babel({ extensions, include: ['src/**/*'] }),
    ],

    output: [{
      file: path.resolve(distDir, `${basename}.esm.bundle.js`),
      format: 'es',
    }, {
      file: path.resolve(distDir, `${basename}.bundle.js`),
      format: 'iife',
      name,

      // https://rollupjs.org/guide/en#output-globals-g-globals
      globals: {},
    }],
  };
};

const inputSourceFiles = fs.readdirSync(srcDir)
.filter(srcFileName => ['.js', '.ts'].indexOf(path.extname(srcFileName)) >= 0)

if (inputSourceFiles.length === 0) {
  throw new Error('No valid input source files');
}

export default inputSourceFiles.map(createRollupConfig);