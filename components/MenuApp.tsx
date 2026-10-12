"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Business, Hour, Category, Item, Lang } from "@/lib/types";

const UI: Record<Lang, Record<string, string>> = {
  it: {
    search: "Cerca nel menù…",
    noResults: "Nessun piatto trovato.",
    askPrice: "chiedi al banco",
    unavailable: "non disponibile",
    hours: "Orari",
    closed: "Chiuso",
    today: "oggi",
    address: "Indirizzo",
    call: "Chiama",
    directions: "Indicazioni",
    rights: "Tutti i diritti riservati"
  },
  en: {
    search: "Search the menu…",
    noResults: "No dishes found.",
    askPrice: "ask at the counter",
    unavailable: "unavailable",
    hours: "Hours",
    closed: "Closed",
    today: "today",
    address: "Address",
    call: "Call",
    directions: "Directions",
    rights: "All rights reserved"
  }
};

function text(lang: Lang, it: string | null | undefined, en: string | null | undefined) {
  if (lang === "en" && en && en.trim()) return en;
  return it ?? "";
}

function formatPrice(item: Item, lang: Lang, t: Record<string, string>) {
  if (!item.is_available) return t.unavailable;
  if (item.price === null || item.price === undefined) return t.askPrice;
  return lang === "it"
    ? `€ ${item.price.toFixed(2).replace(".", ",")}`
    : `€${item.price.toFixed(2)}`;
}

