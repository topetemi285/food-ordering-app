import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { User } from "../models/User";

export async function POST(req) {
  const body = await req.json();
 await mongoose.connect(process.env.MONGO_URL)
  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
