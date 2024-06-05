import { connectToDB } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import ChatSession from "@/models/ChatModel";
import MessageModel from "@/models/MessageModel";

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
