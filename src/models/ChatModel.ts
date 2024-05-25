import mongoose, { Schema, Document } from "mongoose";

export interface IChatSession extends Document {
  title: string;
  userId: Schema.Types.ObjectId;
}

const chatSchema = new Schema<IChatSession>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const ChatSession = (mongoose.models.ChatSession || mongoose.model("ChatSession",chatSchema))

export default ChatSession