// services, features, and other libraries
import { useStickToBottom } from "use-stick-to-bottom";

// components
import Message from "./Message";

// types
import type { useChat } from "@ai-sdk/react";
import type LangLoader from "@/lib/LangLoader";
import type { SupportAgentUIMessage } from "@/features/supportAgent/lib/agent";

interface MessagesProps {
  messages: SupportAgentUIMessage[];
  status: ReturnType<typeof useChat<SupportAgentUIMessage>>["status"];
  ll: typeof LangLoader.prototype.supportAgentModal;
}

export default function Messages({ messages, status, ll }: MessagesProps) {
  const { scrollRef, contentRef } = useStickToBottom();

  return (
    <article ref={scrollRef} className="z-1 flex max-h-full flex-col overflow-y-auto overscroll-y-contain px-3 py-6">
      <div ref={contentRef}>
        {messages.map((message) => (
          <Message key={message.id} message={message} status={status} ll={ll} />
        ))}
      </div>
    </article>
  );
}
