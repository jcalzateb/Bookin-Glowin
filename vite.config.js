import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": "http://localhost:8080",
      "/categorias-servicios": "http://localhost:8080",
      "/servicios": "http://localhost:8080",
      "/empleados": "http://localhost:8080",
    },
  },
});
