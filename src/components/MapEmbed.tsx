import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config";

export default async function MapEmbed() {
  const t = await getTranslations("mapSection");

  return (
    <section className="section" id="map">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Map</span>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>

        <iframe
          className="map-frame"
          src={siteConfig.mapsEmbedSrc}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          title={`${t("title")} — Google Maps`}
        />

        <div className="map-meta">
          <div className="meta-item">
            <strong>{t("transportTitle")}:</strong>
            <br />
            {t("tramLine")}
            <br />
            {t("metroLine")}
            <br />
            {t("walking")}
          </div>
          <div className="meta-item">
            <strong>{t("authorityText")}:</strong>{" "}
            <a
              href="https://barbakan.muzeumwarszawy.pl/wizyta/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("authorityLink")}
            </a>
            <br />
            <strong>Plus Code:</strong> {siteConfig.plusCode}
          </div>
        </div>

        <div className="map-actions">
          <a
            className="btn btn-primary"
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("openInMaps")} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
