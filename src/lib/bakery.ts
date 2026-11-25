export const SITE = {
  name: "Kestrel & Kiln",
  slug: "kestrel-kiln",
  conceptUrl: "https://offshiftstudio.com.au/concepts/kestrel-kiln",
  studioUrl: "https://offshiftstudio.com.au",
  conceptLabel: "An OFF/SHIFT concept: fictional demonstration",
  /** The studio enquiry form, tagged with this concept. */
  enquiryUrl: "https://offshiftstudio.com.au/?concept=kestrel-kiln#contact",
  disclosure: "Fictional business: a concept site by OFF/SHIFT Studio",
  description:
    "Kestrel & Kiln is a fictional artisan bakery and cafe in Wattlebrook, Perth: slow-fermented sourdough, laminated pastry and a daily bake schedule. A concept website by OFF/SHIFT Studio.",
};

export const CAFE = {
  address: ["14 Millstone Lane", "Wattlebrook, Perth WA"],
  phone: "(08) 5550 0142",
  phoneHref: "+61855500142",
  email: "hello@kestrel-kiln.example",
  preorderCutoff: "6 pm the evening before",
  /** One rule everywhere: a bag waits one hour past the pickup time chosen, then goes on the counter. */
  holdMinutes: 60,
  holdRule: "Your bag is held for an hour after the pickup time you choose.",
};

export type ArtKind =
  | "boule"
  | "batard"
  | "tin"
  | "rye"
  | "croissant"
  | "almond"
  | "bun"
  | "kouign"
  | "danish"
  | "scroll"
  | "focaccia";

export type Category = "loaf" | "pastry";

/** Invented lab-label values. The business is fictional. */
export type Spec = {
  flour: string;
  hydration: string;
  ferment: string;
};

export type Product = {
  id: string;
  name: string;
  category: Category;
  art: ArtKind;
  price: number;
  /** index into BAKE_SLOTS: when this comes out of the oven */
  slot: number;
  blurb: string;
  detail: string;
  spec: Spec;
  signature?: boolean;
};

/** Times are minutes after midnight, Perth local time. */
export const BAKE_SLOTS = [
  { id: "0630", minutes: 6 * 60 + 30, label: "6:30 am", note: "First bake" },
  { id: "0700", minutes: 7 * 60, label: "7:00 am", note: "Laminated pastry" },
  { id: "0730", minutes: 7 * 60 + 30, label: "7:30 am", note: "Buns and sweet things" },
  { id: "0800", minutes: 8 * 60, label: "8:00 am", note: "Second loaves" },
  { id: "0900", minutes: 9 * 60, label: "9:00 am", note: "Cafe bake" },
  { id: "1030", minutes: 10 * 60 + 30, label: "10:30 am", note: "Late-morning bake" },
  { id: "1200", minutes: 12 * 60, label: "12:00 pm", note: "Midday bake" },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "country-sourdough",
    name: "Country Sourdough",
    category: "loaf",
    art: "boule",
    price: 950,
    slot: 0,
    signature: true,
    spec: { flour: "Stone-milled wheat", hydration: "78%", ferment: "18 h" },
    blurb: "A blistered crust over an open, mildly tangy crumb.",
    detail:
      "Our house loaf. Stone-milled wheat, a long cold ferment and a hard bake in the kiln until the crust sings.",
  },
  {
    id: "rye-caraway",
    name: "Rye & Caraway",
    category: "loaf",
    art: "rye",
    price: 1100,
    slot: 0,
    signature: true,
    spec: { flour: "Wholegrain rye", hydration: "85%", ferment: "16 h" },
    blurb: "A dense, dark loaf with a savoury rye bite.",
    detail:
      "Wholegrain rye with toasted caraway. Slice it thin, keep it a day, and it only gets better with salted butter.",
  },
  {
    id: "spelt-batard",
    name: "Seeded Spelt Batard",
    category: "loaf",
    art: "batard",
    price: 1150,
    slot: 3,
    signature: true,
    spec: { flour: "Spelt and mixed seed", hydration: "74%", ferment: "14 h" },
    blurb: "Sesame, sunflower and linseed in a nutty spelt dough.",
    detail:
      "A softer, sweeter crumb with a crackling seed crust. Built for toast, built for cheese.",
  },
  {
    id: "milk-tin",
    name: "Honey Oat Tin Loaf",
    category: "loaf",
    art: "tin",
    price: 1000,
    slot: 3,
    spec: { flour: "Wheat and rolled oats", hydration: "68%", ferment: "8 h" },
    blurb: "The sandwich loaf, done properly.",
    detail:
      "Baked in a tin for an even, tender slice with a toasty oat top. Soft enough for lunchboxes, good enough for the cafe.",
  },
  {
    id: "focaccia",
    name: "Rosemary & Sea Salt Focaccia",
    category: "loaf",
    art: "focaccia",
    price: 1300,
    slot: 6,
    spec: { flour: "Wheat and olive oil", hydration: "80%", ferment: "20 h" },
    blurb: "Olive oil pooled in the dimples, flaky salt on top.",
    detail:
      "A high, springy focaccia baked in the midday run, with plenty of oil pooled in every dimple.",
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    category: "pastry",
    art: "croissant",
    price: 650,
    slot: 1,
    signature: true,
    spec: { flour: "Wheat, cultured butter", hydration: "52%", ferment: "72 h" },
    blurb: "Shatter-crisp outside, honeycombed within.",
    detail:
      "Three days of folding with cold butter. Best eaten within the hour, ideally while still warm.",
  },
  {
    id: "almond-croissant",
    name: "Twice-Baked Almond Croissant",
    category: "pastry",
    art: "almond",
    price: 800,
    slot: 3,
    spec: { flour: "Wheat and frangipane", hydration: "52%", ferment: "72 h" },
    blurb: "Frangipane, toasted flaked almonds, icing sugar.",
    detail:
      "Yesterday's croissants, soaked in orange-blossom syrup, filled with frangipane and baked again until burnished.",
  },
  {
    id: "kouign-amann",
    name: "Kouign-Amann",
    category: "pastry",
    art: "kouign",
    price: 700,
    slot: 2,
    signature: true,
    spec: { flour: "Wheat, salted butter", hydration: "55%", ferment: "24 h" },
    blurb: "Caramelised edges and a salted butter centre.",
    detail:
      "Laminated dough folded with sugar and baked in a muffin ring until the edges turn deep amber.",
  },
  {
    id: "cardamom-bun",
    name: "Cardamom Morning Bun",
    category: "pastry",
    art: "bun",
    price: 650,
    slot: 2,
    spec: { flour: "Wheat and cardamom", hydration: "64%", ferment: "12 h" },
    blurb: "A knotted bun with cardamom and a sticky glaze.",
    detail:
      "Freshly ground cardamom, soft brioche-style dough, and a glaze of crust-gold syrup.",
  },
  {
    id: "cinnamon-scroll",
    name: "Brown Butter Cinnamon Scroll",
    category: "pastry",
    art: "scroll",
    price: 700,
    slot: 4,
    spec: { flour: "Wheat, brown butter", hydration: "66%", ferment: "10 h" },
    blurb: "Soft spirals under a whisper of icing.",
    detail:
      "A tender, pillowy scroll rolled with brown butter and cinnamon sugar. Warm from the oven at nine.",
  },
  {
    id: "fruit-danish",
    name: "Seasonal Fruit Danish",
    category: "pastry",
    art: "danish",
    price: 750,
    slot: 5,
    spec: { flour: "Wheat and pastry cream", hydration: "54%", ferment: "24 h" },
    blurb: "Vanilla custard and whatever is ripe.",
    detail:
      "Laminated pastry, pastry cream and the best fruit we can find that week, finished with an apricot glaze.",
  },
];

