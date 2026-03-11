// services, features, and other libraries
import { dispose, handler } from "@/features/leads/rpc/handlers";

// types
import type { NextRequest } from "next/server";

export const POST = (request: NextRequest): Promise<Response> => handler(request);

function cleanup() {
  dispose().then(
    () => {
      process.exit(0);
    },
    () => {
      process.exit(1);
    },
  );
}

process.on("SIGINT", cleanup);
