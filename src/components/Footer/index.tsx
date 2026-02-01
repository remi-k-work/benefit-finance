// components
import Address, { AddressSkeleton } from "./Address";
import Shortcut, { ShortcutSkeleton } from "./Shortcut";
import Contact, { ContactSkeleton } from "./Contact";

export default function Footer() {
  return (
    <footer className="from-background via-secondary to-background mt-8 grid grid-cols-1 gap-3 bg-linear-to-b p-2 [grid-area:footer] md:grid-cols-3">
      <Address />
      <Shortcut />
      <Contact />
    </footer>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="from-background via-secondary to-background mt-8 grid grid-cols-1 gap-3 bg-linear-to-b p-2 [grid-area:footer] md:grid-cols-3">
      <AddressSkeleton />
      <ShortcutSkeleton />
      <ContactSkeleton />
    </footer>
  );
}
