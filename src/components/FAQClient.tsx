"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };

export default function FAQClient({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div className={`faq-item ${isOpen ? "open" : ""}`} key={i}>
            <button
              className="faq-q"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              {item.q}
              <span className="faq-icon" aria-hidden="true">
                +
              </span>
            </button>
            <div className="faq-a" hidden={!isOpen}>
              <div className="faq-a-inner">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
