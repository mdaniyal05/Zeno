import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3000,
    proxy:
      mode === "development"
        ? {
            "/api/v1": {
              target: "http://localhost:8080",
              changeOrigin: true,
            },
          }
        : undefined,
  },
}));
