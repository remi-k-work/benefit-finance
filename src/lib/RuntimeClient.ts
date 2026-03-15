// services, features, and other libraries
import { Layer, Logger, ManagedRuntime } from "effect";
import { RpcLeadsClient } from "@/features/leads/rpc/client";
import { RpcUsersClient } from "@/features/users/rpc/client";

const MainLayer = Layer.mergeAll(Logger.pretty, RpcLeadsClient.Default, RpcUsersClient.Default);

export const RuntimeClient = ManagedRuntime.make(MainLayer);
