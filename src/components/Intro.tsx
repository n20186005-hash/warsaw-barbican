import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Intro() {
  const t = await getTranslations("intro");

  return (
    <section className="section" id="intro">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Warsaw Barbican</Link>
          <span className="sep">›</span>
          <span>Warsaw (Warszawa)</span>
          <span className="sep">›</span>
          <span>Old Town (Stare Miasto)</span>
          <span className="sep">›</span>
          <span>{t("title")}</span>
        </nav>
        <div className="section-head">
          <span className="kicker">Overview</span>
          <h2>{t("title")}</h2>
        </div>
        <div className="intro-body">
          {t.raw("paragraphs").map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
