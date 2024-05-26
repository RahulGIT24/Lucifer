import { setCurrentPrompt } from "@/lib/store/features/chat/chatSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { Search } from "lucide-react";

interface CardProps {
  text: string;
}

const Card = ({ text }: CardProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="mt-24 relative p-8 border border-zinc-700 w-64 h-56 rounded-3xl bg-zinc-950 shadow-xl shadow-black hover:bg-zinc-900 cursor-pointer" onClick={()=>{dispatch(setCurrentPrompt(text))}}>
        <p className="text-white text-2xl">{text}</p>
        <div className="text-white absolute bottom-0 right-0 p-4">
            <Search/>
        </div>
    </div>
  );
};

export default Card;
