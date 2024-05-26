"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";

const Sidebar = () => {
  const [isLogout, setisLogout] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const user = session?.user;

  const showSideBar = useAppSelector((state) => state.sidebarSlice.showSideBar);

  const logout = async () => {
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

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-zinc-950 transition-transform duration-300 ease-in-out lg:w-1/5 transform md:relative md:translate-x-0 md:w-2/5 ${
        showSideBar ? "w-[50%] animate-slideIn" : "w-0"
      } z-50`}
    >
      <div className="relative min-h-screen flex flex-col justify-end">
        {user && (
          <Button
            variant="destructive"
            disabled={isLogout}
            className={`${
              showSideBar ? "block" : "hidden"
            } md:block rounded-none flex justify-center items-center`}
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
