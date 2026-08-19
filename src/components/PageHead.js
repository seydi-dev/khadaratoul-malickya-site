"use client";

/** The dark banner at the top of every inner page. */
export default function PageHead({ eyebrow, title, lead }) {
  return (
    <header className="page-head">
      <div className="wrap">
        <div className="eyebrow center">{eyebrow}</div>
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
    </header>
  );
}
