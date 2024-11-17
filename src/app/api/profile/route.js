import { getServerSession } from "next-auth";
import { User } from "../models/User";
import { UserInfo } from "../models/UserInfo";
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { Console } from "console";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL)
  const data = await req.json();
  const { _id, name, image, ...otherUserInfo } = data;

  //we want to update by email and id
  let filter = {};
  if (_id) {
    await User.updateOne({ _id }, { name, image });
    await UserInfo.findOneAndUpdate({ _id }, otherUserInfo, { upsert: true });
  } else {
    //getCurrent user
    const session = await getServerSession(authOptions);
    //   console.log(authOptions);
    console.log({ session, data });
    const email = session.user?.email;

    await User.updateOne({ email }, { name, image });
    //upsert means find the email first then update otheruserinfo
    await UserInfo.findOneAndUpdate({ email }, otherUserInfo, { upsert: true });
  }

  return Response.json(true);
}

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL)

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  if (_id) {
    const user = await User.findOne({ _id }).lean();
    const userInfo = await UserInfo.findOne({ email: user.email }).lean();
    return Response.json({ ...user, ...userInfo });
  } else {
    const session = await getServerSession(authOptions);

    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    const user = await User.findOne({ email }).lean();
    const userInfo = await UserInfo.findOne({ email }).lean();
    return Response.json({ ...user, ...userInfo });
  }
}

// export async function GET(req) {
//   await mongoose.connect(process.env.MONGO_URL);

//   const url = new URL(req.url);
//   const _id = url.searchParams.get("_id");

//   if (_id) {
//     // Fetch the user by ID
//     const user = await User.findOne({ _id }).lean();
//     if (!user) {
//       return new Response("User not found", { status: 404 });
//     }

//     // Fetch related user info using the email
//     const userInfo = await UserInfo.findOne({ email: user.email }).lean();

//     // Merge and send the result, handling cases where userInfo may not exist
//     return Response.json({
//       ...user,
//       ...(userInfo || {})  // spread only if userInfo exists
//     });
//   } else {
//     // Handle case for logged-in session
//     const session = await getServerSession(authOptions);
//     const email = session?.user?.email;

//     if (!email) {
//       return Response.json({});
//     }

//     // Fetch the user by email
//     const user = await User.findOne({ email }).lean();
//     if (!user) {
//       return new Response("User not found", { status: 404 });
//     }

//     // Fetch related user info
//     const userInfo = await UserInfo.findOne({ email }).lean();

//     // Return the merged object
//     return Response.json({
//       ...user,
//       ...(userInfo || {})  // spread only if userInfo exists
//     });
//   }
// }
