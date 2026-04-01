// drizzle and db access
import { serviceOfInterestEnum } from "@/drizzle/schema/lead";

// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

export const ServiceOfInterestField = Field.makeField("serviceOfInterest", Schema.Literal(...serviceOfInterestEnum.enumValues));
