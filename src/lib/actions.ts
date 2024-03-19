"use server";

import { UserSchema } from "./zod";
import prisma from "./db";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    username?: string[];
  };
  message?: string | null;
};

const updateUserSchema = UserSchema.pick({ username: true });

export async function updateUsername(
  email: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = updateUserSchema.safeParse({
    username: formData.get("username"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Zod Error: Failed to Update username.",
    };
  }

  const { username } = validatedFields.data;

  try {
    const data = await prisma.user.update({
      where: { email },
      data: { username },
    });
  } catch (error) {}
  redirect(`/`);
}
