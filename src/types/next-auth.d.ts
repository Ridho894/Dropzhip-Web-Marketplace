import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    token: string;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
      is_admin: number;
      remember_token: string | null;
      last_login: string;
      register_date: string | null;
      updated_at: string;
    };
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User["user"];
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    accessToken: string;
    user: User;
  }
}
