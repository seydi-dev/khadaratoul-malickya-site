"use client";

import { useLanguage } from "@/context/LanguageContext";
import Icon from "./Icon";

export default function LibraryCard({ doc }) {
  const { lang, t } = useLanguage();

  return (
    <article className="lib-card">
      <div className="lib-cover">
        <img src={doc.cover} alt={doc.title[lang]} />
      </div>

      <div className="lib-body">
        <h3>{doc.title[lang]}</h3>
        {doc.author && <p className="lib-author">{doc.author}</p>}
        <p className="lib-desc">{doc.description[lang]}</p>

        {doc.contents?.length > 0 && (
          <>
            <span className="lib-contents-label">{t("lb_contents")}</span>
            <ul className="lib-contents">
              {doc.contents.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </>
        )}

        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
          <Icon name="arrow" />
          {t("lb_download")}
          {doc.pages ? ` (PDF, ${doc.pages} p.)` : " (PDF)"}
        </a>
      </div>
    </article>
  );
}
