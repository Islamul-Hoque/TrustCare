// "use server";
// import { collections, dbConnect } from "@/lib/dbConnect";
// import bcrypt from "bcryptjs";

// export const postUser = async (payload) => {
//     const { email, password, name } = payload;
//     if (!email || !password) {
//         return {
//             success: false,
//         };
//     }
//     const isExist = await dbConnect(collections.USERS).findOne({ email });
//     if (isExist) {
//         return {
//             success: false,
//         };
//     }
//     const newUser = {
//         provider: "credentials",
//         name,
//         email,
//         password: await bcrypt.hash(password, 14),
//         role: "user",
//     };

//     const result = await dbConnect(collections.USERS).insertOne(newUser);
//     return {
//         ...result,
//         insertedId: result.insertedId?.toString(),
//     };
// };

// export const loginUser = async (payload) => {
//     const { email, password, name } = payload;
//     if (!email || !password) {
//         return null;
//     }
//     const user = await dbConnect(collections.USERS).findOne({ email });
//     if (!user) {
//         return null;
//     }
//     const isMatched = await bcrypt.compare(password, user?.password);
//     if (isMatched) {
//         return user;
//     }
//     return null;
// };

// lib/auth.ts

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { collections, dbConnect } from "./db";

type DBUser = {
  _id: any;
  nid: string;
  name: string;
  email: string;
  contact: string;
  password: string;
};

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const users = await dbConnect<DBUser>(collections.USERS);
        const user = await users.findOne({ email: credentials.email }) as DBUser | null;

        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          nid: user.nid,
          contact: user.contact,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = (user as any).id;
        token.nid = (user as any).nid;
        token.contact = (user as any).contact;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).nid = token.nid;
        (session.user as any).contact = token.contact;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
