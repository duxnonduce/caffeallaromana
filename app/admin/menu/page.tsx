"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Category, Item } from "@/lib/types";

const inputStyle = {
  borderColor: "var(--line)",
  background: "var(--paper)"
};

function SavedFlash({ show }: { show: boolean }) {
  if (!show) return null;
  return <span className="ml-2 text-xs" style={{ color: "var(--sage)" }}>Salvato ✓</span>;
}

export default function AdminMenuPage() {
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCat, setOpenCat] = useState<string>("");
  const [flashField, setFlashField] = useState<string>("");

  const load = useCallback(async () => {
    const [{ data: cats }, { data: items }] = await Promise.all([
      supabase.from("categories").select("*").order("sort_order"),
      supabase.from("items").select("*").order("sort_order")
    ]);
    const withItems: Category[] = (cats ?? []).map((c) => ({
      ...c,
      items: (items ?? []).filter((it) => it.category_id === c.id)
    }));
    setCategories(withItems);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  function flash(key: string) {
    setFlashField(key);
    setTimeout(() => setFlashField(""), 1200);
  }

  // ---------- Categorie ----------

  async function addCategory() {
    const maxOrder = categories.reduce((m, c) => Math.max(m, c.sort_order), -10);
    await supabase.from("categories").insert({
      name_it: "Nuova categoria",
      name_en: "",
      sort_order: maxOrder + 10,
      is_active: true
    });
    load();
  }

  async function updateCategory(id: string, field: string, value: string | boolean) {
    await supabase.from("categories").update({ [field]: value }).eq("id", id);
    flash(id + field);
  }

  async function deleteCategory(id: string, name: string) {
    if (!window.confirm(`Eliminare la categoria "${name}" e tutti i suoi prodotti?`)) return;
    await supabase.from("categories").delete().eq("id", id);
    load();
  }

  async function moveCategory(index: number, direction: -1 | 1) {
    const target = categories[index + direction];
    const current = categories[index];
    if (!target) return;
    await Promise.all([
      supabase.from("categories").update({ sort_order: target.sort_order }).eq("id", current.id),
      supabase.from("categories").update({ sort_order: current.sort_order }).eq("id", target.id)
    ]);
    load();
  }

  // ---------- Prodotti ----------

  async function addItem(categoryId: string) {
    const cat = categories.find((c) => c.id === categoryId);
    const maxOrder = (cat?.items ?? []).reduce((m, it) => Math.max(m, it.sort_order), -10);
    await supabase.from("items").insert({
      category_id: categoryId,
      name_it: "Nuovo prodotto",
      name_en: "",
      is_available: true,
      sort_order: maxOrder + 10
    });
    load();
  }

  async function updateItem(id: string, field: string, value: string | boolean | number | null) {
    await supabase.from("items").update({ [field]: value }).eq("id", id);
    flash(id + field);
  }

  async function deleteItem(id: string, name: string) {
    if (!window.confirm(`Eliminare "${name}"?`)) return;
    await supabase.from("items").delete().eq("id", id);
    load();
  }

  async function moveItem(categoryId: string, index: number, direction: -1 | 1) {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return;
    const current = cat.items[index];
    const target = cat.items[index + direction];
    if (!target) return;
    await Promise.all([
      supabase.from("items").update({ sort_order: target.sort_order }).eq("id", current.id),
      supabase.from("items").update({ sort_order: current.sort_order }).eq("id", target.id)
    ]);
    load();
  }

  if (loading) {
    return <p style={{ color: "var(--sage)" }}>Caricamento…</p>;
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-display text-2xl italic" style={{ color: "var(--rust)" }}>
          Menù
        </h1>
        <button
          onClick={addCategory}
          className="rounded-full px-4 py-2 text-sm font-medium"
          style={{ background: "var(--sage)", color: "var(--card)" }}
        >
          + Nuova categoria
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {categories.map((cat, ci) => {
          const isOpen = openCat === cat.id;
          return (
            <div
              key={cat.id}
              className="rounded-xl border"
              style={{ borderColor: "var(--line)", background: "var(--card)" }}
            >
              <div className="flex flex-wrap items-center gap-2 p-3">
                <div className="flex flex-col gap-1" style={{ minWidth: "8rem" }}>
                  <button onClick={() => moveCategory(ci, -1)} disabled={ci === 0} className="text-xs opacity-60 disabled:opacity-20">▲</button>
                  <button onClick={() => moveCategory(ci, 1)} disabled={ci === categories.length - 1} className="text-xs opacity-60 disabled:opacity-20">▼</button>
                </div>

                <div className="flex min-w-[10rem] flex-1 flex-col gap-1">
                  <input
                    defaultValue={cat.name_it}
                    onBlur={(e) => updateCategory(cat.id, "name_it", e.target.value)}
                    placeholder="Nome categoria (IT)"
                    className="rounded-lg border px-2 py-1 text-sm font-medium"
                    style={inputStyle}
                  />
                  <input
                    defaultValue={cat.name_en}
                    onBlur={(e) => updateCategory(cat.id, "name_en", e.target.value)}
                    placeholder="Nome categoria (EN) — opzionale"
                    className="rounded-lg border px-2 py-1 text-xs"
                    style={inputStyle}
                  />
                </div>

                <label className="flex items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    defaultChecked={cat.is_active}
                    onChange={(e) => updateCategory(cat.id, "is_active", e.target.checked)}
                  />
                  Visibile
                </label>

                <SavedFlash show={flashField === cat.id + "name_it" || flashField === cat.id + "name_en" || flashField === cat.id + "is_active"} />

                <button
                  onClick={() => setOpenCat(isOpen ? "" : cat.id)}
                  className="ml-auto rounded-full border px-3 py-1 text-xs"
                  style={{ borderColor: "var(--line)" }}
                >
                  {isOpen ? "Chiudi prodotti" : `Prodotti (${cat.items.length})`}
                </button>
                <button
                  onClick={() => deleteCategory(cat.id, cat.name_it)}
                  className="rounded-full border px-3 py-1 text-xs"
                  style={{ borderColor: "#c0392b", color: "#c0392b" }}
                >
                  Elimina
                </button>
              </div>

              {isOpen && (
                <div className="border-t p-3" style={{ borderColor: "var(--line)" }}>
                  <div className="flex flex-col gap-3">
                    {cat.items.map((it, ii) => (
                      <div
                        key={it.id}
                        className="rounded-lg border p-3"
                        style={{ borderColor: "var(--line)", opacity: it.is_available ? 1 : 0.6 }}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <button onClick={() => moveItem(cat.id, ii, -1)} disabled={ii === 0} className="text-xs opacity-60 disabled:opacity-20">▲</button>
                          <button onClick={() => moveItem(cat.id, ii, 1)} disabled={ii === cat.items.length - 1} className="text-xs opacity-60 disabled:opacity-20">▼</button>
                          <label className="ml-auto flex items-center gap-1.5 text-xs">
                            <input
                              type="checkbox"
                              defaultChecked={it.is_available}
                              onChange={(e) => updateItem(it.id, "is_available", e.target.checked)}
                            />
                            Disponibile
                          </label>
                          <button
                            onClick={() => deleteItem(it.id, it.name_it)}
                            className="rounded-full border px-2.5 py-0.5 text-xs"
                            style={{ borderColor: "#c0392b", color: "#c0392b" }}
                          >
                            Elimina
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          <input
                            defaultValue={it.name_it}
                            onBlur={(e) => updateItem(it.id, "name_it", e.target.value)}
                            placeholder="Nome (IT)"
                            className="rounded-lg border px-2 py-1 text-sm"
                            style={inputStyle}
                          />
                          <input
                            defaultValue={it.name_en}
                            onBlur={(e) => updateItem(it.id, "name_en", e.target.value)}
                            placeholder="Nome (EN) — opzionale"
                            className="rounded-lg border px-2 py-1 text-sm"
                            style={inputStyle}
                          />
                          <input
                            defaultValue={it.desc_it ?? ""}
                            onBlur={(e) => updateItem(it.id, "desc_it", e.target.value)}
                            placeholder="Descrizione (IT) — opzionale"
                            className="rounded-lg border px-2 py-1 text-sm"
                            style={inputStyle}
                          />
                          <input
                            defaultValue={it.desc_en ?? ""}
                            onBlur={(e) => updateItem(it.id, "desc_en", e.target.value)}
                            placeholder="Descrizione (EN) — opzionale"
                            className="rounded-lg border px-2 py-1 text-sm"
                            style={inputStyle}
                          />
                          <input
                            defaultValue={it.note_it ?? ""}
                            onBlur={(e) => updateItem(it.id, "note_it", e.target.value)}
                            placeholder="Nota (IT) — es. per 2 persone"
                            className="rounded-lg border px-2 py-1 text-sm"
                            style={inputStyle}
                          />
                          <input
                            type="text"
                            inputMode="decimal"
                            defaultValue={it.price ?? ""}
                            onBlur={(e) => {
                              const raw = e.target.value.trim().replace(",", ".");
                              const value = raw === "" ? null : Number(raw);
                              updateItem(it.id, "price", Number.isNaN(value as number) ? null : value);
                            }}
                            placeholder="Prezzo (vuoto = chiedi al banco)"
                            className="rounded-lg border px-2 py-1 text-sm"
                            style={inputStyle}
                          />
                        </div>
                        <SavedFlash show={flashField.startsWith(it.id)} />
                      </div>
                    ))}

                    <button
                      onClick={() => addItem(cat.id)}
                      className="self-start rounded-full border px-3 py-1.5 text-xs"
                      style={{ borderColor: "var(--line)" }}
                    >
                      + Aggiungi prodotto
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
