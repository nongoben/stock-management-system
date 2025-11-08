import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Api": path.resolve(__dirname, "./src/api"),
      "@componentsObsolete": path.resolve(
        __dirname,
        "./src/componentsObsolete"
      ),
      "@Components": path.resolve(__dirname, "./src/components"),
      "@Icons": path.resolve(__dirname, "./src/assets/icon"),
      "@Slices": path.resolve(__dirname, "./src/store/slices"),
      "@Store": path.resolve(__dirname, "./src/store"),
      "@Utils": path.resolve(__dirname, "./src/utils"),
      "@Hooks": path.resolve(__dirname, "./src/hooks"),
      "@Contexts": path.resolve(__dirname, "./src/contexts"),
      "@Mocks": path.resolve(__dirname, "./src/mocks"),
      "@Services": path.resolve(__dirname, "./src/services"),
      "@Pages": path.resolve(__dirname, "./src/pages"),
      "@Features": path.resolve(__dirname, "./src/features"),
      "@Libs": path.resolve(__dirname, "./src/lib"),
      "@Constants": path.resolve(__dirname, "./src/constants"),
      "@i18n": path.resolve(__dirname, "./i18n.js"),
      "@t": path.resolve(__dirname, "./src/i18next"),
      "@Tests": path.resolve(__dirname, "./src/tests"),
      "@Routers": path.resolve(__dirname, "./src/routers"),
      "@Styles": path.resolve(__dirname, "./src/assets/styles"),
      "@Root": path.resolve(__dirname, "./"),
    },
  },
});
