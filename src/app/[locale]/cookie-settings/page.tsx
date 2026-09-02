import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import CookieSettingsClient from "@/components/CookieSettingsClient";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CookieSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cookieSettings" });

  return (
    <CookieSettingsClient
      title={t("title")}
      description={t("description")}
      essential={t("essential")}
      essentialText={t("essentialText")}
      analytics={t("analytics")}
      analyticsText={t("analyticsText")}
      save={t("save")}
      saved={t("saved")}
      back={t("back")}
    />
  );
}
