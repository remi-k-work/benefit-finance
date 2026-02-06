"use client";

// react
import { useCallback } from "react";

// services, features, and other libraries
import { Option } from "effect";
import { Atom, useAtom, useAtomSet } from "@effect-atom/atom-react";

// components
import SupportAgentModal from "@/features/supportAgent/components/SupportAgentModal";

// types
import type LangLoader from "@/lib/LangLoader";

interface SupportAgentModalRootProps {
  ll: typeof LangLoader.prototype.supportAgentModal;
}

// Create the atom that holds the modal state that is initially 'none' (closed)
const supportAgentModalAtom = Atom.make(Option.none<void>());

// This is the hook that components use to open the modal
export function useSupportAgentModal() {
  const setSupportAgentModal = useAtomSet(supportAgentModalAtom);

  const openSupportAgentModal = useCallback(() => {
    // Set the atom to some, which will render the modal
    setSupportAgentModal(Option.some(undefined));
  }, [setSupportAgentModal]);

  return { openSupportAgentModal };
}

// The root component that renders the modal based on the atom state
export function SupportAgentModalRoot({ ll }: SupportAgentModalRootProps) {
  const [supportAgentModal, setSupportAgentModal] = useAtom(supportAgentModalAtom);

  // Use Effect's pipe and Option.match for a functional render flow
  return supportAgentModal.pipe(
    Option.match({
      onNone: () => null,
      onSome: () => <SupportAgentModal onClosed={() => setSupportAgentModal(Option.none())} ll={ll} />,
    }),
  );
}
