"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

const Sidebar = () => {
  const [isLogout, setisLogout] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const user = session?.user;

  const logout = async() => {
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
    <div className="md:w-1/5 sm:w-0 bg-zinc-950 min-h-screen overflow-y-auto relative">
      <div>
        {user && (
          <Button
            variant="destructive"
            disabled={isLogout}
            className="w-full rounded-none absolute bottom-0"
            onClick={() => {
              logout();
            }}
          >
            {
                isLogout ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Out"
            }
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
