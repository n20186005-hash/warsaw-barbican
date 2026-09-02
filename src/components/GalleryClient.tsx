"use client";

import { useState } from "react";

type GalleryItem = { src: string; caption: string };

export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <figure
            className="gallery-item"
            key={item.src}
            onClick={() => setActive(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(i);
              }
            }}
            aria-label={item.caption}
          >
            <img
              src={item.src}
              alt={item.caption}
              loading={i < 4 ? "eager" : "lazy"}
            />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      {active !== null && items[active] && (
        <div
          className="lightbox"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="lb-close"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img src={items[active].src} alt={items[active].caption} />
          <p className="lb-caption">{items[active].caption}</p>
        </div>
      )}
    </>
  );
}
