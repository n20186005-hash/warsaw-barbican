"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const languages: { code: string; label: string }[] = [
  { code: "pl", label: "PL" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "RU" },
  { code: "de", label: "DE" },
];

export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={pathname}
          locale={lang.code}
          className={locale === lang.code ? "active" : ""}
          aria-current={locale === lang.code ? "true" : undefined}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}
