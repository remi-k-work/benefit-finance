// drizzle and db access
import { DB } from "@/drizzle/dbEffect";

// services, features, and other libraries
import { Layer, Logger, ManagedRuntime } from "effect";

const MainLayer = Layer.mergeAll(Logger.pretty, DB.Default);

export const RuntimeServer = ManagedRuntime.make(MainLayer);
