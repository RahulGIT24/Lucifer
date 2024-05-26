"use client";

import { CircleStop, Loader2, Menu, Mic, SendHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setShowSidebar } from "@/lib/store/features/sidebar/sidebarSlice";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "./ui/use-toast";
import {
  setChatSessionId,
  setCurrentPrompt,
} from "@/lib/store/features/chat/chatSlice";

const Chat = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const currentPrompt = useAppSelector(
    (state) => state.chatSlice.currentPrompt
  );
  const sessionId = useAppSelector((state) => state.chatSlice.chatSessionId);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const user = session?.user;

  const toggleMenu = (e: any) => {
    e.stopPropagation();
    dispatch(setShowSidebar(true));
  };

  const chat = async () => {
    if (loading) return;
    if (!currentPrompt) {
      return;
    }
    if (sessionId) {
      dispatch(setCurrentPrompt(""));
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/chat-session", {
        name: currentPrompt,
      });
      if (response.data.success) {
        dispatch(setChatSessionId(response.data.session_id));
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
      dispatch(setCurrentPrompt(""));
      setLoading(false);
    }
  };

  const cardData = [
    "Can you generate a random quiz for me",
    "Write a python code to find factorial of a number",
    "What are the signs of cancer",
    "Explain Object Oriented Programming",
  ];

  return (
    <div className="w-full bg-transparent min-h-screen flex flex-col items-center overflow-hidden relative">
      <div className="my-4 p-3 text-zinc-300 w-full flex justify-between">
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
      {!sessionId && (
        <div className="flex items-center flex-col w-full overflow-y-auto flex-1 mb-44">
          <div className="content py-7 w-full sm:w-11/12 md:w-9/12 px-4">
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
                      return <Card key={index} text={item} />;
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 w-full pb-4 flex justify-center items-center bg-transparent">
        <div className="w-full md:w-[60%] sm:w-[80%] lg:w-[75%] flex">
          <input
            id="chat-input"
            className="bg-zinc-800 w-[100%] min-h-20 rounded-l-3xl p-5 text-zinc-300 outline-none border border-t-zinc-700 border-l-zinc-700 border-b-zinc-700 border-r-0 shadow-2xl shadow-black overflow-y-auto resize-none z-20"
            placeholder="Enter Some Text"
            value={currentPrompt}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                chat();
              }
            }}
            onChange={(e) => {
              dispatch(setCurrentPrompt(e.target.value));
            }}
          />
          <button
            className={`min-h-20 h-20 text-zinc-300 border shadow-2xl shadow-black border-t-zinc-700 border-b-zinc-700 border-l-0 p-5 bg-zinc-800 flex items-center justify-center ${
              currentPrompt
                ? "border-zinc-800"
                : "border-r-zinc-700 rounded-r-3xl"
            }`}
            onClick={() => {
              if (loading) setLoading(false);
            }}
          >
            {loading ? <CircleStop strokeWidth={3} /> : <Mic />}
          </button>
          <button
            className={`min-h-20 h-20 text-zinc-300 border shadow-2xl shadow-black border-t-zinc-700 border-r-zinc-700 border-b-zinc-700 border-l-0 rounded-r-3xl p-5 bg-zinc-800 flex items-center justify-center transition-opacity duration-50 ease-in-out ${
              currentPrompt ? "opacity-100" : "opacity-0"
            }`}
            onClick={chat}
          >
            <p
              className={`transition-opacity duration-300 ease-in-out ${
                currentPrompt ? "animate-slideIn opacity-100" : "opacity-0"
              }`}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SendHorizontal />
              )}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
