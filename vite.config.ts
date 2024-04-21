import { defineConfig } from "vite";
import { terser } from "rollup-plugin-terser";
import obfuscator from "rollup-plugin-obfuscator";
import path from "path";

export default defineConfig({
  build: {
    minify: "esbuild",
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "FileSizeCheck",
      fileName: (format) => `file-size-check.${format}.js`,
    },
    rollupOptions: {
      plugins: [
        terser() as Plugin, // 用于代码压缩
        obfuscator({
          // 用于代码混淆
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.75,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.4,
          debugProtection: true,
          debugProtectionInterval: false,
          disableConsoleOutput: true,
          rotateStringArray: true,
          stringArray: true,
          stringArrayEncoding: ["rc4"],
          stringArrayThreshold: 0.75,
        }) as Plugin,
      ],
      external: ["fs", "path"],
      output: {
        globals: {
          fs: "fs",
          path: "path",
        },
      },
    },
  },
});
