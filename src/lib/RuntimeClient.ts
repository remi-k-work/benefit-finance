// services, features, and other libraries
import { Layer, Logger, ManagedRuntime } from "effect";
import { RpcLeadsClient } from "@/features/leads/rpc/client";

const MainLayer = Layer.mergeAll(Logger.pretty, RpcLeadsClient.Default);

export const RuntimeClient = ManagedRuntime.make(MainLayer);
