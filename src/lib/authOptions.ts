import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./db";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

interface DBUser {
  _id: ObjectId;
  nid: string;
  name: string;
  email: string;
  contact: string;
  password?: string;
  role: string;
  provider?: string;
  image?: string;
  createdAt?: Date;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  nid: string;
  contact: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const usersCollection = await dbConnect<DBUser>(collections.USERS);
          const user = await usersCollection.findOne({ email: credentials.email });

          if (!user) throw new Error("No user found");
          if (!user.password) throw new Error("Password missing");

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) throw new Error("Invalid password");

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            nid: user.nid || "",
            contact: user.contact || "",
            role: user.role || "user",
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      try {
        if (!user?.email || !account) return false;

        const usersCollection = await dbConnect<DBUser>(collections.USERS);
        const existingUser = await usersCollection.findOne({ email: user.email });
        
        if (existingUser) {
          return true;
        }

        // Create new Google user
        const newUser: Omit<DBUser, "_id"> = {
          provider: account.provider,
          email: user.email,
          name: user.name || "User",
          image: user.image || "",
          role: "user",
          nid: "",
          contact: "",
          createdAt: new Date(),
        };

        await usersCollection.insertOne(newUser as DBUser);
        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },

    async jwt({ token, user }: any) {
      // First login - populate token from user
      if (user) {
        token.id = user.id;
        token.nid = user.nid || "";
        token.contact = user.contact || "";
        token.email = user.email;
        token.role = user.role || "user";
        token.name = user.name;
      } 
      // Token refresh - fetch fresh user data from DB
      else if (token.email) {
        try {
          const usersCollection = await dbConnect<DBUser>(collections.USERS);
          const dbUser = await usersCollection.findOne({ email: String(token.email) });
          
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.nid = dbUser.nid || "";
            token.contact = dbUser.contact || "";
            token.role = dbUser.role || "user";
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }
      
      return token;
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.nid = token.nid;
        session.user.contact = token.contact;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
};
