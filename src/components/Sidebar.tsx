"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Loader2, Plus, Timer, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setChatSessionId,
  setMessages,
} from "@/lib/store/features/chat/chatSlice";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { IChatSession } from "../models/ChatModel";
import { setShowSidebar } from "@/lib/store/features/sidebar/sidebarSlice";

const Sidebar = () => {
  const [isLogout, setisLogout] = useState(false);
  const [sessions, setSessions] = useState<IChatSession[]>([]);
  const { toast } = useToast();
  const { data: session } = useSession();
  const user = session?.user;

  const showSideBar = useAppSelector((state) => state.sidebarSlice.showSideBar);
  const dispatch = useAppDispatch();
  const chatSessionId = useAppSelector(
    (state) => state.chatSlice.chatSessionId
  );

  const newChat = () => {
    dispatch(setChatSessionId(null));
    dispatch(setShowSidebar(false));
    dispatch(setMessages([]));
  };

  const getUserChatSessions = async () => {
    try {
      const response = await axios.get("/api/chat-session");
      setSessions(response.data.session);
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

  useEffect(() => {
    getUserChatSessions();
  }, [chatSessionId]);

  const logout = async () => {
    dispatch(setShowSidebar(false));
    try {
      setisLogout(true);
      await signOut();
      toast({
        description: "Signed Out Successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        description: "Error while signing out",
        variant: "destructive",
      });
    } finally {
      setisLogout(false);
    }
  };

  const onDeleteSession = async () => {
    try {
      const res = await axios.delete("/api/delete-session", {
        data: { session_id: chatSessionId as string },
      });
      await getUserChatSessions();
      newChat();
      toast({
        title: "Deleted",
        description: res.data.message,
        variant: "default",
      });
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

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-zinc-950 transition-transform duration-300 ease-in-out transform ${
        showSideBar ? "translate-x-0 w-[70%]" : "-translate-x-full"
      } sm:w-1/3 sm:relative sm:translate-x-0 sm:block lg:w-1/5 z-50`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h1 className="text-xl font-medium p-5 text-zinc-300 flex items-center text-center justify-center">
        Your Activities <Timer className="mx-2" />
      </h1>
      <div className="sm:block lg:block md:block">
        {user && (
          <Button
            variant="secondary"
            className="w-full rounded-none"
            onClick={newChat}
          >
            <Plus />
            New Chat
          </Button>
        )}
      </div>
      <div
        className="h-[75%] overflow-y-auto overflow-x-hidden text-zinc-300 w-full mt-3 px-2"
        id="sessions"
      >
        {sessions &&
          sessions.map((session) => (
            <div className="flex items-center">
              <p
                key={session._id}
                className={`whitespace-nowrap overflow-hidden text-ellipsis my-3 text-lg hover:bg-zinc-600 w-full cursor-pointer py-3 ${
                  chatSessionId === session._id
                    ? "bg-zinc-600"
                    : "bg-transparent"
                } rounded-full px-3`}
                onClick={() => {
                  dispatch(setShowSidebar(false));
                  dispatch(setChatSessionId(session._id));
                }}
              >
                {session.title}
              </p>
              <button
                className={`px-2 ${
                  chatSessionId === session._id ? "block" : "hidden"
                }`}
                onClick={onDeleteSession}
              >
                <Trash />
              </button>
            </div>
          ))}
      </div>

      <div className="absolute bottom-0 flex flex-col justify-end w-full">
        {user && (
          <Button
            variant="destructive"
            disabled={isLogout}
            className="w-full rounded-none flex justify-center items-center"
            onClick={logout}
          >
            {isLogout ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign Out"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
