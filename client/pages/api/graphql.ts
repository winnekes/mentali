import "reflect-metadata";
import type { PageConfig } from "next";
import Cors from "micro-cors";
import { initializeDatabase } from "../../server/database-connection";
import { startGraphqlServer } from "../../server/graphql-server";

const cors = Cors();
// TODO: check if this is acceptable or if I need to create connection on demand
await initializeDatabase();

// To access GraphQL endpoint on IoT device we need to enable Cors, Next.js disables CORS by default
export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  return startGraphqlServer(req, res);
});

// This disables Next.js from handling this route
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
