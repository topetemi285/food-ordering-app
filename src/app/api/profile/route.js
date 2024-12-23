import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../../../components/libs/mongoConnect";
import { User } from "../models/User";
import { UserInfo } from "../models/UserInfo";
import mongoose from "mongoose";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const { _id, name, image, ...otherUserInfo } = data;

  //we want to update by email and id
  let filter = {};
  if (_id) {
    await User.updateOne({ _id }, { name, image });
    await UserInfo.findOneAndUpdate({ _id }, otherUserInfo, { upsert: true });
  } else {
    //getCurrent user
    const session = await getServerSession({
      debug: true,
      secret: process.env.SECRET,
      adapter: MongoDBAdapter(client),
      providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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

            mongoose.connect(process.env.MONGO_URL);

            const user = await User.findOne({ email });

            const passwordOk =
              user &&
              bcrypt.compareSync(credentials.password, user.password, user);

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
      session: {
        strategy: "jwt",
      },
    });

    console.log({ session, data });
    const email = session.user?.email;

    await User.updateOne({ email }, { name, image });
    //upsert means find the email first then update otheruserinfo
    await UserInfo.findOneAndUpdate({ email }, otherUserInfo, { upsert: true });
  }

  return Response.json(true);
}

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  if (_id) {
    const user = await User.findOne({ _id }).lean();
    const userInfo = await UserInfo.findOne({ email: user.email }).lean();
    return Response.json({ ...user, ...userInfo });
  } else {
    const session = await getServerSession({
      debug: true,
      secret: process.env.SECRET,
      adapter: MongoDBAdapter(client),
      providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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

            mongoose.connect(process.env.MONGO_URL);

            const user = await User.findOne({ email });

            const passwordOk =
              user &&
              bcrypt.compareSync(credentials.password, user.password, user);

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
      session: {
        strategy: "jwt",
      },
    });

    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    const user = await User.findOne({ email }).lean();
    const userInfo = await UserInfo.findOne({ email }).lean();
    return Response.json({ ...user, ...userInfo });
  }
}
