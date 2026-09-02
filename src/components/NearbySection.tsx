import { getTranslations } from "next-intl/server";

export default async function NearbySection() {
  const t = await getTranslations("nearby");

  return (
    <section className="section" id="nearby">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Old Town highlights</span>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>

        <div className="nearby-grid">
          {t.raw("spots").map(
            (
              spot: { name: string; note: string; distance: string },
              i: number
            ) => (
              <div className="nearby-card" key={i}>
                <h3>{spot.name}</h3>
                <p>{spot.note}</p>
                <span className="distance-chip">{spot.distance}</span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
