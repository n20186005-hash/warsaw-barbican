import { getTranslations } from "next-intl/server";

export default async function HoursSection() {
  const t = await getTranslations("hours");

  return (
    <section className="section" id="hours">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Plan your visit</span>
          <h2>{t("title")}</h2>
        </div>

        <div className="hours-block">
          <div className="card">
            <h3>{t("passageTitle")}</h3>
            <p>{t("passageText")}</p>
          </div>
          <div className="card">
            <h3>{t("exhibitionTitle")}</h3>
            <p>{t("exhibitionText")}</p>
            <a
              href="https://barbakan.muzeumwarszawy.pl/wizyta/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("officialLink")} →
            </a>
          </div>
        </div>

        <div className="card">
          <h3>{t("ticketTitle")}</h3>
          <div className="price-list">
            {t.raw("ticketRows").map(
              (row: { type: string; price: string }, i: number) => (
                <div className="price-row" key={i}>
                  <span>{row.type}</span>
                  <span className="price">{row.price}</span>
                </div>
              )
            )}
          </div>
          <p className="note-box">{t("ticketNote")}</p>
        </div>

        <div className="note-box">{t("note")}</div>
      </div>
    </section>
  );
}
