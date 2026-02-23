// drizzle and db access
import type { AllUsersWithSessions } from "@/features/users/db";

// services, features, and other libraries
import { useInstanceContext } from "@/features/users/components/UsersWithSessionsTable/context";

// components
import Account from "./Account";

// types
interface AccountsProps {
  userWithSessions: AllUsersWithSessions;
}

export default function Accounts({ userWithSessions: { accounts } }: AccountsProps) {
  // Access the table context and retrieve all necessary information
  const { ll } = useInstanceContext();

  return (
    <>
      <h2 className="from-background via-card to-background max-w-none bg-linear-to-b from-15% to-85% p-3 uppercase">
        {ll["Accounts"]}
        &nbsp;({accounts.length})
      </h2>
      <article className="flex gap-6 overflow-x-auto">
        {accounts.map((account) => (
          <Account key={account.id} account={account} />
        ))}
      </article>
    </>
  );
}
