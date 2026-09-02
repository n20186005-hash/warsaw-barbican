import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pl", "en", "zh", "ru", "de"],
  defaultLocale: "pl",
  localePrefix: "always",
});
