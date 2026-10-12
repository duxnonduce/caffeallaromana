"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Business, Hour } from "@/lib/types";

const inputStyle = { borderColor: "var(--line)", background: "var(--paper)" };

function Field({
  label,
  defaultValue,
  onBlur,
  placeholder,
  saved
}: {
  label: string;
  defaultValue: string;
  onBlur: (v: string) => void;
  placeholder?: string;
  saved: boolean;
}) {
  return (
    <div className="mb-3">
      <label className="mb-1 flex items-center text-sm font-medium">
        {label}
        {saved && <span className="ml-2 text-xs" style={{ color: "var(--sage)" }}>Salvato ✓</span>}
      </label>
      <input
        defaultValue={defaultValue}
        onBlur={(e) => onBlur(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border px-3 py-2 text-sm"
        style={inputStyle}
      />
    </div>
  );
}

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [business, setBusiness] = useState<Business | null>(null);
  const [hours, setHours] = useState<Hour[]>([]);
  const [loading, setLoading] = useState(true);
  const [flashField, setFlashField] = useState("");
  const [uploading, setUploading] = useState<"logo" | "hero" | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const [{ data: biz }, { data: hrs }] = await Promise.all([
      supabase.from("business").select("*").limit(1).maybeSingle(),
      supabase.from("hours").select("*").order("day_index")
    ]);
    setBusiness(biz ?? null);
    setHours(hrs ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  function flash(key: string) {
    setFlashField(key);
    setTimeout(() => setFlashField(""), 1200);
  }

  async function updateBusiness(field: string, value: string) {
    if (!business) return;
    await supabase.from("business").update({ [field]: value }).eq("id", business.id);
    flash(field);
  }

  async function updateHour(id: number, field: "open_time" | "close_time", value: string) {
    await supabase.from("hours").update({ [field]: value || null }).eq("id", id);
    flash("hour" + id + field);
  }

  async function toggleClosed(hour: Hour, closed: boolean) {
    await supabase
      .from("hours")
      .update({ open_time: closed ? null : "08:00", close_time: closed ? null : "20:00" })
      .eq("id", hour.id);
    load();
  }

  async function handleUpload(file: File, kind: "logo" | "hero") {
    if (!business) return;
    setUploading(kind);
    const ext = file.name.split(".").pop();
    const path = `${kind}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("assets").upload(path, file, {
      upsert: true,
      cacheControl: "3600"
    });
    if (uploadError) {
      alert("Caricamento non riuscito: " + uploadError.message);
      setUploading(null);
      return;
    }
    const { data: publicUrlData } = supabase.storage.from("assets").getPublicUrl(path);
    const column = kind === "logo" ? "logo_url" : "hero_url";
    await supabase.from("business").update({ [column]: publicUrlData.publicUrl }).eq("id", business.id);
    setUploading(null);
    load();
  }

  if (loading || !business) {
    return <p style={{ color: "var(--sage)" }}>Caricamento…</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="font-display mb-4 text-2xl italic" style={{ color: "var(--rust)" }}>
          Impostazioni locale
        </h1>

        <Field label="Nome locale" defaultValue={business.name} onBlur={(v) => updateBusiness("name", v)} saved={flashField === "name"} />
        <Field label="Sottotitolo / claim" defaultValue={business.tagline} onBlur={(v) => updateBusiness("tagline", v)} saved={flashField === "tagline"} />
        <Field label="Indirizzo" defaultValue={business.address} onBlur={(v) => updateBusiness("address", v)} saved={flashField === "address"} />
        <Field
          label="Indirizzo per Google Maps"
          defaultValue={business.maps_query}
          onBlur={(v) => updateBusiness("maps_query", v)}
          placeholder="Nome locale, città"
          saved={flashField === "maps_query"}
        />
        <Field label="Telefono (visualizzato)" defaultValue={business.phone} onBlur={(v) => updateBusiness("phone", v)} saved={flashField === "phone"} />
        <Field
          label="Telefono (link chiamata)"
          defaultValue={business.phone_href}
          onBlur={(v) => updateBusiness("phone_href", v)}
          placeholder="tel:+39..."
          saved={flashField === "phone_href"}
        />
        <Field label="Link Instagram" defaultValue={business.instagram} onBlur={(v) => updateBusiness("instagram", v)} saved={flashField === "instagram"} />
        <Field label="Link Facebook" defaultValue={business.facebook} onBlur={(v) => updateBusiness("facebook", v)} saved={flashField === "facebook"} />
      </section>

      <section>
        <h2 className="font-display mb-3 text-lg italic" style={{ color: "var(--rust)" }}>
          Immagini
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-3" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
            <p className="mb-2 text-sm font-medium">Logo</p>
            {business.logo_url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={business.logo_url} alt="Logo" className="mb-2 h-20 w-20 rounded-full object-cover" />
            )}
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "logo")}
              className="text-xs"
            />
            {uploading === "logo" && <p className="mt-1 text-xs" style={{ color: "var(--sage)" }}>Caricamento…</p>}
          </div>

          <div className="rounded-xl border p-3" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
            <p className="mb-2 text-sm font-medium">Sfondo intestazione</p>
            {business.hero_url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={business.hero_url} alt="Sfondo" className="mb-2 h-20 w-full rounded-lg object-cover" />
            )}
            <input
              ref={heroInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "hero")}
              className="text-xs"
            />
            {uploading === "hero" && <p className="mt-1 text-xs" style={{ color: "var(--sage)" }}>Caricamento…</p>}
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display mb-3 text-lg italic" style={{ color: "var(--rust)" }}>
          Orari
        </h2>
        <div className="flex flex-col gap-2">
          {hours.map((h) => {
            const closed = !h.open_time;
            return (
              <div
                key={h.id}
                className="flex flex-wrap items-center gap-3 rounded-lg border p-2.5"
                style={{ borderColor: "var(--line)", background: "var(--card)" }}
              >
                <span className="w-24 text-sm font-medium">{h.day_it}</span>
                <label className="flex items-center gap-1.5 text-xs">
                  <input type="checkbox" checked={closed} onChange={(e) => toggleClosed(h, e.target.checked)} />
                  Chiuso
                </label>
                {!closed && (
                  <>
                    <input
                      type="time"
                      defaultValue={h.open_time ?? ""}
                      onBlur={(e) => updateHour(h.id, "open_time", e.target.value)}
                      className="rounded-lg border px-2 py-1 text-sm"
                      style={inputStyle}
                    />
                    <span className="text-sm opacity-60">–</span>
                    <input
                      type="time"
                      defaultValue={h.close_time ?? ""}
                      onBlur={(e) => updateHour(h.id, "close_time", e.target.value)}
                      className="rounded-lg border px-2 py-1 text-sm"
                      style={inputStyle}
                    />
                  </>
                )}
                {flashField === "hour" + h.id + "open_time" || flashField === "hour" + h.id + "close_time" ? (
                  <span className="text-xs" style={{ color: "var(--sage)" }}>Salvato ✓</span>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
