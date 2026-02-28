// services, features, and other libraries
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, userAc, adminAc } from "better-auth/plugins/admin/access";

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
