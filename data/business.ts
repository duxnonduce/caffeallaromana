// Modifica pure questi dati quando cambiano orari, telefono o social.
// Non serve toccare nient'altro: il sito si aggiorna da solo al prossimo deploy.

export const business = {
  name: "Caffè alla Romana",
  address: "Via Alcide de Gasperi, 96, 73047 Monteroni di Lecce (LE)",
  mapsQuery: "Caffè alla Romana, Via Alcide de Gasperi 96, Monteroni di Lecce",
  phone: "379 124 5286",
  phoneHref: "tel:+393791245286",
  whatsappHref: "https://wa.me/393791245286",
  facebook: "https://www.facebook.com/share/1Bp29Y3HW7/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/caffe_alla_romana_2023",
  instagramHandle: "@caffe_alla_romana_2023",
  // orari: null = chiuso
  hours: [
    { day: { it: "Lunedì", en: "Monday" }, open: "05:00", close: "23:30" },
    { day: { it: "Martedì", en: "Tuesday" }, open: "05:00", close: "23:30" },
    { day: { it: "Mercoledì", en: "Wednesday" }, open: "05:00", close: "23:30" },
    { day: { it: "Giovedì", en: "Thursday" }, open: "05:00", close: "23:30" },
    { day: { it: "Venerdì", en: "Friday" }, open: "05:00", close: "23:30" },
    { day: { it: "Sabato", en: "Saturday" }, open: "06:00", close: "23:30" },
    { day: { it: "Domenica", en: "Sunday" }, open: null, close: null }
  ]
};

export type Business = typeof business;
