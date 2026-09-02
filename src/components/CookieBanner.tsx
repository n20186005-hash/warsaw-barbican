import { getTranslations } from "next-intl/server";
import CookieBannerClient from "./CookieBannerClient";

export default async function CookieBanner() {
  const t = await getTranslations("cookieBanner");

  return (
    <CookieBannerClient
      text={t("text")}
      acceptAll={t("acceptAll")}
      essentialOnly={t("essentialOnly")}
    />
  );
}
