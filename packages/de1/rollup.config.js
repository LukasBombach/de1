import typescript from "typescript";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import typescriptPlugin from "rollup-plugin-typescript2";
import autoExternal from "rollup-plugin-auto-external";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      preferBuiltins: true
    },
    {
      file: pkg.module,
      format: "es",
      preferBuiltins: true
    }
  ],
  plugins: [
    autoExternal(),
    resolve({ preferBuiltins: true }),
    commonjs(),
    typescriptPlugin({ typescript })
  ]
};
