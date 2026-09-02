"use client";

import { useEffect, useState } from "react";

export default function CookieBannerClient({
  text,
  acceptAll,
  essentialOnly,
}: {
  text: string;
  acceptAll: string;
  essentialOnly: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const prefs = localStorage.getItem("cookiePrefs");
      if (!prefs) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (analytics: boolean) => {
    try {
      localStorage.setItem(
        "cookiePrefs",
        JSON.stringify({ essential: true, analytics })
      );
    } catch {
      // storage unavailable — ignore
    }
    window.dispatchEvent(new Event("consent-updated"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite">
      <p>{text}</p>
      <div className="cookie-actions">
        <button className="btn btn-sm btn-primary" onClick={() => save(true)}>
          {acceptAll}
        </button>
        <button className="btn btn-sm btn-outline" onClick={() => save(false)}>
          {essentialOnly}
        </button>
      </div>
    </div>
  );
}
