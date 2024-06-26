"use client";

import { Loader2, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import Card from "./Card";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setShowSidebar } from "@/lib/store/features/sidebar/sidebarSlice";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "./ui/use-toast";
import {
  setChatSessionId,
  setMessages,
} from "@/lib/store/features/chat/chatSlice";
import ChatBox from "./ChatBox";
import { useChat } from "ai/react";
import { scroll } from "@/helpers/scroll";
import { IMessage } from "@/models/MessageModel";
import Input from "./Input";
import { Message } from "ai";

const Chat = () => {
  const showSideBar = useAppSelector((state) => state.sidebarSlice.showSideBar);
  const { toast } = useToast();
  const sessionId = useAppSelector((state) => state.chatSlice.chatSessionId);
  const messages = useAppSelector((state) => state.chatSlice.messages);
  const [response, setResponse] = useState(false); // *will remove later
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (sessionId) {
      getMessagesFromDB();
      window.speechSynthesis.cancel();
    }
    setReply([]);
    setInput("");
  }, [sessionId]);

  const toggleMenu = (e: any) => {
    e.stopPropagation();
    dispatch(setShowSidebar(true));
  };

  const {
    messages: reply,
    setMessages: setReply,
    isLoading: replyLoading,
    error: modelError,
    handleSubmit: getReply,
    input,
    handleInputChange,
    setInput,
    stop,
  } = useChat({
    api: "/api/get-reply",
    onError: () => {
      setResponse(!response);
    },
    onFinish: () => {
      setResponse(!response);
    },
  });

  useEffect(() => {
    if (messages.length > 0) {
      setReply(messages as Message[]);
    }
  }, [messages]);

  const saveResinDB = () => {
    if (!replyLoading && reply.length > 0 && sessionId && !modelError) {
      saveMessagesinDB({
        role: "assistant",
        content: reply[reply.length - 1].content,
        sessionId: sessionId,
      });
    }
    if (modelError && sessionId) {
      saveMessagesinDB({
        role: "assistant",
        content: "Error while generating response",
        sessionId: sessionId,
      });
    }
  };

  useEffect(() => {
    saveResinDB();
  }, [response]);

  const getMessagesFromDB = async () => {
    try {
      const response = await axios.get("/api/message?id=" + sessionId);
      dispatch(setMessages(response.data.messages));
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;
      const errMessage = err.message;
      toast({
        title: "Error occured",
        description: errMessage,
        variant: "destructive",
      });
    }
  };

  const saveMessagesinDB = async ({
    role,
    content,
    sessionId,
  }: {
    role: string;
    content: string;
    sessionId: string;
  }) => {
    try {
      if (!content || !sessionId || !role) {
        return;
      }
      const response = await axios.post("/api/message", {
        role,
        content,
        session_id: sessionId,
      });
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;
      const errMessage = err.message;
      toast({
        title: "Error occured",
        description: errMessage,
        variant: "destructive",
      });
    } finally {
      false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (replyLoading) return;
    if (!input) {
      return;
    }
    if (sessionId) {
      await saveMessagesinDB({
        role: "user",
        content: input,
        sessionId,
      });
      getReply(e);
      return;
    }
    try {
      const response = await axios.post("/api/chat-session", {
        name: input,
      });
      if (response.data.success) {
        dispatch(setChatSessionId(response.data.session_id));
        await saveMessagesinDB({
          role: "user",
          content: input,
          sessionId: response.data.session_id,
        });
        getReply(e);
      }
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;
      const errMessage = err.message;
      toast({
        title: "Error occured",
        description: errMessage,
        variant: "destructive",
      });
    } finally {
      setInput("");
    }
  };

  const cardData = [
    "Can you generate a random quiz for me",
    "Write a python code to find factorial of a number",
    "What are the signs of cancer",
    "Explain Object Oriented Programming",
  ];

  useEffect(() => {
    setTimeout(()=>{
      scroll("scroll");
    },500)
  }, [sessionId, messages,reply]);

  return (
    <div
      className={`w-full bg-transparent ${
        showSideBar ? "opacity-30" : "opacity-100"
      } min-h-screen flex flex-col items-center overflow-hidden relative`}
    >
      <div className="p-3 text-zinc-300 w-full flex justify-between">
        <div className="flex items-center">
          <span
            className="cursor-pointer md:hidden lg:hidden sm:block"
            title="Menu"
            onClick={toggleMenu}
          >
            <Menu />
          </span>
          <h1 className="text-2xl font-medium pl-5">Lucifer</h1>
        </div>
        {session?.user && (
          <img
            src={user?.profilePic}
            alt="profile-picture"
            className="w-[2rem] rounded-full"
            title={`Hi ${user?.name}`}
          />
        )}
      </div>
      <div
        className="flex items-center flex-col w-full overflow-y-auto flex-1 mb-28  h-full"
        id="scroll"
      >
        <div className="content py-7 w-full sm:w-11/12 md:w-9/12 px-4">
          {!sessionId && (
            <div>
              {session?.user && (
                <>
                  <p className="text-left text-[#9b9aa5] font-bold text-4xl sm:text-7xl transition-all duration-1000 ease-in-out animate-slideIn">
                    Hey, {user?.name?.split(" ")[0]}
                  </p>
                  <p className="text-left text-zinc-200 font-semibold text-2xl sm:text-5xl mt-4 sm:mt-8 transition-opacity duration-1000 ease-in-out animate-slideIn">
                    How can I help you today?
                  </p>
                </>
              )}
              <div className="flex flex-wrap gap-4 mt-4">
                {session?.user && (
                  <>
                    {cardData.map((item, index) => {
                      return (
                        <Card key={index} text={item} setInput={setInput} />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          )}
          {sessionId && reply.length > 0 && (
            <div className="w-full">
              {reply.map((message, index) => {
                return (
                  <ChatBox
                    key={index}
                    message={message}
                    loading={replyLoading}
                  />
                );
              })}
            </div>
          )}
          {replyLoading && sessionId && (
            <div className="px-20 text-white">
              <Loader2 className="h-10 min-w-10 animate-spin" strokeWidth={3} />
            </div>
          )}
        </div>
      </div>
      <Input
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        replyLoading={replyLoading}
        setInput={setInput}
        stop={stop}
      />
    </div>
  );
};

export default Chat;
