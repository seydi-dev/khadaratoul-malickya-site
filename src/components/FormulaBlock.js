export default function FormulaBlock({ arabic, translit, long = false, note }) {
  const lines = Array.isArray(translit) ? translit : translit ? [translit] : [];

  return (
    <div className={`formula${long ? " formula-long" : ""}`}>
      {note && <div className="formula-note">{note}</div>}
      {arabic && (
        <p className="formula-ar" dir="rtl" lang="ar">
          {arabic}
        </p>
      )}
      {lines.map((line, i) => (
        <p className="formula-tr" key={i}>
          {line}
        </p>
      ))}
    </div>
  );
}
