// components
import { Message as AIEMessage, MessageContent, MessageResponse } from "@/components/ai-elements/custom/message";
import { UserAvatarSkeleton } from "@/components/Avatar/User";
import AgentAvatar from "@/components/Avatar/Agent";

// types
import type { UIMessage, useChat } from "@ai-sdk/react";

interface MessageProps {
  message: UIMessage;
  status: ReturnType<typeof useChat>["status"];
}

export default function Message({ message: { id, role, parts }, status }: MessageProps) {
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
                <p key={toolCallId} className="animate-pulse italic">
                  Please wait while we fetch information from our knowledge base...
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
