import { connectToDB } from "@/lib/dbConnect";
import ChatSession from "@/models/ChatModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import redis from "@/lib/redis";
import MessageModel from "@/models/MessageModel";

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
      title: name,
      userId: user._id,
    });

    await session.save();
    await redis.del(`${user?._id} chat-session`);
    return Response.json(
      {
        success: true,
        message: "Session created successfully",
        session_id: session._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
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
    const cache = await redis.get(`${user?._id} chat-session`);
    if (cache) {
      return Response.json(
        {
          success: true,
          message: "Session fetched successfully",
          session: JSON.parse(cache),
        },
        { status: 200 }
      );
    }

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Session Expired",
        },
        { status: 401 }
      );
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    const sessions = await ChatSession.aggregate([
      { $match: { userId } },
      { $sort: { timestamp: -1 } },
    ]).exec();

    const sessionJSON = JSON.stringify(sessions);
    await redis.set(`${user._id} chat-session` as string, sessionJSON);

    return Response.json(
      {
        success: true,
        message: "Session fetched successfully",
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

export async function DELETE(request: Request) {
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
    const { _id } = user;
    const { session_id } = await request.json();
    await ChatSession.findOneAndDelete(
      {
        _id: session_id,
        userId: _id,
      },
      { $new: true }
    );
    await MessageModel.deleteMany({ session_id });
    await redis.del(`${user?._id} chat-session`);

    return Response.json(
      {
        succes: true,
        message: "Deleted Chat Session",
      },
      {
        status: 202,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        succes: false,
        message: "Error while deleting chat session",
      },
      {
        status: 500,
      }
    );
  }
}
