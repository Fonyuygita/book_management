import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import config from "@/config";

const sql = neon(config.env.databaseUrl);
// export const db=drizzle({client:sql})
export const db = drizzle({ client: sql });
