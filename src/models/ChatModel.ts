import mongoose, { Schema, Document } from "mongoose";

export interface IChatSession extends Document {
  _id:string;
  title: string;
  userId: Schema.Types.ObjectId;
  timestamp:Date
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
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatSession =
  mongoose.models.ChatSession || mongoose.model("ChatSession", chatSchema);

export default ChatSession;