/** One product per screen, in plate order. Specimen pages are held for a later phase. */
export const PLATE_IDS = [
  "country-sourdough",
  "butter-croissant",
  "rye-caraway",
  "kouign-amann",
  "spelt-batard",
  "focaccia",
] as const;

export const PLATES = PLATE_IDS.map((id) => PRODUCTS.find((p) => p.id === id)!);

/** "12:00 pm" style label for minutes after midnight. */
export function clockLabel(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

/** Opening minutes for a pickup day name; Sunday opens later and closes earlier. */
export const dayHours = (day: string) =>
  day === "Sunday" ? { opens: 7 * 60, closes: 14 * 60 } : { opens: 6 * 60 + 30, closes: 15 * 60 };

export const cents = (n: number) => `$${(n / 100).toFixed(2)}`;

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);

export const slotProducts = (slotIndex: number) =>
  PRODUCTS.filter((p) => p.slot === slotIndex);

export const PICKUP_DAYS = [
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const HOURS: { day: string; short: string; open: string; days: number[] }[] = [
  { day: "Monday", short: "Mon", open: "Closed", days: [1] },
  { day: "Tuesday to Friday", short: "Tue–Fri", open: "6:30 am – 3:00 pm", days: [2, 3, 4, 5] },
  { day: "Saturday", short: "Sat", open: "6:30 am – 3:00 pm", days: [6] },
  { day: "Sunday", short: "Sun", open: "7:00 am – 2:00 pm", days: [0] },
];

export const PROCESS = [
  {
    title: "Local flour",
    body: "We buy wheat and rye milled in small batches from Western Australian growers. The flour arrives in paper sacks and the bags are never in a hurry.",
  },
  {
    title: "A living starter",
    body: "One sourdough culture, fed every morning and every night. It does the lifting, and it builds the flavour. There is no commercial yeast in our loaves.",
  },
  {
    title: "The slow ferment",
    body: "Dough rests overnight in the cold, a full day and a night, so the flavour has time to develop. Nothing is rushed, and nothing is sped up with additives.",
  },
  {
    title: "The kiln",
    body: "Loaves go onto a stone deck with a burst of steam. Pastry follows at a gentler heat. Everything comes out when it is ready, never when the clock says.",
  },
] as const;

/** Convert a Date to minutes after midnight and weekday in Perth (UTC+8, no DST). */
export function perthNow(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Perth",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hour = Number(get("hour")) % 24;
  return {
    minutes: hour * 60 + Number(get("minute")),
    weekday: weekdays.indexOf(get("weekday")),
  };
}

export function openStatus(now: { minutes: number; weekday: number }) {
  const { minutes, weekday } = now;
  if (weekday === 1) return { open: false, text: "Closed today (Monday). Back Tuesday from 6:30 am." };
  const opens = weekday === 0 ? 7 * 60 : 6 * 60 + 30;
  const closes = weekday === 0 ? 14 * 60 : 15 * 60;
  const openLabel = weekday === 0 ? "7:00 am" : "6:30 am";
  const closeLabel = weekday === 0 ? "2:00 pm" : "3:00 pm";
  if (minutes < opens) return { open: false, text: `Opens today at ${openLabel}.` };
  if (minutes >= closes)
    return {
      open: false,
      text: weekday === 0 ? "Closed for today. Back Tuesday from 6:30 am." : "Closed for today. See you in the morning.",
    };
  return { open: true, text: `Open now, until ${closeLabel}.` };
}
