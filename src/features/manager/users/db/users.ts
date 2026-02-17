// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { desc, gt } from "drizzle-orm";

// services, features, and other libraries
import { Effect } from "effect";
import { UAParser } from "ua-parser-js";

// all table definitions (their schemas)
import { SessionTable, UserTable } from "@/drizzle/schema";

// types
export type AllUsersWithSessions = Effect.Effect.Success<typeof UsersDB.prototype.allUsersWithSessions>[number];

export class UsersDB extends Effect.Service<UsersDB>()("UsersDB", {
  dependencies: [DB.Default],

  effect: Effect.gen(function* () {
    const { execute } = yield* DB;

    // Get all users with their corresponding sessions and accounts (used by the tanstack table)
    const allUsersWithSessions = Effect.gen(function* () {
      const usersWithSessions = yield* execute((dbOrTx) =>
        dbOrTx.query.UserTable.findMany({
          orderBy: desc(UserTable.createdAt),

          // Only fetch sessions that expire in the future (active sessions)
          // with: { sessions: { where: gt(SessionTable.expiresAt, new Date()) }, accounts: true },
          with: { sessions: true, accounts: true },
        }),
      );

      // Parse the user agent string for every active session
      return usersWithSessions.map((user) => {
        const sessions = user.sessions.map((session) => {
          const uaParser = new UAParser(session.userAgent ?? undefined);
          const { browser, os, device } = uaParser.getResult();

          // Add the new parsed data to each session
          return { ...session, browser: browser.name, os: os.name, device: device.type };
        });

        return { ...user, sessions };
      });
    });

    return { allUsersWithSessions } as const;
  }),
}) {}
