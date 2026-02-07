"use client";

// services, features, and other libraries
import { useSupportAgentModal } from "@/atoms/supportAgentModal";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

// types
import type LangLoader from "@/lib/LangLoader";

interface SupportAgentProps {
  ll: typeof LangLoader.prototype.supportAgent;
}

export default function SupportAgent({ ll }: SupportAgentProps) {
  // This is the hook that components use to open the modal
  const { openSupportAgentModal } = useSupportAgentModal();

  return (
    <Button type="button" size="icon" variant="ghost" title={ll["Support Agent"]} onClick={openSupportAgentModal}>
      <ChatBubbleLeftRightIcon className="size-11" />
    </Button>
  );
}

export function SupportAgentSkeleton() {
  return (
    <Button type="button" size="icon" variant="ghost" title="Support Agent" disabled>
      <ChatBubbleLeftRightIcon className="size-11" />
    </Button>
  );
}
