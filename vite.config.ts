import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());

  console.log("env", env);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy:
        mode === "development"
          ? {
              "/api": {
                target: env.VITE_API_URL,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
              },
            }
          : undefined,
    },
  };
});
