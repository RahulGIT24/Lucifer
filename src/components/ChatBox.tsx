import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import getDateAndTime from "@/helpers/date";
import { Copy, Volume2 } from "lucide-react";
import { IMessage } from "@/models/MessageModel";
import Image from "next/image";
import logo from "../../public/logo.jpeg";
import { MarkdownToHtml, copy, speak } from "@/helpers/chatHelpers";
import { useToast } from "./ui/use-toast";
import "../app/chat.css";

const ChatBox = ({
  message,
  loading,
  onScreenMessage,
}: {
  message: any;
  loading?: boolean;
  onScreenMessage?: IMessage[];
}) => {
  const { toast } = useToast();
  const [speaking, setSpeaking] = useState<boolean>(false);
  const { finalDate } = getDateAndTime(message.timestamp);
  const isUser = message.role === "user";

  const isOnScreen = onScreenMessage?.some(
    (screenMessage) => screenMessage._id === message._id
  );

  if (isOnScreen) {
    return null;
  } else {
    return (
      <div className={`w-full flex my-4 ${isUser && "justify-end"}`}>
        <Card
          className={`max-w-[85%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[60%] xl:max-w-[50%] 
          ${
            isUser ? "bg-zinc-700" : "bg-transparent"
          } border-transparent min-h-5 text-white flex`}
        >
          {message.role === "assistant" && (
            <Image
              src={logo}
              alt="Lucifer"
              title="Lucifer"
              className="rounded-full w-[4rem] max-h-[4rem]"
            />
          )}
          <CardContent
            className={`text-2xl flex${
              isUser ? "flex-row-reverse" : ""
            } items-center py-2 px-4 ${
              message.content.toLowerCase() ===
                "error while generating response" &&
              "text-red-400 rounded-lg font-extrabold"
            } `}
          >
            <div className="flex flex-col">
              <div className="response">
              {message.role == "assistant" && (
                <p
                  className="mb-3"
                  dangerouslySetInnerHTML={{
                    __html: MarkdownToHtml({ markdown: message.content }),
                  }}
                ></p>
              )}
              </div>
              {message.role == "user" && <pre className="mb-3 text-lg max-w-full whitespace-pre-wrap break-words">{message.content}</pre>}
              {!loading && message.role === "assistant" && message.content.toLowerCase()!=="error while generating response" && (
                <div className="flex space text-white-600 mt-3 bg-zinc-900 rounded-2xl p-1 space-x-3">
                  {message.content && (
                    <button
                      className={`min-w-2 min-h-2 cursor-pointer p-2 ${
                        speaking
                          ? "bg-white text-black rounded-lg"
                          : "bg-transparent"
                      }`}
                      title="Listen Response"
                    >
                      <Volume2
                        onClick={() => {
                          speak(message.content, speaking, setSpeaking);
                        }}
                      />
                    </button>
                  )}
                  {message.content && (
                    <button
                      className="min-w-2 min-h-2 cursor-pointer bg-transparent p-2 "
                      onClick={() => {
                        const check = copy(message.content);
                        if (check) {
                          toast({
                            description: "Copied to clipboard",
                          });
                        }
                      }}
                      title="Copy"
                    >
                      <Copy />
                    </button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default ChatBox;
