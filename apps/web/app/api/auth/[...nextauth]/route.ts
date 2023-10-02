import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import jwt from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/adapters/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

type getUserProps =
  | { username: string; email?: string }
  | { username?: string; email: string };

const getUser = async ({ username, email }: getUserProps) => {
  const data: any = [];
  if (username) data.push({ username: username });
  if (email) data.push({ email: email });
  try {
    const client = await clientPromise;
    const user = await client.db().collection("users").findOne({
      $or: data,
    });
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
      async profile(profile, tokens) {
        // console.log("profile", profile, tokens);

        const data = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
          username: profile.email.split("@")[0],
          provider: "google",
        };
        const user = await getUser({
          email: data.email,
          username: data.username,
        });
        if (user) {
          data["_id"] = user._id;
          data["username"] = user.username;
          data["role"] = user.role || "USER";
        }
        console.log("GOOGLE PROFILE", data);
        return data;
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
      authorize: async (credentials, req) => {
        if (!credentials) return null;
        const { username, email, password, role } = credentials;
        const user = await getUser({ username: username });
        if (!user) {
          console.log("-- registering user --");
          if (!(email && username && password))
            throw new Error("Invalid data: Check fields and try again");
          // register user
          const client = await clientPromise;
          const newUser = await client.db().collection("users").insertOne({
            username,
            email,
            password,
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
        if (password === user.password) {
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
    async encode({ secret, token }) {
      console.log("jwt encode ==>", token);
      const newToken = {
        ...token,
        username: token?.username || token?.email?.split("@")[0],
      };
      return jwt.sign(newToken, secret);
    },
    async decode({ secret, token }) {
      const data = jwt.verify(token, secret);
      // console.log("jwt decode ==>", data);
      return data;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  callbacks: {
    jwt: async ({ token, user, account, profile, session, trigger }) => {
      const newToken = {
        ...token,
        ...user,
      };
      console.log("jwt callback ==>", newToken);
      return newToken;
    },
    signIn: async ({ user }) => {
      if (user.status == "failed") return false;
      return true;
    },
    session: async ({ session, user, token }) => {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
      return newSession;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
