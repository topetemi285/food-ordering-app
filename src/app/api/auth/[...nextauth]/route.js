import * as mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
// import clientPromise from "../../../../components/libs/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../../../../components/libs/mongoConnect";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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

        mongoose.connect(process.env.MONGO_URL);

        const user = await User.findOne({ email });

        if (user) {
          // Use await to properly handle the promise returned by bcrypt.compare
          const passwordIsOkay = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (passwordIsOkay) {
            return user;
          } else {
            throw new Error("Invalid email or password");
          }
          // const passwordIsOkay = user && bcrypt.compare(password, user.password);

          console.log({ passwordIsOkay });

          if (passwordIsOkay) {
            return user;
          }
          return null;
        }
      },
    }),
  ],
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
