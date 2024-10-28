// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      firstName?: string;
      lastName?: string;
      headline?: string;
      countryCode?: string;
      industry?: string;
      vanityName?: string;
    };
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    firstName?: string;
    lastName?: string;
    headline?: string;
    countryCode?: string;
    industry?: string;
    vanityName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      firstName?: string;
      lastName?: string;
      headline?: string;
      countryCode?: string;
      industry?: string;
      vanityName?: string;
    };
  }
}
