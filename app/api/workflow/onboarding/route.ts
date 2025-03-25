import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type UserState = "active" | "non-active";
type InitialData = {
  email: string;
  fullName: string;
};

// define deferent intervals in milliseconds
const ONE_DAY_IN_MS = 24 * 60 * 60 * 100;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

// get users state
const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";
  const lastActivityDate = new Date(user[0].lastActivityDate);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();
  if (timeDifference > THREE_DAYS_IN_MS && timeDifference < THIRTY_DAYS_IN_MS) {
    return "non-active";
  }

  return "active";
  // Now use the user state to perform some actions in the workflow, n our POST REQUEST
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;
  // send email, when new user signup

  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to {iws} platform",
      message: `Welcome ${fullName}, we are very happy to have you in {iws}`,
    });
  });
  // Wait 3 days to avoid server load and cost

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    // OR email, non active users, according to the state, we send out the email

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: `Hello, are you still There?`,
          message: `please ${fullName}, it's been long since you visited, please, come back we miss you!`,
        });
      });
      // send emails
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: `Welcome Back`,
          message: `Welcome back ${fullName}`,
        });
      });
    }
    // now sleep the work flow once again for a month and recheck once again
    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
//  NOW GO AND TRIGGER THE WORK FLOW WHEN USER SIGN UP

// async function sendEmail(message: string, email: string) {
//   // Implement email sending logic here
//   console.log(`Sending ${message} email to ${email}`);
// }

// RESEND
// QSTASH ALLOWS US TO TRIGGER THE WORKFLOW, BUT WE HAVE TO USE ANOTHER TOOL, TO ACTUALLY SEND OUT THE EMAILS
// IT CAN BE AN SMS, OR IN APP NOTIFICATION
