import { getTranslations } from "next-intl/server";
import FAQClient from "./FAQClient";

export default async function FAQSection() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head">
          <span className="kicker">FAQ</span>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>
        <FAQClient items={items} />
      </div>
    </section>
  );
}
