import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().cuid(),
  username: z.string().regex(/^[a-z0-9_-]+$/, {
    message:
      "Username can only contain lowercase letters, numbers, '_', and '-'.",
  }),
  email: z.string().email(),
  emailVerified: z.date(),
  image: z.string().url(),
  name: z.string(),
  bio: z.string(),
  created_at: z.date(),
});
