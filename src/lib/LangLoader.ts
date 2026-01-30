// next
import { cookies, headers } from "next/headers";

// services, features, and other libraries
import { Effect } from "effect";
import { resolveAcceptLanguage } from "resolve-accept-language";

// assets
import confirmModalEn from "@/assets/lang/confirmModal.en.json";
import confirmModalPl from "@/assets/lang/confirmModal.pl.json";
import couplesPageEn from "@/assets/lang/couplesPage.en.json";
import couplesPagePl from "@/assets/lang/couplesPage.pl.json";
import dashboardPageEn from "@/assets/lang/dashboardPage.en.json";
import dashboardPagePl from "@/assets/lang/dashboardPage.pl.json";
import deleteAvatarEn from "@/assets/lang/deleteAvatar.en.json";
import deleteAvatarPl from "@/assets/lang/deleteAvatar.pl.json";
import deleteAvatarFeedbackEn from "@/assets/lang/deleteAvatarFeedback.en.json";
import deleteAvatarFeedbackPl from "@/assets/lang/deleteAvatarFeedback.pl.json";
import demoModeModalEn from "@/assets/lang/demoModeModal.en.json";
import demoModeModalPl from "@/assets/lang/demoModeModal.pl.json";
import emailApprovedPageEn from "@/assets/lang/emailApprovedPage.en.json";
import emailApprovedPagePl from "@/assets/lang/emailApprovedPage.pl.json";
import emailChangeFormEn from "@/assets/lang/emailChangeForm.en.json";
import emailChangeFormPl from "@/assets/lang/emailChangeForm.pl.json";
import emailChangeFormFeedbackEn from "@/assets/lang/emailChangeFormFeedback.en.json";
import emailChangeFormFeedbackPl from "@/assets/lang/emailChangeFormFeedback.pl.json";
import emailVerifiedPageEn from "@/assets/lang/emailVerifiedPage.en.json";
import emailVerifiedPagePl from "@/assets/lang/emailVerifiedPage.pl.json";
import estatePlanningPageEn from "@/assets/lang/estatePlanningPage.en.json";
import estatePlanningPagePl from "@/assets/lang/estatePlanningPage.pl.json";
import forecastingPageEn from "@/assets/lang/forecastingPage.en.json";
import forecastingPagePl from "@/assets/lang/forecastingPage.pl.json";
import forEmployersPageEn from "@/assets/lang/forEmployersPage.en.json";
import forEmployersPagePl from "@/assets/lang/forEmployersPage.pl.json";
import forgotPassFormEn from "@/assets/lang/forgotPassForm.en.json";
import forgotPassFormPl from "@/assets/lang/forgotPassForm.pl.json";
import forgotPassFormFeedbackEn from "@/assets/lang/forgotPassFormFeedback.en.json";
import forgotPassFormFeedbackPl from "@/assets/lang/forgotPassFormFeedback.pl.json";
import forgotPasswordPageEn from "@/assets/lang/forgotPasswordPage.en.json";
import forgotPasswordPagePl from "@/assets/lang/forgotPasswordPage.pl.json";
import formToastFeedbackEn from "@/assets/lang/formToastFeedback.en.json";
import formToastFeedbackPl from "@/assets/lang/formToastFeedback.pl.json";
import homePageEn from "@/assets/lang/homePage.en.json";
import homePagePl from "@/assets/lang/homePage.pl.json";
import investingPageEn from "@/assets/lang/investingPage.en.json";
import investingPagePl from "@/assets/lang/investingPage.pl.json";
import langChangerEn from "@/assets/lang/langChanger.en.json";
import langChangerPl from "@/assets/lang/langChanger.pl.json";
import navIconItemsEn from "@/assets/lang/navIconItems.en.json";
import navIconItemsPl from "@/assets/lang/navIconItems.pl.json";
import navMenuItemsEn from "@/assets/lang/navMenuItems.en.json";
import navMenuItemsPl from "@/assets/lang/navMenuItems.pl.json";
import notFoundPageEn from "@/assets/lang/notFoundPage.en.json";
import notFoundPagePl from "@/assets/lang/notFoundPage.pl.json";
import passChangeFormEn from "@/assets/lang/passChangeForm.en.json";
import passChangeFormPl from "@/assets/lang/passChangeForm.pl.json";
import passChangeFormFeedbackEn from "@/assets/lang/passChangeFormFeedback.en.json";
import passChangeFormFeedbackPl from "@/assets/lang/passChangeFormFeedback.pl.json";
import profileDetailsFormEn from "@/assets/lang/profileDetailsForm.en.json";
import profileDetailsFormPl from "@/assets/lang/profileDetailsForm.pl.json";
import profileDetailsFormFeedbackEn from "@/assets/lang/profileDetailsFormFeedback.en.json";
import profileDetailsFormFeedbackPl from "@/assets/lang/profileDetailsFormFeedback.pl.json";
import profileInfoEn from "@/assets/lang/profileInfo.en.json";
import profileInfoPl from "@/assets/lang/profileInfo.pl.json";
import profilePageEn from "@/assets/lang/profilePage.en.json";
import profilePagePl from "@/assets/lang/profilePage.pl.json";
import resetPassFormEn from "@/assets/lang/resetPassForm.en.json";
import resetPassFormPl from "@/assets/lang/resetPassForm.pl.json";
import resetPassFormFeedbackEn from "@/assets/lang/resetPassFormFeedback.en.json";
import resetPassFormFeedbackPl from "@/assets/lang/resetPassFormFeedback.pl.json";
import resetPasswordPageEn from "@/assets/lang/resetPasswordPage.en.json";
import resetPasswordPagePl from "@/assets/lang/resetPasswordPage.pl.json";
import resourcesPageEn from "@/assets/lang/resourcesPage.en.json";
import resourcesPagePl from "@/assets/lang/resourcesPage.pl.json";
import signInDemoEn from "@/assets/lang/signInDemo.en.json";
import signInDemoPl from "@/assets/lang/signInDemo.pl.json";
import signInDemoUserEn from "@/assets/lang/signInDemoUser.en.json";
import signInDemoUserPl from "@/assets/lang/signInDemoUser.pl.json";
import signInFormEn from "@/assets/lang/signInForm.en.json";
import signInFormPl from "@/assets/lang/signInForm.pl.json";
import signInFormFeedbackEn from "@/assets/lang/signInFormFeedback.en.json";
import signInFormFeedbackPl from "@/assets/lang/signInFormFeedback.pl.json";
import signInPageEn from "@/assets/lang/signInPage.en.json";
import signInPagePl from "@/assets/lang/signInPage.pl.json";
import signInSocialEn from "@/assets/lang/signInSocial.en.json";
import signInSocialPl from "@/assets/lang/signInSocial.pl.json";
import signOutEverywhereEn from "@/assets/lang/signOutEverywhere.en.json";
import signOutEverywherePl from "@/assets/lang/signOutEverywhere.pl.json";
import signOutEverywhereFeedbackEn from "@/assets/lang/signOutEverywhereFeedback.en.json";
import signOutEverywhereFeedbackPl from "@/assets/lang/signOutEverywhereFeedback.pl.json";
import signUpFormEn from "@/assets/lang/signUpForm.en.json";
import signUpFormPl from "@/assets/lang/signUpForm.pl.json";
import signUpFormFeedbackEn from "@/assets/lang/signUpFormFeedback.en.json";
import signUpFormFeedbackPl from "@/assets/lang/signUpFormFeedback.pl.json";
import signUpPageEn from "@/assets/lang/signUpPage.en.json";
import signUpPagePl from "@/assets/lang/signUpPage.pl.json";
import spendingPageEn from "@/assets/lang/spendingPage.en.json";
import spendingPagePl from "@/assets/lang/spendingPage.pl.json";
import themeChangerEn from "@/assets/lang/themeChanger.en.json";
import themeChangerPl from "@/assets/lang/themeChanger.pl.json";
import unauthorizedPageEn from "@/assets/lang/unauthorizedPage.en.json";
import unauthorizedPagePl from "@/assets/lang/unauthorizedPage.pl.json";
import uploadAvatarEn from "@/assets/lang/uploadAvatar.en.json";
import uploadAvatarPl from "@/assets/lang/uploadAvatar.pl.json";
import userPopoverEn from "@/assets/lang/userPopover.en.json";
import userPopoverPl from "@/assets/lang/userPopover.pl.json";
import verifyEmailEn from "@/assets/lang/verifyEmail.en.json";
import verifyEmailPl from "@/assets/lang/verifyEmail.pl.json";
import verifyEmailFeedbackEn from "@/assets/lang/verifyEmailFeedback.en.json";
import verifyEmailFeedbackPl from "@/assets/lang/verifyEmailFeedback.pl.json";

