// services, features, and other libraries
import { identity, Schema } from "effect";

export const FlexibleStringSchema = Schema.transform(Schema.Union(Schema.String, Schema.Undefined, Schema.Null), Schema.String, {
  decode: (i) => (i ?? "").trim(),
  encode: identity,
});
