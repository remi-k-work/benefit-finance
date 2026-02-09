// components
import { Message as AIEMessage, MessageContent, MessageResponse } from "@/components/ai-elements/custom/message";
import { UserAvatarSkeleton } from "@/components/Avatar/User";
import AgentAvatar from "@/components/Avatar/Agent";

// types
import type { useChat } from "@ai-sdk/react";
import type LangLoader from "@/lib/LangLoader";
import type { SupportAgentUIMessage } from "@/features/supportAgent/lib/agent";

interface MessageProps {
  message: SupportAgentUIMessage;
  status: ReturnType<typeof useChat<SupportAgentUIMessage>>["status"];
  ll: typeof LangLoader.prototype.supportAgentModal;
}

export default function Message({ message: { id, role, parts }, status, ll }: MessageProps) {
  return (
    <AIEMessage from={role}>
      <MessageContent>
        {parts.map((part, index) => {
          switch (part.type) {
            // Render text parts as markdown
            case "text":
              return (
                <MessageResponse key={`${id}-${index}`} isAnimating={status === "streaming"}>
                  {part.text}
                </MessageResponse>
              );

            // For tool parts, use the typed tool part names
            case "tool-getInformation":
              const { toolCallId } = part;

              return (
                <p key={toolCallId} className="italic">
                  {ll["Please wait while we fetch information from our knowledge base..."]}
                </p>
              );

            default:
              return null;
          }
        })}
      </MessageContent>
      {role === "user" ? <UserAvatarSkeleton isSmall /> : <AgentAvatar isSmall />}
    </AIEMessage>
  );
}
