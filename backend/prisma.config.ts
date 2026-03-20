import * as dotenv from "dotenv";
import * as path from "path";
import { defineConfig } from "prisma/config";

// Load .env from the project root (one level above /backend)
dotenv.config({ path: path.resolve(__dirname, "../.env"), override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});