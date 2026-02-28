// services, features, and other libraries
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, userAc, adminAc } from "better-auth/plugins/admin/access";

// RESOURCES (the nouns): the "things" in the system (leads, supportAgent, users, projects, invoices, etc.)
// ACTIONS (the verbs): what you can do to those "things" (create, read, update, delete, etc.)
const statements = {
  ...defaultStatements,
  leads: ["create", "read", "update", "delete"],
  supportAgent: ["create", "read", "update", "delete"],
  users: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statements);

export const user = ac.newRole({
  leads: ["create", "read"],
  supportAgent: ["read"],
  users: ["read"],
  ...userAc.statements,
});

export const admin = ac.newRole({
  leads: ["create", "read", "update", "delete"],
  supportAgent: ["create", "read", "update", "delete"],
  users: ["create", "read", "update", "delete"],
  ...adminAc.statements,
});

export const demo = ac.newRole({
  leads: ["read"],
  supportAgent: ["read"],
  users: ["read"],
});
