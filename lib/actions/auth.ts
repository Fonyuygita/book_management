"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { error } from "console";
import { eq } from "drizzle-orm";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (err) {
    console.log(err, "Error SigningUp");
    return { sucess: false, error: "Signup error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, universityId, password, universityCard } = params;
  // check if user already exist

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exist" };
  }

  // now we hash the password
  const hashedPassword = await hash(password, 20);
  try {
    // we can try to create a new user in the try
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });

    // upon Registration, we can automatically sign in on behalf of the new user so they don't provide their credentials on the signIn screen
    // await signInWithCredentials({email, password})
    return { success: true };
  } catch (err) {
    console.log(err, "Error SigningUp");
    return { sucess: false, error: "Signup error" };
  }
};
