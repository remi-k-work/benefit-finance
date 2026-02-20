// Load environment variables
import "dotenv/config";

// drizzle and db access
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";

// all table definitions (their schemas)
import { UserTable } from "@/drizzle/schema";

// services, features, and other libraries
import { auth } from "@/services/better-auth/auth";

// constants
import { USERS } from "./constants";

async function main() {
  try {
    console.log("Seeding users...");

    for (const { email, password, name, role } of USERS) {
      console.log(`Creating ${role} user: ${email}`);

      // Delete existing user (if exists)
      await db.delete(UserTable).where(eq(UserTable.email, email));

      // Create user
      await auth.api.createUser({ body: { email, password, name, role } });
    }

    console.log("Seeding complete ✅");
    process.exit(0);
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

// Execute the main function
main();
