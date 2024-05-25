"use client";

import { Menu, Mic, SendHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Card from "./Card";

const Chat = () => {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const { data: session } = useSession();
  const user = session?.user;

  const toggleMenu = () => {};

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
          <h1 className="text-2xl font-medium pl-5">Gemini</h1>
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
                  <Card text="Can you generate a random quiz for me" />
                  <Card text="Can you generate a random quiz for me" />
                  <Card text="Can you generate a random quiz for me" />
                  <Card text="Can you generate a random quiz for me" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full pb-4 flex justify-center items-center bg-transparent">
        <div className="w-full sm:w-[80%] lg:w-[75%] flex">
          <textarea
            id="chat-input"
            className="bg-zinc-800 w-full min-h-20 h-20 rounded-l-3xl p-5 text-zinc-300 outline-none border border-t-zinc-700 border-l-zinc-700 border-b-zinc-700 border-r-0 shadow-2xl shadow-black overflow-y-auto resize-none z-20"
            placeholder="Enter Some Text"
            value={currentPrompt}
            onChange={(e) => {
              setCurrentPrompt(e.target.value);
            }}
          ></textarea>
          <button
            className={`min-h-20 h-20 text-zinc-300 border shadow-2xl shadow-black border-t-zinc-700 border-b-zinc-700 border-l-0 p-5 bg-zinc-800 flex items-center justify-center ${
              currentPrompt
                ? "border-zinc-800"
                : "border-r-zinc-700 rounded-r-3xl"
            }`}
          >
            <Mic />
          </button>
          <button
            className={`min-h-20 h-20 text-zinc-300 border shadow-2xl shadow-black border-t-zinc-700 border-r-zinc-700 border-b-zinc-700 border-l-0 rounded-r-3xl p-5 bg-zinc-800 flex items-center justify-center transition-opacity duration-50 ease-in-out ${
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
    </div>
  );
};

export default Chat;
