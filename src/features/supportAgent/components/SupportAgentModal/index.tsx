"use client";

// react
import { useEffect, useRef, useState } from "react";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "motion/react";

// components
import Header from "./Header";
import Messages from "./Messages";
import Footer from "./Footer";

// types
import type { ComponentPropsWithoutRef } from "react";
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface SupportAgentModalProps extends ComponentPropsWithoutRef<"dialog"> {
  onClosed: () => void;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.supportAgentModal;
}

// constants
import { INITIAL_MESSAGE_EN, INITIAL_MESSAGE_PL } from "@/features/supportAgent/constants/messages";

export default function SupportAgentModal({ onClosed, preferredLanguage, ll, className, ...props }: SupportAgentModalProps) {
  // To be able to call showModal() method on the dialog
  const dialogRef = useRef<HTMLDialogElement>(null);

  // This allows AnimatePresence to detect when the component should exit
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Show the dialog as a modal
    dialogRef.current?.showModal();
  }, []);

  const { messages, sendMessage, status } = useChat({ messages: preferredLanguage === "en" ? INITIAL_MESSAGE_EN : INITIAL_MESSAGE_PL });

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "text-foreground fixed inset-0 z-50 grid size-full max-h-none max-w-none place-items-center overflow-hidden overscroll-contain bg-transparent transition-all transition-discrete duration-1000 ease-in-out",
        "not-open:pointer-events-none not-open:invisible not-open:opacity-0 open:pointer-events-auto open:visible open:opacity-100 focus-visible:outline-none",
        "backdrop:backdrop-blur-xl backdrop:[transition:backdrop-filter_1s_ease]",
        className,
      )}
      // When the dialog is actually closed (by .close() or ESC), it calls the parent's onClosed handler
      onClose={onClosed}
      onCancel={(ev) => {
        ev.preventDefault();
        setIsOpen(false);
      }}
      {...props}
    >
      {/* The onExitComplete callback is crucial. It calls dialog.close() ONLY after the exit animation is done */}
      <AnimatePresence onExitComplete={() => dialogRef.current?.close()}>
        {isOpen && (
          <motion.div
            className="bg-background grid max-h-[min(95dvb,100%)] max-w-[min(96ch,100%)] grid-rows-[auto_1fr_auto] items-start overflow-hidden"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
          >
            <Header onClosed={() => setIsOpen(false)} ll={ll} />
            <Messages messages={messages} status={status} />
            <Footer sendMessage={sendMessage} status={status} ll={ll} />
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
