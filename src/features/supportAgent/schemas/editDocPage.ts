// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { BasePageParamsSchema, BasePageSchema } from "@/schemas/basePage";

const EditDocPageParams = Schema.Struct({
  id: Schema.UUID,
}).pipe(Schema.extend(BasePageParamsSchema));

export const EditDocPageSchema = Schema.Struct({
  params: EditDocPageParams,
  searchParams: BasePageSchema.fields.searchParams,
});
