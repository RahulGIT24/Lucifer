"use client";

import { Menu, Mic, SendHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Chat = () => {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="md:w-4/5 sm:w-[100%] w-full bg-transparent min-h-screen relative">
      <div className="my-4 p-3 text-zinc-300 w-full flex justify-between">
        <div className="flex items-center">
          <span className="cursor-pointer md:hidden lg:hidden sm:block">
            <Menu />
          </span>
          <h1 className="text-2xl font-medium pl-3">Gemini</h1>
        </div>
        <img
          src={user?.profilePic}
          alt="profile-picture"
          className="w-[2rem] rounded-full"
          title={`Hi ${user?.name}`}
        />
      </div>
      <div className="content"></div>
      <div className="input absolute bottom-0 pb-12 flex justify-center items-center w-full">
        <textarea
          id="chat-input"
          className="bg-transparent min-w-2/3 w-2/3 min-h-20 h-20 rounded-l-3xl p-5 text-zinc-300 outline-none border border-t-zinc-700 border-l-zinc-700 border-b-zinc-700 border-r-0 shadow-2xl shadow-black overflow-y-auto resize-none z-20"
          placeholder="Enter Some Text"
          value={currentPrompt}
          onChange={(e) => {
            setCurrentPrompt(e.target.value);
          }}
        ></textarea>
        <button
          className={`min-h-20 h-20 text-zinc-300 border shadow-2xl shadow-black border-t-zinc-700 border-b-zinc-700 border-l-0 p-5 bg-transparent flex items-center justify-center ${
            currentPrompt
              ? "border-transparent"
              : "border-r-zinc-700 rounded-r-3xl"
          }`}
        >
          <Mic />
        </button>
        <button
          className={`min-h-20 h-20 text-zinc-300 border shadow-2xl shadow-black border-t-zinc-700 border-r-zinc-700 border-b-zinc-700 border-l-0 rounded-r-3xl p-5 bg-transparent flex items-center justify-center transition-opacity duration-50 ease-in-out ${
            currentPrompt ? "opacity-100" : "opacity-0"
          }`}
        >
          <p
            className={`transition-opacity duration-300 ease-in-out ${
              currentPrompt ? "animate-slideIn opacity-100" : "opacity-0"
            }`}
          >
            <SendHorizontal />
          </p>
        </button>
      </div>
    </div>
  );
};

export default Chat;
