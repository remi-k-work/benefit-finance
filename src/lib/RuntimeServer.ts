// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { SupAgentChunkDB, SupAgentDocDB } from "@/features/supportAgent/db";
import { UsersDB } from "@/features/users/db";
import { LeadDB } from "@/features/leads/db";

// services, features, and other libraries
import { Layer, Logger, ManagedRuntime } from "effect";
import { AuthAdmin } from "@/features/auth/lib/admin";

const MainLayer = Layer.mergeAll(Logger.pretty, DB.Default, SupAgentDocDB.Default, SupAgentChunkDB.Default, UsersDB.Default, AuthAdmin.Default, LeadDB.Default);

export const RuntimeServer = ManagedRuntime.make(MainLayer);
