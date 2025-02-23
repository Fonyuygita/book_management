import { defineConfig } from "drizzle-kit";
// import config from "./config";
import { config } from "dotenv";
config({ path: ".env.local" });

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
