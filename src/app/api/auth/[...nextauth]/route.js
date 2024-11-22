import * as mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../../../../components/libs/mongoConnect";
import { User } from "../../models/User";

const handler = NextAuth({
  debug: true,
  secret: process.env.SECRETs,
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_IDs,
      clientSecret: process.env.GOOGLE_CLIENT_SECRETs,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // const email = credentials?.email;
        // const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URLs);

        const user = await User.findOne({ email });

        const passwordOk =
          user && bcrypt.compareSync(credentials.password, user.password, user);

        // console.log(
        //   "[CHECK IS THE PASSWORD OK]",
        //   { passwordOk },
        //   password,
        //   user.password,
        //   user
        // );

        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
});
export { handler as GET, handler as POST };
