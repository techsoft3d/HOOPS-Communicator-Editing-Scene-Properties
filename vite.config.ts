import { resolve } from "path";
import { UserConfig, defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig((config: UserConfig) => {
  config.plugins = [
    dts({
      include: ["src/lib/**"],
      outDir: "dist",
    }),
  ];

  config.build = {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/lib/com-commands.ts"),
      name: "ComCommands",
      // the proper extensions will be added
      fileName: "com-commands",

      formats: ["es", "umd", "iife"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          Communicator: "Communicator",
        },
      },
    },
  };

  switch (config.mode) {
    case "development":
      config.build.minify = false;
      break;
  }

  return config;
});
