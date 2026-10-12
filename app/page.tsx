import { createClient } from "@/lib/supabase/server";
import MenuApp from "@/components/MenuApp";
import type { Business, Hour, Category, Item } from "@/lib/types";

// Sempre dati freschi: ogni modifica fatta dal pannello admin
// è visibile subito, senza bisogno di un nuovo deploy.
export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();

  const [businessRes, hoursRes, categoriesRes, itemsRes] = await Promise.all([
    supabase.from("business").select("*").limit(1).maybeSingle(),
    supabase.from("hours").select("*").order("day_index"),
    supabase.from("categories").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("items").select("*").order("sort_order")
  ]);

  const business = (businessRes.data as Business | null) ?? null;
  const hours = (hoursRes.data as Hour[] | null) ?? [];
  const categoriesRaw = (categoriesRes.data as Omit<Category, "items">[] | null) ?? [];
  const items = (itemsRes.data as Item[] | null) ?? [];

  const categories: Category[] = categoriesRaw.map((cat) => ({
    ...cat,
    items: items.filter((it) => it.category_id === cat.id)
  }));

  return <MenuApp business={business} hours={hours} categories={categories} />;
}
