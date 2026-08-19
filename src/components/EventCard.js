"use client";

import { useLanguage } from "@/context/LanguageContext";
import CountdownClock from "./CountdownClock";
import Icon from "./Icon";

export default function EventCard({ event }) {
  const { lang } = useLanguage();

  return (
    <article className="evt">
      <div className="evt-head">
        <div className="evt-date">
          <span className="dd">{event.day}</span>
          <span className="mm">{event.month[lang]}</span>
        </div>
        <div>
          <h3>{event.title[lang]}</h3>
          <div className="evt-meta">
            <div><Icon name="clock" /><span>{event.time[lang]}</span></div>
            <div><Icon name="pin" /><span>{event.address}</span></div>
          </div>
        </div>
      </div>
      <CountdownClock target={event.target} />
    </article>
  );
}
