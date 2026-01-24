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
import { DEMO_USER_EMAIL, DEMO_USER_NAME, DEMO_USER_PASS } from "./constants";

async function main() {
  try {
    // Perform database seeding or other tasks
    console.log("Creating demo user...");

    // Drop the demo user and their associated stuff
    await db.delete(UserTable).where(eq(UserTable.email, DEMO_USER_EMAIL));

    const {
      user: { id: userId },
    } = await auth.api.createUser({
      body: {
        email: DEMO_USER_EMAIL,
        password: DEMO_USER_PASS,
        name: DEMO_USER_NAME,
        role: "demo",
      },
    });

    // const userId = "FPeReveq5IuaniAjnQMQFp6AFUWk8AuQ";

    console.log("Seeding complete ✅");
    process.exit(0);
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

// Execute the main function
main();
