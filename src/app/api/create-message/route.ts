import { connectToDB } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import MessageModel from "@/models/MessageModel";
import mongoose from "mongoose";
import ChatSession from "@/models/ChatModel";

export async function POST(request: Request) {
  await connectToDB();
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Session Expired",
        },
        { status: 401 }
      );
    }

    const { sender, content, session_id } = await request.json();

    const message = await new MessageModel({
      sender,
      content,
      session_id,
    });

    await message.save();

    return Response.json(
      {
        success: true,
        message: "Message saved",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await connectToDB();
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get("id");
  try {
    const session = await getServerSession(authOptions);

    const user = session?.user;
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Session Expired",
        },
        { status: 401 }
      );
    }
    const session_id = new mongoose.Types.ObjectId(id as string);

    const messages = await ChatSession.aggregate([
      { $match: { session_id } },
      { $sort: { timestamp: 1 } },
    ]).exec();

    return Response.json(
      {
        success: true,
        message: "Fetched",
        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
