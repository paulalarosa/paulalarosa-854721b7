export interface Product {
  id: string;
  image: string;
  images: string[];
  name: string;
  price: string;
  priceNum: number;
  tag?: string;
  category: string;
  sizes: string[];
  description: string;
  details: string[];
  color: string;
}

const KAOS_IMG_PATH = "/img/kaos/";

const createKaosImage = (name: string) => `${KAOS_IMG_PATH}${name}.webp`;

export const products: Product[] = [
  {
    id: "1",
    image: createKaosImage("kaos_hoodie"),
    images: [createKaosImage("kaos_hoodie")],
    name: "Moletom KAOS Heavy Fleece",
    price: "R$ 489,00",
    priceNum: 489,
    tag: "NOVO",
    category: "moletons",
    sizes: ["P", "M", "G", "GG"],
    description: "Moletom oversize em algodão orgânico 380g com estampa exclusiva da coleção KAOS Control SS26.",
    details: ["Algodao organico 380g/m2", "Corte drop-shoulder", "Estampa serigrafia HD", "Lavagem stone"],
    color: "PRETO",
  },
  {
    id: "2",
    image: createKaosImage("kaos_puffer"),
    images: [createKaosImage("kaos_puffer")],
    name: "Jaqueta Puffer Metálica",
    price: "R$ 729,00",
    priceNum: 729,
    tag: "ESGOTANDO",
    category: "jaquetas",
    sizes: ["P", "M", "G"],
    description: "Jaqueta técnica com acabamento prata refletivo. Tecido impermeável com forro térmico.",
    details: ["Tecido impermeavel", "Forro termico", "Bolsos selados", "Acabamento refletivo"],
    color: "PRATA",
  },
  {
    id: "3",
    image: createKaosImage("kaos_sneaker"),
    images: [createKaosImage("kaos_sneaker")],
    name: "Tênis Chunky KAOS 01",
    price: "R$ 899,00",
    priceNum: 899,
    category: "tenis",
    sizes: ["38", "39", "40", "41", "42", "43"],
    description: "Sneaker em couro sintético com sola de EVA. Design futurista inspirado na estética Y2K.",
    details: ["Couro sintetico premium", "Sola EVA injecao", "Palmilha removivel", "Peso: 320g"],
    color: "PRETO/BRANCO",
  },
  {
    id: "4",
    image: createKaosImage("kaos_techwear"),
    images: [createKaosImage("kaos_techwear")],
    name: "Set Techwear Utilitário",
    price: "R$ 1.199,00",
    priceNum: 1199,
    tag: "EXCLUSIVO",
    category: "conjuntos",
    sizes: ["P", "M", "G"],
    description: "Conjunto completo techwear. Calca cargo + jaqueta utilitária com bolsos selados.",
    details: ["Calca + jaqueta", "Acabamento DWR", "Bolsos selados", "Fitas refletivas"],
    color: "PRETO",
  },
  {
    id: "5",
    image: createKaosImage("kaos_cargo"),
    images: [createKaosImage("kaos_cargo")],
    name: "Calça Cargo Wide KAOS",
    price: "R$ 549,00",
    priceNum: 549,
    category: "calcas",
    sizes: ["36", "38", "40", "42", "44"],
    description: "Calça cargo com corte wide-leg e bolsos laterais oversized. Algodão ripstop 280g.",
    details: ["Algodao ripstop 280g", "Wide-leg fit", "6 bolsos", "Barra ajustavel"],
    color: "PRETO",
  },
  {
    id: "6",
    image: createKaosImage("kaos_necklace"),
    images: [createKaosImage("kaos_necklace")],
    name: "Colar Prata Oxidado",
    price: "R$ 349,00",
    priceNum: 349,
    category: "acessorios",
    sizes: ["50cm", "60cm"],
    description: "Corrente em prata 925 com banho ródio. Fecho magnético exclusivo VRTX.",
    details: ["Prata 925", "Banho rodio", "Fecho magnetico", "Caixa exclusiva"],
    color: "PRATA",
  },
  {
    id: "7",
    image: createKaosImage("kaos_bomber"),
    images: [createKaosImage("kaos_bomber")],
    name: "Bomber KAOS Preta",
    price: "R$ 659,00",
    priceNum: 659,
    tag: "NOVO",
    category: "jaquetas",
    sizes: ["P", "M", "G", "GG"],
    description: "Bomber jacket com forro acolchoado e bordado VRTX nas costas.",
    details: ["Forro acolchoado", "Bordado VRTX", "Ziper YKK", "Punhos elasticos"],
    color: "PRETO",
  },
  {
    id: "8",
    image: createKaosImage("kaos_ring"),
    images: [createKaosImage("kaos_ring")],
    name: "Anel Angular Prateado",
    price: "R$ 199,00",
    priceNum: 199,
    category: "acessorios",
    sizes: ["16", "18", "20", "22"],
    description: "Anel em aço cirúrgico com design geométrico angular. Acabamento escovado.",
    details: ["Aco cirurgico 316L", "Design angular", "Acabamento escovado", "Hipoalergenico"],
    color: "PRATA",
  },
];

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Drop {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  date: string;
  status: "upcoming" | "live" | "ended";
  pieces: number;
}

export const drops: Drop[] = [
  {
    id: "d1",
    title: "SOMBRA",
    subtitle: "COLEÇÃO",
    image: createKaosImage("kaos_drop_sombra"),
    date: "04 MAR 2026",
    status: "upcoming",
    pieces: 50,
  },
  {
    id: "d2",
    title: "ESPELHO",
    subtitle: "CÁPSULA",
    image: createKaosImage("kaos_drop_espelho"),
    date: "15 MAR 2026",
    status: "upcoming",
    pieces: 30,
  },
  {
    id: "d3",
    title: "KAOS",
    subtitle: "SS26 — AO VIVO",
    image: createKaosImage("kaos_drop_live"),
    date: "AO VIVO",
    status: "live",
    pieces: 12,
  },
];

export type ScreenType =
  | "home" | "explore" | "drops" | "bag" | "perfil"
  | "product-detail" | "orders" | "wishlist" | "addresses"
  | "payment" | "notifications" | "sizes-pref" | "help"
  | "returns" | "terms";

export interface ScreenState {
  type: ScreenType;
  productId?: string;
}
