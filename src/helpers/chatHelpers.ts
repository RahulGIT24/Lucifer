import { marked } from "marked";
import DOMPurify from "dompurify";
import { ISpeak } from "@/components/ChatBox";

// fix this function
export const speak = (
  text: string,
  speaking: ISpeak | undefined,
  setSpeaking: React.Dispatch<React.SetStateAction<ISpeak | undefined>>,
  id: string
) => {
  if (!text) return;

  if (speaking && !speaking.isSpeaking) {
    window.speechSynthesis.cancel();
  }

  if (speaking && speaking.isSpeaking) {
    window.speechSynthesis.cancel();
    setSpeaking(undefined);
    return;
  }

  const msg = new SpeechSynthesisUtterance();
  msg.lang = "en-US";

  msg.onstart = () => {
    setSpeaking({ isSpeaking: true, messageId: id });
  };

  msg.onend = () => {
    setSpeaking(undefined);
  };

  msg.onerror = () => {
    setSpeaking(undefined);
  };

  msg.text = text;

  setTimeout(() => {
    window.speechSynthesis.speak(msg);
  }, 1000);
};

export const copy = (id: string) => {
  if (!id) return;
  const text = document.getElementById(id)?.textContent;
  if (text) {
    navigator.clipboard.writeText(text);
    return true;
  }
};

export const MarkdownToHtml = ({ markdown }: { markdown: string }) => {
  // Convert Markdown to HTML
  const rawHtml = marked(markdown);
  // Sanitize the HTML
  const sanitizedHtml = DOMPurify.sanitize(rawHtml as string);
  return sanitizedHtml;
};
