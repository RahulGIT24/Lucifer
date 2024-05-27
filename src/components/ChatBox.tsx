import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { IMessage } from "@/models/MessageModel";
import getDateAndTime from "@/helpers/date";

const ChatBox = ({ message }: { message: IMessage }) => {
  const { finalDate } = getDateAndTime(message.timestamp);
  return (
    <div className={`w-full justify-${message.sender === 'user' ? 'end' : 'start'} flex my-4`}>
      <Card
        className={`max-w-[85%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[60%] xl:max-w-[50%] bg-${message.sender === 'user' ? 'zinc-700' : "transparent"} border-transparent min-h-5 text-white flex`}
        title={finalDate}
      >
        <CardContent className="text-2xl flex justify-center items-center py-2 px-4">
          {message.sender !== 'user' && (
            <img
              src="/logo.jpeg"
              className="w-[3rem] rounded-full mr-3"
              title="Lucifer"
              alt="Lucifer"
            />
          )}
          <p>{message.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBox;
