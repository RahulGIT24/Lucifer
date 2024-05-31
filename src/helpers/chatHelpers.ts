import { marked } from 'marked';
import DOMPurify from 'dompurify';

// fix this function
export const speak = (text: string, speaking: boolean,setSpeaking:React.Dispatch<React.SetStateAction<boolean>>) => {
  if (!text) return;
  setSpeaking(false);
  if (speaking) {
    window.speechSynthesis.cancel();
    return;
  }
  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  setTimeout(() => {
    window.speechSynthesis.speak(msg);
    setSpeaking(true)
  }, 500);
};

export const stopSpeech = () => {
  window.speechSynthesis.cancel();
};

export const copy = (text: string) => {
  if (!text) return;
  navigator.clipboard.writeText(text);
  return true;
};

export const MarkdownToHtml = ({ markdown }:{markdown:string}) => {
  // Convert Markdown to HTML
  const rawHtml= marked(markdown);
  // Sanitize the HTML
  const sanitizedHtml = DOMPurify.sanitize(rawHtml as string);
  return sanitizedHtml;
};

