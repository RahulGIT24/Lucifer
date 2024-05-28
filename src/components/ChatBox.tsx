import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IMessage } from "@/models/MessageModel";
import getDateAndTime from "@/helpers/date";

const ChatBox = ({ message }: { message: IMessage }) => {
  const { finalDate } = getDateAndTime(message.timestamp);
  const isUser = message.sender === "user";
  return (
    <div
      className={`w-full flex my-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <Card
        className={`max-w-[85%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[60%] xl:max-w-[50%] 
        ${
          isUser ? "bg-zinc-700" : "bg-transparent"
        } border-transparent min-h-5 text-white flex`}
        title={finalDate}
      >
        <CardContent
          className={`text-2xl flex ${
            isUser ? "flex-row-reverse" : ""
          } items-center py-2 px-4`}
        >
          {/* {!isUser && (
            <img
              src={"/logo.jpeg"} // Use a different image for the assistant
              className="w-[3rem] h-[3rem] rounded-full mr-3"
              title={isAssistant ? "ChatGPT" : "Lucifer"}
              alt={isAssistant ? "ChatGPT" : "Lucifer"}
            />
          )} */}
          {message.sender !== "user" && message.content === 'Error while generatin response' ? (
            <div className="w-full px-11 py-5 rounded-full text-red-600  border border-red-700">
              <p>Error while generating response</p>
            </div>
          ) : (
            <p>{message.content}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBox;
