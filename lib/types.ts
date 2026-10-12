export type Lang = "it" | "en";

export type Business = {
  id: string;
  name: string;
  tagline: string;
  address: string;
  maps_query: string;
  phone: string;
  phone_href: string;
  instagram: string;
  facebook: string;
  logo_url: string | null;
  hero_url: string | null;
};

export type Hour = {
  id: number;
  day_index: number;
  day_it: string;
  day_en: string;
  open_time: string | null;
  close_time: string | null;
};

export type Item = {
  id: string;
  category_id: string;
  name_it: string;
  name_en: string;
  desc_it: string | null;
  desc_en: string | null;
  note_it: string | null;
  note_en: string | null;
  price: number | null;
  is_available: boolean;
  sort_order: number;
};

export type Category = {
  id: string;
  name_it: string;
  name_en: string;
  sort_order: number;
  is_active: boolean;
  items: Item[];
};
