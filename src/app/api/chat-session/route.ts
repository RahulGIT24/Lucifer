import { connectToDB } from "@/lib/dbConnect";
import ChatSession from "@/models/ChatModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function POST(request: Request) {
  await connectToDB();
  try {
    const userSession = await getServerSession(authOptions);
    const user = userSession?.user;
    const { name } = await request.json();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Session Expired",
        },
        { status: 401 }
      );
    }

    // creating session
    const session = new ChatSession({
      title:name,
      userId: user._id,
    });

    await session.save();
    return Response.json(
      {
        success: true,
        message: "Session created successfully",
        session_id: session._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return Response.json(
      {
        success: false,
        message: "Error while creating chat session",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await connectToDB();
  try {
    const userSession = await getServerSession(authOptions);
    const user = userSession?.user;

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Session Expired",
        },
        { status: 401 }
      );
    }

    const userId = new mongoose.Types.ObjectId(user._id)

    const sessions = await ChatSession.aggregate([
      { $match: {userId} },
      { $sort: { timestamp: -1 } },
    ]).exec();

    return Response.json(
      {
        success: true,
        message: "Session created successfully",
        session: sessions,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error while fetching chat sessions",
      },
      { status: 500 }
    );
  }
}
