import { getTranslations } from "next-intl/server";

export default async function TransportSection() {
  const t = await getTranslations("transport");

  return (
    <section className="section" id="transport">
      <div className="container">
        <div className="section-head">
          <span className="kicker">{t("kicker")}</span>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>

        <div className="transport-grid">
          {t.raw("items").map(
            (
              item: { mode: string; title: string; text: string },
              i: number
            ) => (
              <div className="card" key={i}>
                <span className="mode-badge">{item.mode}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            )
          )}
        </div>

        <div className="note-box">{t("note")}</div>
      </div>
    </section>
  );
}
