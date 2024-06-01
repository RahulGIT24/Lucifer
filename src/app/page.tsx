import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="w-full flex flex-wrap lg:flex-nowrap">
      <div className="bg-white text-zinc-800 h-[100vh] flex justify-center items-center flex-col space-y-4 w-full lg:w-[50%] p-4">
        <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl transition-all animate-slideIn text-center lg:w-3/4">
          Welcome to Lucifer, an AI Chatbot
        </h1>
        <Image
          src={"/logo.jpeg"}
          width={500}
          height={500}
          alt="Lucifer"
          className="rounded-full transition-opacity animate-slideIn"
        />
      </div>
      <div className="bg-zinc-800 h-[100vh] w-full lg:w-[50%] flex justify-center items-center text-white flex-col space-y-8 lg:space-y-16 p-4">
        <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl transition-all animate-slideIn text-center lg:w-3/4">
          Try Lucifer, and Deep Dive into the world of AI
        </h1>
        <Link className="w-[50%] flex justify-center" href={"/sign-in"}>
          <Button className="bg-white text-zinc-800 py-5 md:py-7 hover:bg-black hover:text-white text-xl md:text-2xl transition-all animate-slideIn">
            Sign in to continue your progress
          </Button>
        </Link>
        <Link className="w-[50%] flex justify-center" href={"/sign-up"}>
          <Button className="bg-white text-zinc-800 py-5 md:py-7 hover:bg-black hover:text-white text-xl md:text-2xl transition-all animate-slideIn">
            Try me by creating your account
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
