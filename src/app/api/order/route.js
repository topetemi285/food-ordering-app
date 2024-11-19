import mongoose from "mongoose";
import { getServerSession } from "next-auth";
// import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Order } from "../models/Order";
import { User } from "../models/User";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URLs);

  const session = await getServerSession({
    secret: process.env.SECRETs,
    adapter: MongoDBAdapter(client),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_IDs,
        clientSecret: process.env.GOOGLE_CLIENT_SECRETs,
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

          mongoose.connect(process.env.MONGO_URLs);

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
  });
  const userEmail = session?.user?.email;
  const admin = isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  if (_id) {
    return Response.json(await Order.findBYId(_id));
  }

  if (admin) {
    return Response.json(await Order.find({ userEmail }));
  }
}
