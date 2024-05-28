import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  sender: string;
  content: string;
  timestamp: Date;
  session_id: Schema.Types.ObjectId;
  _id?:string
}

const messageSchema = new Schema<IMessage>({
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  session_id: {
    type: Schema.Types.ObjectId,
    ref: "ChatSession",
    required: true,
  },
});

const MessageModel = (mongoose.models.Message || mongoose.model('Message', messageSchema))
export default MessageModel