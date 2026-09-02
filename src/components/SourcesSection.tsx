import { getTranslations } from "next-intl/server";

export default async function SourcesSection() {
  const t = await getTranslations("sources");

  return (
    <section className="section section-alt" id="sources">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Sources</span>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>

        <div className="source-list">
          {t.raw("items").map(
            (item: { name: string; url: string; note: string }, i: number) => (
              <div className="source-item" key={i}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.name} ↗
                </a>
                <p>{item.note}</p>
              </div>
            )
          )}
        </div>

        <div className="note-box">{t("photoCredit")}</div>
      </div>
    </section>
  );
}
