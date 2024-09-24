import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import jwt from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/adapters/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { comparePassword, hashPassword } from "@cllgnotes/lib/server";

type getUserProps = { needPass?: boolean } & (
  | { username: string; email?: string }
  | { username?: string; email: string }
);

const getUser = async ({ username, email, needPass = false }: getUserProps) => {
  const data: any = [];
  if (username) data.push({ username: username });
  if (email) data.push({ email: email });
  try {
    const client = await clientPromise;
    const user = await client
      .db()
      .collection("users")
      .findOne(
        {
          $or: data,
        },
        {
          projection: {
            password: needPass ? 1 : 0,
            username: 1,
            role: 1,
            _id: 1,
          },
        }
      );
    return user;
  } catch (error) {
    console.log("getUser error", error);
    return null;
  }
};

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    collections: {
      Users: "users",
    },
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          access_type: "online",
          prompt: "consent",
        },
      },
      async profile(profile: any, tokens: any) {
        console.log("profile", Boolean(profile));
        return {
          ...profile,
          id: profile.sub,
          username: profile.email?.split("@")?.[0] || profile.name,
          role: "USER",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
        role: { label: "Role", type: "select", options: ["USER", "ADMIN"] },
      },
      authorize: async (credentials: any, req: any) => {
        if (!credentials) return null;
        const { username, email, password, role } = credentials;
        const user = await getUser({ username: username, needPass: true });
        if (!user) {
          console.log("-- registering user --");
          if (!(email && username && password))
            throw new Error("Invalid data: Check fields and try again");
          // register user
          const client = await clientPromise;
          const hashPass = await hashPassword(password);
          const newUser = await client.db().collection("users").insertOne({
            username,
            email,
            password: hashPass,
            role,
          });
          if (!newUser) {
            throw new Error("Registration Failed");
          }
          console.log("REGISTED USER", newUser);
          return null;
        }
        // LOGIN CODE
        console.log("-- logging in user --");
        const usr = { ...user };
        const isMatch = await comparePassword(password, user.password);
        if (isMatch) {
          delete usr.password;
          console.log("LOGGED IN USER", usr);
          return {
            ...usr,
            id: usr._id,
          } as any;
        }
        throw new Error("Login Failed! Wrong Password");
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: {
    async encode({ secret, token }: { secret: string; token: any }) {
      const newToken = {
        ...token,
        _id: token?._id || token?.id,
        username: token?.username || token?.email?.split("@")[0],
      };
      return jwt.sign(newToken, secret);
    },
    async decode({ secret, token }: { secret: string; token: any }) {
      const data = jwt.verify(token || "", secret);
      return data as any;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  callbacks: {
    jwt: async ({
      token,
      user,
      account,
      profile,
      session,
      trigger,
    }: {
      token: any;
      user: any;
      account: any;
      profile: any;
      session: any;
      trigger: any;
    }) => {
      if (account && account.provider === "google") {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at * 1000;
      }
      return token;
    },
    session: async ({
      session,
      user,
      token,
    }: {
      session: any;
      user: any;
      token: any;
    }) => {
      session.user = {
        ...session.user,
        ...token,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
