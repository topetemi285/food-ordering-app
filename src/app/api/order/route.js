import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "../models/Order";


export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const admin = isAdmin();

    const url =new URL(req.url);
    const _id = url.searchParams.get('_id');

    if(_id){
        return Response.json(await Order.findBYId(_id));
    }

    if(admin){
        return Response.json(await Order.find({userEmail}))
    }
}