function matchesQuery(item: Item, q: string) {
  const hay = [item.name_it, item.name_en, item.desc_it, item.desc_en]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes(q.toLowerCase());
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
        flexShrink: 0
      }}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function MenuApp({
  business,
  hours,
  categories
}: {
  business: Business | null;
  hours: Hour[];
  categories: Category[];
}) {
  const [lang, setLang] = useState<Lang>("it");
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const savedLang = window.localStorage.getItem("car-lang") as Lang | null;
    if (savedLang === "it" || savedLang === "en") setLang(savedLang);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("car-lang", lang);
  }, [lang]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("car-theme", next ? "dark" : "light");
  }

  const t = UI[lang];
  const isSearching = query.trim().length > 0;

  const filtered: Category[] = useMemo(() => {
    if (!isSearching) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((it) => matchesQuery(it, query))
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query, isSearching, categories]);

  function toggleCategory(catId: string) {
    setQuery("");
    setOpenId((prev) => (prev === catId ? "" : catId));
  }

  useEffect(() => {
    if (!openId || isSearching) return;
    const el = sectionRefs.current[openId];
    if (!el) return;
    const raf = requestAnimationFrame(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [openId, isSearching]);

  const todayIndex = (new Date().getDay() + 6) % 7; // lun=0 ... dom=6

  const bizName = business?.name || "";
  const tagline = business?.tagline || "";

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-line">
        {business?.hero_url && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.16] dark:opacity-[0.22]"
            style={{ backgroundImage: `url('${business.hero_url}')` }}
            aria-hidden="true"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--paper) 0%, transparent 35%, var(--paper) 100%)"
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-xl flex-col items-center gap-3 px-5 pb-5 pt-6 text-center">
          <div className="flex w-full items-center justify-between">
            <button
              onClick={toggleTheme}
              aria-label={dark ? "Tema chiaro" : "Tema scuro"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card text-ink"
            >
              {dark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
                </svg>
              )}
            </button>

            <div
              className="flex overflow-hidden rounded-full border border-line bg-card text-xs font-medium"
              role="group"
              aria-label="Lingua / Language"
            >
              <button
                onClick={() => setLang("it")}
                className="px-3 py-1.5"
                style={lang === "it" ? { background: "var(--rust)", color: "var(--card)" } : {}}
              >
                IT
              </button>
              <button
                onClick={() => setLang("en")}
                className="px-3 py-1.5"
                style={lang === "en" ? { background: "var(--rust)", color: "var(--card)" } : {}}
              >
                EN
              </button>
            </div>
          </div>

          {business?.logo_url && (
            <div className="mt-1 h-24 w-24 overflow-hidden rounded-full border-2 border-card shadow-sm" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={business.logo_url} alt={bizName} className="h-full w-full object-cover" />
            </div>
          )}

          <h1 className="font-display text-3xl italic leading-none" style={{ color: "var(--ink)" }}>
            {bizName}
          </h1>
          {tagline && (
            <p className="text-sm" style={{ color: "var(--sage)" }}>
              {tagline}
            </p>
          )}
        </div>
      </header>

      {/* RICERCA */}
      <div className="sticky top-0 z-20 bg-paper border-b border-line">
        <div className="mx-auto max-w-xl px-5 py-3">
          <div className="relative mx-auto w-full max-w-[26rem]">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              className="w-full rounded-full border border-line bg-card py-1.5 pl-8 pr-8 text-sm text-ink placeholder:opacity-60 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Cancella ricerca"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm opacity-60"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CONTENUTO MENU: sezioni a fisarmonica */}
      <div className="mx-auto max-w-xl px-5 pb-10 pt-2">
        {isSearching && filtered.length === 0 && (
          <p className="py-10 text-center text-sm" style={{ color: "var(--sage)" }}>
            {t.noResults}
          </p>
        )}

        {filtered.map((cat) => {
          const isOpen = isSearching ? true : openId === cat.id;
          return (
            <section
              key={cat.id}
              ref={(el) => {
                sectionRefs.current[cat.id] = el;
              }}
              className="scroll-mt-24 border-b"
              style={{ borderColor: "var(--line)" }}
            >
              <button
                onClick={() => toggleCategory(cat.id)}
                className="flex w-full items-center justify-between gap-3 py-4 text-left"
                aria-expanded={isOpen}
                disabled={isSearching}
              >
                <span className="font-display text-xl italic" style={{ color: "var(--rust)" }}>
                  {text(lang, cat.name_it, cat.name_en)}
                </span>
                {!isSearching && (
                  <span style={{ color: "var(--rust)" }}>
                    <Chevron open={isOpen} />
                  </span>
                )}
              </button>

              {isOpen && (
                <ul className="flex flex-col gap-3 pb-5">
                  {cat.items.map((it) => (
                    <li key={it.id} style={!it.is_available ? { opacity: 0.55 } : {}}>
                      <div className="menu-row">
                        <span className="font-medium">{text(lang, it.name_it, it.name_en)}</span>
                        <span className="leader" aria-hidden="true" />
                        <span
                          className="whitespace-nowrap text-sm"
                          style={{ color: it.is_available ? "var(--rust)" : "var(--sage)" }}
                        >
                          {formatPrice(it, lang, t)}
                        </span>
                      </div>
                      {(it.desc_it || it.desc_en) && (
                        <p className="mt-0.5 text-sm italic" style={{ color: "var(--sage)" }}>
                          {text(lang, it.desc_it, it.desc_en)}
                        </p>
                      )}
                      {(it.note_it || it.note_en) && (
                        <p className="mt-0.5 text-xs" style={{ color: "var(--teal)" }}>
                          ({text(lang, it.note_it, it.note_en)})
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-line px-5 py-8" style={{ background: "var(--card)" }}>
        <div className="mx-auto flex max-w-xl flex-col gap-6 text-sm">
          {hours.length > 0 && (
            <div>
              <h3 className="font-display mb-2 text-base italic" style={{ color: "var(--rust)" }}>
                {t.hours}
              </h3>
              <ul className="flex flex-col gap-1">
                {hours.map((h, i) => (
                  <li
                    key={h.id}
                    className="flex justify-between"
                    style={i === todayIndex ? { color: "var(--rust)", fontWeight: 600 } : {}}
                  >
                    <span>
                      {text(lang, h.day_it, h.day_en)}
                      {i === todayIndex ? ` (${t.today})` : ""}
                    </span>
                    <span>{h.open_time ? `${h.open_time} – ${h.close_time}` : t.closed}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {business?.address && (
            <div className="flex flex-col gap-1">
              <h3 className="font-display mb-1 text-base italic" style={{ color: "var(--rust)" }}>
                {t.address}
              </h3>
              <p>{business.address}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {business.phone_href && (
                  <a
                    href={business.phone_href}
                    className="rounded-full border px-3 py-1.5"
                    style={{ borderColor: "var(--line)" }}
                  >
                    {t.call} · {business.phone}
                  </a>
                )}
                {business.maps_query && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.maps_query)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border px-3 py-1.5"
                    style={{ borderColor: "var(--line)" }}
                  >
                    {t.directions}
                  </a>
                )}
              </div>
            </div>
          )}

          {(business?.instagram || business?.facebook) && (
            <div className="flex items-center gap-4">
              {business.instagram && (
                <a href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "var(--ink)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              )}
              {business.facebook && (
                <a href={business.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "var(--ink)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h2.6l.4-4H13V7a1 1 0 0 1 1-1h2Z" />
                  </svg>
                </a>
              )}
            </div>
          )}

          {bizName && (
            <p className="pt-2 text-center text-xs opacity-50">
              © {new Date().getFullYear()} {bizName} — {t.rights}
            </p>
          )}
        </div>
      </footer>
    </main>
  );
}
