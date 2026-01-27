// next
import { cookies, headers } from "next/headers";

// other libraries
import { resolveAcceptLanguage } from "resolve-accept-language";

// assets
import confirmModalEn from "@/assets/lang/confirmModal.en.json";
import confirmModalPl from "@/assets/lang/confirmModal.pl.json";
import demoModeModalEn from "@/assets/lang/demoModeModal.en.json";
import demoModeModalPl from "@/assets/lang/demoModeModal.pl.json";
import langChangerEn from "@/assets/lang/langChanger.en.json";
import langChangerPl from "@/assets/lang/langChanger.pl.json";
import navIconItemsEn from "@/assets/lang/navIconItems.en.json";
import navIconItemsPl from "@/assets/lang/navIconItems.pl.json";
import navMenuItemsEn from "@/assets/lang/navMenuItems.en.json";
import navMenuItemsPl from "@/assets/lang/navMenuItems.pl.json";
import themeChangerEn from "@/assets/lang/themeChanger.en.json";
import themeChangerPl from "@/assets/lang/themeChanger.pl.json";
import userPopoverEn from "@/assets/lang/userPopover.en.json";
import userPopoverPl from "@/assets/lang/userPopover.pl.json";

// types
export type Lang = "en" | "pl";

// constants
export const LANG_COOKIE = "lang";
export const LANG_COOKIE_MAXAGE = 2592000;

export default class LangLoader {
  public readonly prefferedLanguage;

  private constructor(prefferedLanguage: Lang) {
    // Save the just-established preferred language by the user
    this.prefferedLanguage = prefferedLanguage;
  }

  // Create a new instance of LangLoader (we use a factory method because constructors cannot be async)
  public static async create(): Promise<LangLoader> {
    return new LangLoader(await LangLoader.prefferedLanguage());
  }

  // Establish the preferred language by the user
  private static async prefferedLanguage(): Promise<Lang> {
    // Try obtaining the lang value from a local cookie
    const langCookieValue = (await cookies()).get(LANG_COOKIE)?.value;
    if (langCookieValue) {
      if (langCookieValue === "en") return "en";
      if (langCookieValue === "pl") return "pl";

      // Unrecognized language? use english by default
      return "en";
    } else {
      // Otherwise, use the client's preferred language
      const acceptLanguageHeader = (await headers()).get("Accept-Language");
      if (acceptLanguageHeader) {
        const resolvedLanguage = resolveAcceptLanguage(acceptLanguageHeader, ["en-US", "en-GB", "pl-PL"], "en-US");
        return resolvedLanguage.includes("en") ? "en" : "pl";
      }

      // Unrecognized language? use english by default
      return "en";
    }
  }

  // Localized content accessors are designed for the preferred language and optimized to pass specific chunks from the server components as props
  public get confirmModal() {
    return this.prefferedLanguage === "pl" ? confirmModalPl : confirmModalEn;
  }
  public get demoModeModal() {
    return this.prefferedLanguage === "pl" ? demoModeModalPl : demoModeModalEn;
  }
  public get langChanger() {
    return this.prefferedLanguage === "pl" ? langChangerPl : langChangerEn;
  }
  public get navIconItems() {
    return this.prefferedLanguage === "pl" ? navIconItemsPl : navIconItemsEn;
  }
  public get navMenuItems() {
    return this.prefferedLanguage === "pl" ? navMenuItemsPl : navMenuItemsEn;
  }
  public get themeChanger() {
    return this.prefferedLanguage === "pl" ? themeChangerPl : themeChangerEn;
  }
  public get userPopover() {
    return this.prefferedLanguage === "pl" ? userPopoverPl : userPopoverEn;
  }
}
