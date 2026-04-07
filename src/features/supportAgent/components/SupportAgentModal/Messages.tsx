// services, features, and other libraries
import { useStickToBottom } from "use-stick-to-bottom";

// components
import Message from "./Message";
import { Button } from "@/components/ui/custom/button";

// assets
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

// types
import type { useChat } from "@ai-sdk/react";
import type LangLoader from "@/lib/LangLoader";
import type { SupportAgentUIMessage } from "@/features/supportAgent/lib/agent";

interface MessagesProps {
  messages: SupportAgentUIMessage[];
  status: ReturnType<typeof useChat<SupportAgentUIMessage>>["status"];
  error: ReturnType<typeof useChat<SupportAgentUIMessage>>["error"];
  regenerate: ReturnType<typeof useChat<SupportAgentUIMessage>>["regenerate"];
  ll: typeof LangLoader.prototype.supportAgent;
}

export default function Messages({ messages, status, error, regenerate, ll }: MessagesProps) {
  const { scrollRef, contentRef } = useStickToBottom();

  return (
    <article ref={scrollRef} className="z-1 flex max-h-full flex-col overflow-y-auto overscroll-y-contain px-3 py-6">
      <div ref={contentRef}>
        {messages.map((message) => (
          <Message key={message.id} message={message} status={status} ll={ll} />
        ))}

        {error && (
          <section className="text-destructive-foreground bg-destructive border-input flex items-center gap-2 border px-3 py-2">
            <ExclamationTriangleIcon className="size-11 flex-none" />
            <p className="flex-1">{ll["Our support agents are currently overwhelmed or out of office. Please try again later."]}</p>
            <Button
              type="button"
              size="icon"
              disabled={!(status === "ready" || status === "error")}
              title={ll["Try Again"]}
              onClick={() => regenerate()}
              className="flex-none"
            >
              <ArrowPathIcon className="size-9" />
            </Button>
          </section>
        )}
      </div>
    </article>
  );
}
