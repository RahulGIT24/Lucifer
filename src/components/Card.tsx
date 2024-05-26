import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface CardProps {
  text: string;
  setCurrentPrompt:Dispatch<SetStateAction<string>>
}

const Card = ({ text,setCurrentPrompt }: CardProps) => {
  return (
    <div className="mt-24 relative p-8 border border-zinc-700 w-64 h-56 rounded-3xl bg-zinc-950 shadow-xl shadow-black hover:bg-zinc-900 cursor-pointer" onClick={()=>{setCurrentPrompt(text)}}>
        <p className="text-white text-2xl">{text}</p>
        <div className="text-white absolute bottom-0 right-0 p-4">
            <Search/>
        </div>
    </div>
  );
};

export default Card;
