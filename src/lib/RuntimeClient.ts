// services, features, and other libraries
import { Layer, Logger, ManagedRuntime } from "effect";
import { Atom } from "@effect-atom/atom-react";
import { RpcLeadsClient } from "@/features/leads/rpc/client";
import { RpcUsersClient } from "@/features/users/rpc/client";
import { RpcSupportAgentClient } from "@/features/supportAgent/rpc/client";
import { RpcAuthClient } from "@/features/auth/rpc/client";
import { RpcDashboardClient } from "@/features/dashboard/rpc/client";
import { RpcProfileClient } from "@/features/profile/rpc/client";
import { RpcCaptchaClient } from "@/features/captcha/rpc/client";

const MainLayer = Layer.mergeAll(
  Logger.pretty,
  RpcLeadsClient.Default,
  RpcUsersClient.Default,
  RpcSupportAgentClient.Default,
  RpcAuthClient.Default,
  RpcDashboardClient.Default,
  RpcProfileClient.Default,
  RpcCaptchaClient.Default,
);

export const RuntimeClient = ManagedRuntime.make(MainLayer);
export const RuntimeAtom = Atom.runtime(MainLayer);
