import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const backendUrl = 'http://34.204.69.190:8080';
//const backendUrl = 'http://localhost:8080';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": backendUrl,
      "/categorias-servicios": backendUrl,
      "/servicios": backendUrl,
      "/empleados": backendUrl,
      "/valoraciones": backendUrl,
      "/favoritos": backendUrl,
      "/productos": backendUrl,
      "/reservas": backendUrl,
    },
  },
});
