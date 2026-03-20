// services, features, and other libraries
import { identity, Schema } from "effect";

export const FlexibleSelectSchema = (enumValues: string[], defaultValue: string) =>
  Schema.transform(Schema.Union(Schema.Literal(...enumValues), Schema.Literal(""), Schema.Undefined, Schema.Null), Schema.Literal(...enumValues), {
    decode: (i) => {
      if (i === "" || i === undefined || i === null) return defaultValue;
      return i;
    },
    encode: identity,
  });
