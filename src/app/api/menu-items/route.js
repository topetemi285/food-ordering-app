import mongoose from "mongoose";
import { MenuItems } from "../models/MenuItem";

export async function POST(req) {
  await mongoose
    .connect(process.env.MONGO_URL)
    
  const data = await req.json();
  const menuItemDoc = await MenuItems.create(data);
  return Response.json(menuItemDoc);
}

export async function PUT(req) {
  await mongoose
    .connect(process.env.MONGO_URL)
   
  const { _id, ...data } = await req.json();
  await MenuItems.findByIdAndUpdate(_id, data);
  return Response.json(true);
}

export async function GET() {
  await mongoose
    .connect(process.env.MONGO_URL)
   
  return Response.json(await MenuItems.find());
}

export async function DELETE(req) {
  await mongoose
    .connect(process.env.MONGO_URL)
    
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await MenuItems.deleteOne({ _id });
  return Response.json(true);
}
