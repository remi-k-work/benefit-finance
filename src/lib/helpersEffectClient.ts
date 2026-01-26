// services, features, and other libraries
import { Schema } from "effect";
import { createServerValidate } from "@tanstack/react-form-nextjs";

// types
import type { FormAsyncValidateOrFn } from "@tanstack/react-form-nextjs";

// A custom wrapper for createServerValidate that applies schema transformations
export const createServerValidateWithTransforms = <A, I>(DEFAULT_VALUES: A, schema: Schema.Schema<A, I>) => {
  const SERVER_VALIDATE = createServerValidate({
    defaultValues: DEFAULT_VALUES,
    onServerValidate: Schema.standardSchemaV1(schema) as FormAsyncValidateOrFn<A>,
  });

  return async (formData: FormData): Promise<A> => {
    // Validate the form on the server side (it will throw if validation fails)
    const rawValidatedData = await SERVER_VALIDATE(formData);

    // Validation has passed, return the decoded form data (ensures that schema transformations are applied)
    return Schema.decodeUnknownSync(schema)(rawValidatedData);
  };
};
