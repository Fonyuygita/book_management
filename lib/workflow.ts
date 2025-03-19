// create a workflow client

import config from "@/config";
import { Client as WorkflowClient } from "@upstash/workflow";
// import { config } from 'dotenv'
// import { config } from 'dotenv'
export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});
