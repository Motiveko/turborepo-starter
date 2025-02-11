import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), tailwindcss()],
});
