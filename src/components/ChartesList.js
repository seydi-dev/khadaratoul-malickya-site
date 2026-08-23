"use client";

import { useState } from "react";
import { CHARTES } from "@/data/chartes";

/**
 * Displays the 23 charters as an expandable numbered list. Each charter
 * shows its Arabic text (right-to-left) and its French explanation, exactly
 * as provided by the community — nothing paraphrased.
 */
export default function ChartesList() {
  const [open, setOpen] = useState(1);

  return (
    <div className="chartes-list">
      {CHARTES.map((c) => {
        const isOpen = open === c.n;
        return (
          <div className={`charte${isOpen ? " open" : ""}`} key={c.n}>
            <button
              className="charte-head"
              onClick={() => setOpen(isOpen ? null : c.n)}
              aria-expanded={isOpen}
            >
              <span className="charte-n">{String(c.n).padStart(2, "0")}</span>
              <span className="charte-ar-short" dir="rtl" lang="ar">
                {c.arabic}
              </span>
              <span className="charte-chevron">⌄</span>
            </button>
            {isOpen && (
              <div className="charte-body">
                <p className="charte-text">{c.text}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