// types
export type Lang = "en" | "pl";

// constants
export const LANG_COOKIE = "lang";
export const LANG_COOKIE_MAXAGE = 2592000;

export default class LangLoader {
  public readonly preferredLanguage;

  private constructor(preferredLanguage: Lang) {
    // Save the just-established preferred language by the user
    this.preferredLanguage = preferredLanguage;
  }

  // Create a new instance of LangLoader (we use a factory method because constructors cannot be async)
  public static async create(): Promise<LangLoader> {
    return new LangLoader(await LangLoader.preferredLanguage());
  }

  public static createEffect = () =>
    Effect.gen(function* () {
      const preferredLanguage = yield* Effect.promise(() => LangLoader.preferredLanguage());
      return new LangLoader(preferredLanguage);
    });

  // Establish the preferred language by the user
  private static async preferredLanguage(): Promise<Lang> {
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
    return this.preferredLanguage === "pl" ? confirmModalPl : confirmModalEn;
  }
  public get couplesPage() {
    return this.preferredLanguage === "pl" ? couplesPagePl : couplesPageEn;
  }
  public get dashboardPage() {
    return this.preferredLanguage === "pl" ? dashboardPagePl : dashboardPageEn;
  }
  public get deleteAvatar() {
    return this.preferredLanguage === "pl" ? deleteAvatarPl : deleteAvatarEn;
  }
  public get deleteAvatarFeedback() {
    return this.preferredLanguage === "pl" ? deleteAvatarFeedbackPl : deleteAvatarFeedbackEn;
  }
  public get demoModeModal() {
    return this.preferredLanguage === "pl" ? demoModeModalPl : demoModeModalEn;
  }
  public get emailApprovedPage() {
    return this.preferredLanguage === "pl" ? emailApprovedPagePl : emailApprovedPageEn;
  }
  public get emailChangeForm() {
    return this.preferredLanguage === "pl" ? emailChangeFormPl : emailChangeFormEn;
  }
  public get emailChangeFormFeedback() {
    return this.preferredLanguage === "pl" ? emailChangeFormFeedbackPl : emailChangeFormFeedbackEn;
  }
  public get emailVerifiedPage() {
    return this.preferredLanguage === "pl" ? emailVerifiedPagePl : emailVerifiedPageEn;
  }
  public get estatePlanningPage() {
    return this.preferredLanguage === "pl" ? estatePlanningPagePl : estatePlanningPageEn;
  }
  public get forecastingPage() {
    return this.preferredLanguage === "pl" ? forecastingPagePl : forecastingPageEn;
  }
  public get forEmployersPage() {
    return this.preferredLanguage === "pl" ? forEmployersPagePl : forEmployersPageEn;
  }
  public get forgotPassForm() {
    return this.preferredLanguage === "pl" ? forgotPassFormPl : forgotPassFormEn;
  }
  public get forgotPassFormFeedback() {
    return this.preferredLanguage === "pl" ? forgotPassFormFeedbackPl : forgotPassFormFeedbackEn;
  }
  public get forgotPasswordPage() {
    return this.preferredLanguage === "pl" ? forgotPasswordPagePl : forgotPasswordPageEn;
  }
  public get formToastFeedback() {
    return this.preferredLanguage === "pl" ? formToastFeedbackPl : formToastFeedbackEn;
  }
  public get homePage() {
    return this.preferredLanguage === "pl" ? homePagePl : homePageEn;
  }
  public get investingPage() {
    return this.preferredLanguage === "pl" ? investingPagePl : investingPageEn;
  }
  public get langChanger() {
    return this.preferredLanguage === "pl" ? langChangerPl : langChangerEn;
  }
  public get navIconItems() {
    return this.preferredLanguage === "pl" ? navIconItemsPl : navIconItemsEn;
  }
  public get navMenuItems() {
    return this.preferredLanguage === "pl" ? navMenuItemsPl : navMenuItemsEn;
  }
  public get notFoundPage() {
    return this.preferredLanguage === "pl" ? notFoundPagePl : notFoundPageEn;
  }
  public get passChangeForm() {
    return this.preferredLanguage === "pl" ? passChangeFormPl : passChangeFormEn;
  }
  public get passChangeFormFeedback() {
    return this.preferredLanguage === "pl" ? passChangeFormFeedbackPl : passChangeFormFeedbackEn;
  }
  public get profileDetailsForm() {
    return this.preferredLanguage === "pl" ? profileDetailsFormPl : profileDetailsFormEn;
  }
  public get profileDetailsFormFeedback() {
    return this.preferredLanguage === "pl" ? profileDetailsFormFeedbackPl : profileDetailsFormFeedbackEn;
  }
  public get profileInfo() {
    return this.preferredLanguage === "pl" ? profileInfoPl : profileInfoEn;
  }
  public get profilePage() {
    return this.preferredLanguage === "pl" ? profilePagePl : profilePageEn;
  }
  public get resetPassForm() {
    return this.preferredLanguage === "pl" ? resetPassFormPl : resetPassFormEn;
  }
  public get resetPassFormFeedback() {
    return this.preferredLanguage === "pl" ? resetPassFormFeedbackPl : resetPassFormFeedbackEn;
  }
  public get resetPasswordPage() {
    return this.preferredLanguage === "pl" ? resetPasswordPagePl : resetPasswordPageEn;
  }
  public get resourcesPage() {
    return this.preferredLanguage === "pl" ? resourcesPagePl : resourcesPageEn;
  }
  public get signInDemo() {
    return this.preferredLanguage === "pl" ? signInDemoPl : signInDemoEn;
  }
  public get signInDemoUser() {
    return this.preferredLanguage === "pl" ? signInDemoUserPl : signInDemoUserEn;
  }
  public get signInForm() {
    return this.preferredLanguage === "pl" ? signInFormPl : signInFormEn;
  }
  public get signInFormFeedback() {
    return this.preferredLanguage === "pl" ? signInFormFeedbackPl : signInFormFeedbackEn;
  }
  public get signInPage() {
    return this.preferredLanguage === "pl" ? signInPagePl : signInPageEn;
  }
  public get signInSocial() {
    return this.preferredLanguage === "pl" ? signInSocialPl : signInSocialEn;
  }
  public get signOutEverywhere() {
    return this.preferredLanguage === "pl" ? signOutEverywherePl : signOutEverywhereEn;
  }
  public get signOutEverywhereFeedback() {
    return this.preferredLanguage === "pl" ? signOutEverywhereFeedbackPl : signOutEverywhereFeedbackEn;
  }
  public get signUpForm() {
    return this.preferredLanguage === "pl" ? signUpFormPl : signUpFormEn;
  }
  public get signUpFormFeedback() {
    return this.preferredLanguage === "pl" ? signUpFormFeedbackPl : signUpFormFeedbackEn;
  }
  public get signUpPage() {
    return this.preferredLanguage === "pl" ? signUpPagePl : signUpPageEn;
  }
  public get spendingPage() {
    return this.preferredLanguage === "pl" ? spendingPagePl : spendingPageEn;
  }
  public get themeChanger() {
    return this.preferredLanguage === "pl" ? themeChangerPl : themeChangerEn;
  }
  public get unauthorizedPage() {
    return this.preferredLanguage === "pl" ? unauthorizedPagePl : unauthorizedPageEn;
  }
  public get uploadAvatar() {
    return this.preferredLanguage === "pl" ? uploadAvatarPl : uploadAvatarEn;
  }
  public get userPopover() {
    return this.preferredLanguage === "pl" ? userPopoverPl : userPopoverEn;
  }
  public get verifyEmail() {
    return this.preferredLanguage === "pl" ? verifyEmailPl : verifyEmailEn;
  }
  public get verifyEmailFeedback() {
    return this.preferredLanguage === "pl" ? verifyEmailFeedbackPl : verifyEmailFeedbackEn;
  }
}
