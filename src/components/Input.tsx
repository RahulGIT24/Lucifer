"use client";
import { CircleStop, Loader2, Mic, MicOff, SendHorizontal } from "lucide-react";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
} from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useToast } from "./ui/use-toast";

interface inputProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  replyLoading: boolean;
  setInput: Dispatch<SetStateAction<string>>;
  stop: ()=>void;
}

const Input = ({
  handleSubmit,
  input,
  handleInputChange,
  replyLoading,
  setInput,
  stop
}: inputProps) => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const { toast } = useToast();

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  function MicAndStop(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (replyLoading) {
      stop();
      return;
    }
    if (listening) {
      SpeechRecognition.stopListening();
      return;
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      return;
    }
  }
  return (
    <div className="fixed bottom-0 w-full pb-4 flex justify-center items-center bg-transparent">
      <form
        className="w-full md:w-[60%] sm:w-[80%] lg:w-[75%] flex"
        onSubmit={(e) => {
          if (listening) {
            e.preventDefault();
            toast({
              description: "Turn off the mic first",
              variant: "destructive",
            });
            return;
          }
          handleSubmit(e);
        }}
      >
        <textarea
          id="chat-input"
          className="bg-zinc-800 w-[100%] h-20 rounded-l-3xl p-5 text-zinc-300 outline-none border border-t-zinc-700 border-l-zinc-700 border-b-zinc-700 border-r-0 shadow-2xl shadow-black overflow-y-auto resize-none z-20"
          placeholder="Enter Some Text"
          wrap="hard"
          value={input}
          onChange={(e) => {
            handleInputChange(e);
          }}
          disabled={replyLoading ? true : false}
        />
        <button
          className={`min-h-20 h-20 text-zinc-300 border shadow-2xl shadow-black border-t-zinc-700 border-b-zinc-700 border-l-0 p-5 bg-zinc-800 flex items-center justify-center ${
            input ? "border-zinc-800" : "border-r-zinc-700 rounded-r-3xl"
          }`}
          onClick={MicAndStop}
        >
          {replyLoading && !listening && <CircleStop strokeWidth={3} />}
          {!replyLoading && !listening && <Mic />}
          {listening && !replyLoading && (
            <p className="text-red-700">
              <MicOff />
            </p>
          )}
        </button>
        <button
          className={`min-h-20 h-20 text-zinc-300 border shadow-2xl shadow-black border-t-zinc-700 border-r-zinc-700 border-b-zinc-700 border-l-0 rounded-r-3xl p-5 bg-zinc-800 flex items-center justify-center transition-opacity duration-50 ease-in-out ${
            input ? "opacity-100" : "opacity-0"
          }`}
          type="submit"
        >
          <p
            className={`transition-opacity duration-300 ease-in-out ${
              input ? "animate-slideIn opacity-100" : "opacity-0"
            }`}
          >
            {replyLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal />
            )}
          </p>
        </button>
      </form>
    </div>
  );
};

export default Input;
