// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

export const MessageField = (preferredLanguage: Lang = "en") =>
  preferredLanguage === "en"
    ? Field.makeField(
        "message",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "What is the message you want to send? This is a mandatory field" }),
          Schema.maxLength(2048, { message: () => "Please keep the message to a maximum of 2048 characters" }),
        ),
      )
    : Field.makeField(
        "message",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Jaką wiadomość chcesz wysłać? Jest to pole obowiązkowe" }),
          Schema.maxLength(2048, { message: () => "Wiadomość nie może mieć więcej niż 2048 znaków" }),
        ),
      );
