// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { SupAgentChunkDB, SupAgentDocDB } from "@/features/supportAgent/db";
import { UsersDB } from "@/features/manager/users/db";

// services, features, and other libraries
import { Layer, Logger, ManagedRuntime } from "effect";

const MainLayer = Layer.mergeAll(Logger.pretty, DB.Default, SupAgentDocDB.Default, SupAgentChunkDB.Default, UsersDB.Default);

export const RuntimeServer = ManagedRuntime.make(MainLayer);
