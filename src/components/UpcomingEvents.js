"use client";

import { useEffect, useState } from "react";
import { EVENTS } from "@/data/events";
import { SITE } from "@/data/site";
import { buildJoumaProgram } from "@/lib/jouma";
import { formatTime, nextFriday, TROIS_RIVIERES } from "@/lib/prayer";
import Reveal from "./Reveal";
import EventCard from "./EventCard";

function part(date, options, locale) {
  return new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: TROIS_RIVIERES.timeZone,
  }).format(date);
}

function buildKhadaraEvent() {
  const now = new Date();
  let friday = nextFriday(now);
  let program = buildJoumaProgram(friday);
  if (!program) return null;

  const lastStep = program.steps[program.steps.length - 1].at;
  if (lastStep < now) {
    friday = nextFriday(new Date(friday.getTime() + 86400000));
    program = buildJoumaProgram(friday);
    if (!program) return null;
  }

  const start = program.steps[0].at;
  return {
    id: "khadara",
    day: part(start, { day: "2-digit" }, "fr-CA"),
    month: {
      fr: part(start, { month: "short" }, "fr-CA"),
      en: part(start, { month: "short" }, "en-CA"),
    },
    title: { fr: "Séance de Khadara", en: "Khadara session" },
    time: { fr: formatTime(start, "fr"), en: formatTime(start, "en") },
    address: `${SITE.address.street}, ${SITE.address.city}`,
    target: start.toISOString(),
  };
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const now = Date.now();
    const list = EVENTS.filter((e) => new Date(e.target).getTime() > now);
    const khadara = buildKhadaraEvent();
    if (khadara) list.push(khadara);
    list.sort((a, b) => new Date(a.target) - new Date(b.target));
    setEvents(list);
  }, []);

  return (
    <div className="evt-grid">
      {events.map((e, i) => (
        <Reveal key={e.id} delay={i * 0.09}>
          <EventCard event={e} />
        </Reveal>
      ))}
    </div>
  );
}
