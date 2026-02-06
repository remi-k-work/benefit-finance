// services, features, and other libraries
import { Data } from "effect";

// Define a domain error for the ai sdk
export class AiSdkError extends Data.TaggedError("AiSdkError")<{ readonly message: string; readonly cause?: unknown }> {}

// Define a domain error for the unauthorized access
export class UnauthorizedAccessError extends Data.TaggedError("UnauthorizedAccessError")<{ readonly message: string; readonly cause?: unknown }> {}

// Define a domain error for invalid page inputs and situations where an item is not found
export class InvalidPageInputsError extends Data.TaggedError("InvalidPageInputsError")<{ readonly message: string; readonly cause?: unknown }> {}
export class ItemNotFoundError extends Data.TaggedError("ItemNotFoundError")<{ readonly message: string; readonly cause?: unknown }> {}
