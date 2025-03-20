// create a workflow client

import config from "@/config";
import { Client as WorkflowClient } from "@upstash/workflow";

import { Client as QStashClient, resend } from "@upstash/qstash";
// import { config } from 'dotenv'
// import { config } from 'dotenv'
export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

// Create a functionality to send out an email

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "IWS  Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: subject,
      html: message,
    },
  });
};
