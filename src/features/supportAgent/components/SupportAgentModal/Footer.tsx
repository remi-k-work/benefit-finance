// react
import { useState } from "react";

// components
import { Textarea } from "@/components/ui/custom/textarea";
import { Button } from "@/components/ui/custom/button";

// assets
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// types
import type { useChat } from "@ai-sdk/react";
import type { INITIAL_MESSAGE } from "@/features/supportAgent/constants/messages";
import type LangLoader from "@/lib/LangLoader";

interface FooterProps {
  sendMessage: ReturnType<typeof useChat>["sendMessage"] & Omit<typeof INITIAL_MESSAGE, "id" | "role">;
  status: ReturnType<typeof useChat>["status"];
  ll: typeof LangLoader.prototype.supportAgentModal;
}

export default function Footer({ sendMessage, status, ll }: FooterProps) {
  const [input, setInput] = useState("");

  // Is the user's input valid?
  const isInputValid = input.trim().length > 0;

  return (
    <footer className="flex gap-3 border-t p-3">
      <Textarea
        value={input}
        onChange={(ev) => setInput(ev.target.value)}
        disabled={status !== "ready"}
        cols={50}
        rows={4}
        maxLength={1024}
        spellCheck={false}
        autoComplete="off"
        placeholder={ll["How can we help you today?"]}
      />
      <Button
        type="button"
        size="icon"
        disabled={!isInputValid || status !== "ready"}
        title={ll["Send Message"]}
        onClick={() => {
          sendMessage({ text: input.trim() });
          setInput("");
        }}
      >
        {status === "submitted" || status === "streaming" ? <Loader2 className="size-11 animate-spin" /> : <PaperAirplaneIcon className="size-11" />}
      </Button>
    </footer>
  );
}
