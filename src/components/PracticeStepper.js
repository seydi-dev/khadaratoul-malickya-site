"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import FormulaBlock from "./FormulaBlock";
import DhikrCounter from "./DhikrCounter";
import Icon from "./Icon";

/**
 * Guided, step-by-step walkthrough of a spiritual practice.
 *
 * The user can jump to any step from the numbered rail, or move forward and
 * back. Counters are offered for repeated recitations as a visual aid only.
 */
export default function PracticeStepper({ practice }) {
  const { lang, t } = useLanguage();
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [finished, setFinished] = useState(false);
  const panelRef = useRef(null);

  const steps = practice.steps;
  const step = steps[i];
  const last = i === steps.length - 1;

  const goTo = useCallback((idx) => {
    setI(idx);
    setFinished(false);
  }, []);

  // Keep the panel in view when moving between steps on mobile.
  useEffect(() => {
    if (started && panelRef.current) {
      const y =
        panelRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, started]);

  /* ---------- intro state, before starting ---------- */
  if (!started) {
    return (
      <div className="pr-start">
        <div className="pr-start-inner">
          <Icon name={practice.icon} className="pr-start-ico" />
          <h3>{t("pc_ready")}</h3>
          <p>{t("pc_ready_note")}</p>
          <button className="btn btn-gold" onClick={() => setStarted(true)}>
            {t("pc_begin")} <Icon name="arrow" />
          </button>
          <span className="pr-start-count">
            {steps.length} {t("pc_steps")}
          </span>
        </div>
      </div>
    );
  }

  /* ---------- completion state ---------- */
  if (finished) {
    return (
      <div className="pr-done">
        <div className="ornament" style={{ marginBottom: 18 }}>
          <i />
          <span>&#10022;</span>
          <i />
        </div>
        <h3>{t("pc_finished")}</h3>
        <p>{t("pc_finished_note")}</p>

        {practice.duaText ? (
          <FormulaBlock {...practice.duaText} />
        ) : (
          <div className="pr-missing">{t("pc_dua_missing")}</div>
        )}

        <button
          className="btn btn-outline"
          onClick={() => {
            setFinished(false);
            setI(0);
          }}
        >
          {t("pc_restart")}
        </button>
      </div>
    );
  }

  /* ---------- active walkthrough ---------- */
  return (
    <div className="pr-stepper" ref={panelRef}>
      {/* numbered rail */}
      <div className="pr-rail" role="tablist">
        {steps.map((s, idx) => (
          <button
            key={s.n}
            role="tab"
            aria-selected={idx === i}
            className={`pr-dot${idx === i ? " on" : ""}${
              idx < i ? " past" : ""
            }`}
            onClick={() => goTo(idx)}
          >
            {String(s.n).padStart(2, "0")}
          </button>
        ))}
      </div>

      <div className="pr-panel">
        {/* illustration */}
        <div className="pr-visual">
          <img src={step.image} alt="" />
          <span className="pr-visual-n">{String(step.n).padStart(2, "0")}</span>
        </div>

        {/* content */}
        <div className="pr-content">
          <div className="pr-head">
            <span className="pr-step-n">
              {String(step.n).padStart(2, "0")} — {t("pc_step")}
            </span>
            <h3>{step.title[lang]}</h3>
            {step.count && <span className="pr-badge">{step.count} ×</span>}
            {step.durationNote && (
              <span className="pr-badge soft">{step.durationNote[lang]}</span>
            )}
          </div>

          <p className="pr-body">{step.body[lang]}</p>

          {/* intention formula, only if the community has supplied it */}
          {step.n === 1 &&
            practice.id === "wird" &&
            (practice.intentionFormula ? (
              <FormulaBlock
                arabic={practice.intentionFormula.arabic}
                translit={practice.intentionFormula.translit}
                note={practice.intentionFormula.note?.[lang]}
              />
            ) : (
              <div className="pr-missing">{t("pc_intention_missing")}</div>
            ))}

          {step.formula && <FormulaBlock {...step.formula} long={step.long} />}

          {step.alternate && (
            <FormulaBlock
              arabic={step.alternate.arabic}
              translit={step.alternate.translit}
              note={step.alternate.label[lang]}
            />
          )}

          {step.formulaList &&
            step.formulaList.map((f, k) => <FormulaBlock key={k} {...f} />)}

          {/* closing step also points to the dua */}
          {step.isClosing &&
            (practice.duaText ? (
              <FormulaBlock {...practice.duaText} note={t("pc_dua")} />
            ) : (
              <div className="pr-missing">{t("pc_dua_missing")}</div>
            ))}

          {/* counter, only when there is something to count */}
          {step.count > 1 && (
            <DhikrCounter target={step.count} label={step.title[lang]} />
          )}

          {/* navigation */}
          <div className="pr-nav">
            <button
              className="btn btn-outline"
              onClick={() => goTo(Math.max(0, i - 1))}
              disabled={i === 0}
            >
              {t("pc_prev")}
            </button>

            {last ? (
              <button
                className="btn btn-gold"
                onClick={() => setFinished(true)}
              >
                {t("pc_finish")} <Icon name="arrow" />
              </button>
            ) : (
              <button className="btn btn-gold" onClick={() => goTo(i + 1)}>
                {t("pc_next")} <Icon name="arrow" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
