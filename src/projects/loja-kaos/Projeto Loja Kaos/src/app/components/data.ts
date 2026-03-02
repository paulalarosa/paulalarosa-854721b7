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

export const products: Product[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1721111259873-5a13f7fcd67b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwaG9vZGllJTIwZGFyayUyMGZhc2hpb258ZW58MXx8fHwxNzcxOTM3NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1721111259873-5a13f7fcd67b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwaG9vZGllJTIwZGFyayUyMGZhc2hpb258ZW58MXx8fHwxNzcxOTM3NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1760245773960-200dbe893696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFzaGlvbiUyMG91dGZpdCUyMGZ1bGwlMjBib2R5JTIwc3R1ZGlvfGVufDF8fHx8MTc3MjQ2MTAzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    name: "Moletom Oversize Caos V2",
    price: "R$ 489,00",
    priceNum: 489,
    tag: "NOVO",
    category: "moletons",
    sizes: ["P", "M", "G", "GG"],
    description: "Moletom oversize em algodao organico 380g com estampa exclusiva da colecao Caos Control SS26. Corte drop-shoulder com punhos canelados.",
    details: ["Algodao organico 380g/m2", "Corte drop-shoulder", "Estampa serigrafia HD", "Lavagem stone"],
    color: "PRETO",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1687586370477-61a724a32c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHN0cmVldCUyMGZhc2hpb24lMjBqYWNrZXQlMjBibGFja3xlbnwxfHx8fDE3NzE5Mzc3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1687586370477-61a724a32c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHN0cmVldCUyMGZhc2hpb24lMjBqYWNrZXQlMjBibGFja3xlbnwxfHx8fDE3NzE5Mzc3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    name: "Jaqueta Prata Technica",
    price: "R$ 729,00",
    priceNum: 729,
    tag: "ESGOTANDO",
    category: "jaquetas",
    sizes: ["P", "M", "G"],
    description: "Jaqueta tecnica com acabamento prata refletivo. Tecido impermeavel com forro termico e bolsos selados.",
    details: ["Tecido impermeavel", "Forro termico", "Bolsos selados", "Acabamento refletivo"],
    color: "PRATA",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1658043521335-998c9fae1a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHN0cmVldHdlYXIlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzE5Mzc3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1658043521335-998c9fae1a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHN0cmVldHdlYXIlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzE5Mzc3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    name: "Sneaker Vortex 3.0",
    price: "R$ 899,00",
    priceNum: 899,
    category: "tenis",
    sizes: ["38", "39", "40", "41", "42", "43"],
    description: "Sneaker em couro sintetico com sola de EVA. Design futurista inspirado na estetica Y2K.",
    details: ["Couro sintetico premium", "Sola EVA injecao", "Palmilha removivel", "Peso: 320g"],
    color: "PRETO/BRANCO",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1618902543712-5167afb37421?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNod2VhciUyMGZhc2hpb24lMjBkYXJrJTIwZnV0dXJpc3RpY3xlbnwxfHx8fDE3NzE5Mzc3NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1618902543712-5167afb37421?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNod2VhciUyMGZhc2hpb24lMjBkYXJrJTIwZnV0dXJpc3RpY3xlbnwxfHx8fDE3NzE5Mzc3NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    name: "Conjunto Techwear X9",
    price: "R$ 1.199,00",
    priceNum: 1199,
    tag: "EXCLUSIVO",
    category: "conjuntos",
    sizes: ["P", "M", "G"],
    description: "Conjunto completo techwear. Calca cargo + jaqueta utilitaria com bolsos selados e acabamento DWR.",
    details: ["Calca + jaqueta", "Acabamento DWR", "Bolsos selados", "Fitas refletivas"],
    color: "PRETO",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1758267928031-a87e5a5c6c5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2FyZ28lMjBwYW50cyUyMGZhc2hpb258ZW58MXx8fHwxNzcxOTM3Nzc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1758267928031-a87e5a5c6c5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2FyZ28lMjBwYW50cyUyMGZhc2hpb258ZW58MXx8fHwxNzcxOTM3Nzc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1763609973499-f2791a7e6a61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwcGFudHMlMjBjYXJnbyUyMGJsYWNrfGVufDF8fHx8MTc3MjQ2MTAzNHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    name: "Calca Cargo Distorted",
    price: "R$ 549,00",
    priceNum: 549,
    category: "calcas",
    sizes: ["36", "38", "40", "42", "44"],
    description: "Calca cargo com corte wide-leg e bolsos laterais oversized. Algodao ripstop 280g.",
    details: ["Algodao ripstop 280g", "Wide-leg fit", "6 bolsos", "Barra ajustavel"],
    color: "PRETO",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1738754681329-e1671088de9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwYWNjZXNzb3JpZXMlMjBjaGFpbiUyMHNpbHZlcnxlbnwxfHx8fDE3NzE5Mzc3NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1738754681329-e1671088de9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwYWNjZXNzb3JpZXMlMjBjaGFpbiUyMHNpbHZlcnxlbnwxfHx8fDE3NzE5Mzc3NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1601244732063-bcaac519db4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjByaW5nJTIwamV3ZWxyeSUyMG1pbmltYWwlMjBkYXJrfGVufDF8fHx8MTc3MjQ2MTAzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    name: "Corrente Prata 925",
    price: "R$ 349,00",
    priceNum: 349,
    category: "acessorios",
    sizes: ["50cm", "60cm"],
    description: "Corrente em prata 925 com banho rodio. Fecho magnetico exclusivo VRTX.",
    details: ["Prata 925", "Banho rodio", "Fecho magnetico", "Caixa exclusiva"],
    color: "PRATA",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1708944342552-5a887cc66aa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwYm9tYmVyJTIwamFja2V0JTIwZGFya3xlbnwxfHx8fDE3NzE5Mzg1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1708944342552-5a887cc66aa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwYm9tYmVyJTIwamFja2V0JTIwZGFya3xlbnwxfHx8fDE3NzE5Mzg1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    name: "Bomber Void Preta",
    price: "R$ 659,00",
    priceNum: 659,
    tag: "NOVO",
    category: "jaquetas",
    sizes: ["P", "M", "G", "GG"],
    description: "Bomber jacket com forro acolchoado e bordado VRTX nas costas. Ziper YKK bidirecional.",
    details: ["Forro acolchoado", "Bordado VRTX", "Ziper YKK", "Punhos elasticos"],
    color: "PRETO",
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1628453208660-b0dd0daac755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGFjY2Vzc29yaWVzJTIwZGFya3xlbnwxfHx8fDE3NzE5Mzg1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1628453208660-b0dd0daac755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGFjY2Vzc29yaWVzJTIwZGFya3xlbnwxfHx8fDE3NzE5Mzg1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    name: "Anel Geometrico VRTX",
    price: "R$ 199,00",
    priceNum: 199,
    category: "acessorios",
    sizes: ["16", "18", "20", "22"],
    description: "Anel em aco cirurgico com design geometrico angular. Acabamento escovado.",
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
    title: "VOID",
    subtitle: "COLLECTION",
    image: "https://images.unsplash.com/photo-1770752724428-10f43a3a0357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFzaGlvbiUyMGVkaXRvcmlhbCUyMHN0dWRpb3xlbnwxfHx8fDE3NzE5Mzg1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "04 MAR 2026",
    status: "upcoming",
    pieces: 50,
  },
  {
    id: "d2",
    title: "CHROME",
    subtitle: "CAPSULE",
    image: "https://images.unsplash.com/photo-1764698192455-9ee9d80d22a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY29sbGVjdGlvbiUyMGRpc3BsYXklMjBtaW5pbWFsfGVufDF8fHx8MTc3MTkzODU4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "15 MAR 2026",
    status: "upcoming",
    pieces: 30,
  },
  {
    id: "d3",
    title: "CAOS",
    subtitle: "CONTROL SS26",
    image: "https://images.unsplash.com/photo-1768825197238-629b1ae2dc18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFzaGlvbiUyMG1vZGVsJTIwZWRpdG9yaWFsJTIwdXJiYW58ZW58MXx8fHwxNzcxOTM3Nzc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
