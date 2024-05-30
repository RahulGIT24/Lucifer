import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import getDateAndTime from "@/helpers/date";
import { Loader2 } from "lucide-react";
import { IMessage } from "@/models/MessageModel";

const ChatBox = ({ message, loading,onScreenMessage }: { message: any; loading: boolean,onScreenMessage?:IMessage[] }) => {
  const { finalDate } = getDateAndTime(message.timestamp);
  const isUser = message.role === "user";

  const isOnScreen = onScreenMessage?.some(screenMessage => screenMessage._id === message._id);
  console.log(isOnScreen)
  console.log(onScreenMessage)

  if(isOnScreen){
    return null;
  }else{
    return (
      <div className={`w-full flex my-4 ${isUser && "justify-end"}`}>
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
            } items-center py-2 px-4 ${
              message.content.toLowerCase() ===
                "error while generating response" &&
              "bg-red-300 rounded-full border-red-900 border text-red-900"
            } `}
          >
            <p>{message.content}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

};

export default ChatBox;
