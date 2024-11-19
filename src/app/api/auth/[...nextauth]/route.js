import * as mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";;
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../../../../components/libs/mongoConnect";
import { User } from "../../models/User"

// export const authOptions =
// {
//   secret: process.env.SECRETs,
//   adapter: MongoDBAdapter(client),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_IDs,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRETs,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       id: "credentials",
//       credentials: {
//         username: {
//           label: "Email",
//           type: "email",
//           placeholder: "jsmith@gmail.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const { email, password } = credentials;

//         mongoose.connect(process.env.MONGO_URLs);

//         const user = await User.findOne({ email });

//         if (user) {
//           // Use await to properly handle the promise returned by bcrypt.compare
//           const passwordIsOkay = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );

//           if (passwordIsOkay) {
//             return user;
//           } else {
//             throw new Error("Invalid email or password");
//           }
//           // const passwordIsOkay = user && bcrypt.compare(password, user.password);

//           console.log({ passwordIsOkay });

//           if (passwordIsOkay) {
//             return user;
//           }
//           return null;
//         }
//       },
//     }),
//   ],
// };
const handler = NextAuth({
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
export { handler as GET, handler as POST };
