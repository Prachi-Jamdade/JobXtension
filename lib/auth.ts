// auth.ts or lib/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const auth = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

