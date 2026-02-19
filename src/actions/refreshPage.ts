"use server";

// next
import { refresh } from "next/cache";

// Refresh the current page to show the latest data
export default async function refreshPage() {
  refresh();
}
