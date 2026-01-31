// next
import { notFound } from "next/navigation";

// Next.js does not automatically render "not-found.tsx" unless we explicitly call notFound()
export default function Page() {
  // So we add a catch-all route that handles all unmatched paths and calls notFound()
  notFound();
}
