import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Wrench,
  MapPin,
  Star,
  Phone,
  Clock,
  Navigation,
  Filter,
  ChevronRight,
} from "lucide-react";
import { hapticLight, hapticTick } from "../haptics";

interface OficinasScreenProps {
  onBack: () => void;
}

interface Oficina {
  id: string;
  name: string;
  specialty: string;
  distance: string;
  rating: number;
  reviews: number;
  address: string;
  hours: string;
  phone: string;
  tags: string[];
}

const oficinas: Oficina[] = [
  {
    id: "1",
    name: "Auto Center Paulista",
    specialty: "Mecanica geral · Funilaria",
    distance: "1.2 km",
    rating: 4.8,
    reviews: 234,
    address: "Av. Paulista, 1500 - Bela Vista",
    hours: "08:00 - 18:00",
    phone: "(11) 3456-7890",
    tags: ["Credenciada", "Mais proxima"],
  },
  {
    id: "2",
    name: "Oficina Premium Cars",
    specialty: "Hyundai · Honda · Toyota",
    distance: "2.8 km",
    rating: 4.9,
    reviews: 189,
    address: "R. Augusta, 800 - Consolacao",
    hours: "08:00 - 19:00",
    phone: "(11) 3456-1234",
    tags: ["Credenciada", "Especialista"],
  },
  {
    id: "3",
    name: "Fast Fix Auto",
    specialty: "Eletrica · Diagnostico",
    distance: "3.5 km",
    rating: 4.6,
    reviews: 156,
    address: "R. da Consolacao, 1200",
    hours: "07:30 - 17:30",
    phone: "(11) 3456-5678",
    tags: ["Credenciada"],
  },
  {
    id: "4",
    name: "Garage Moema",
    specialty: "Funilaria · Pintura",
    distance: "5.1 km",
    rating: 4.7,
    reviews: 312,
    address: "Al. dos Maracatins, 400 - Moema",
    hours: "08:00 - 18:00",
    phone: "(11) 3456-9012",
    tags: ["Credenciada", "Popular"],
  },
];

export function OficinasScreen({ onBack }: OficinasScreenProps) {
  const [selected, setSelected] = useState<Oficina | null>(null);
  const [filter, setFilter] = useState<"all" | "proxima" | "rating">("all");

  const sorted = [...oficinas].sort((a, b) => {
    if (filter === "proxima") return parseFloat(a.distance) - parseFloat(b.distance);
    if (filter === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <div className="px-5 sm:px-6">
        <div className="flex items-center gap-3 pt-2 pb-5">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => { hapticLight(); onBack(); }}
            className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100/60 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#0D9488]"
            aria-label="Voltar"
          >
            <ChevronLeft size={16} className="text-[#0F172A]" strokeWidth={1.8} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-[20px] text-[#0F172A] tracking-tight">Oficinas</h1>
            <p className="text-[11px] text-gray-400">340+ credenciadas</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#6366F1]/8 flex items-center justify-center">
            <Wrench size={17} className="text-[#6366F1]" strokeWidth={1.6} />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {[
            { key: "all" as const, label: "Todas" },
            { key: "proxima" as const, label: "Mais proximas" },
            { key: "rating" as const, label: "Melhor avaliadas" },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => { hapticTick(); setFilter(f.key); }}
              className={`px-3.5 py-2 rounded-xl text-[11px] tracking-wide whitespace-nowrap transition-all ${
                filter === f.key
                  ? "bg-[#0F172A] text-white"
                  : "bg-white text-gray-500 border border-gray-100/60"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <button
                onClick={() => { hapticLight(); setSelected(null); }}
                className="flex items-center gap-1 text-[11px] text-gray-400 mb-4"
              >
                <ChevronLeft size={14} /> Voltar para lista
              </button>

              <div className="rounded-2xl bg-white border border-gray-100/60 p-5 mb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-[16px] text-[#0F172A] tracking-tight">{selected.name}</h2>
                    <p className="text-[11px] text-gray-400 mt-0.5">{selected.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50">
                    <Star size={11} className="text-amber-500 fill-amber-500" />
                    <span className="text-[11px] text-amber-700">{selected.rating}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: MapPin, text: selected.address },
                    { icon: Clock, text: selected.hours },
                    { icon: Phone, text: selected.phone },
                    { icon: Navigation, text: `${selected.distance} de voce` },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
                        <item.icon size={13} className="text-gray-400" strokeWidth={1.5} />
                      </div>
                      <span className="text-[12px] text-gray-600">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {selected.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-[#0D9488]/6 text-[9px] text-[#0D9488] uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2.5">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0F172A] text-[13px] text-white"
                >
                  <Phone size={14} strokeWidth={1.6} />
                  Ligar
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0D9488] text-[13px] text-white"
                >
                  <Navigation size={14} strokeWidth={1.6} />
                  Navegar
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2.5"
            >
              {sorted.map((oficina, i) => (
                <motion.button
                  key={oficina.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { hapticLight(); setSelected(oficina); }}
                  className="w-full text-left p-4 rounded-2xl bg-white border border-gray-100/60"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[13px] text-[#0F172A] tracking-tight">{oficina.name}</p>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="text-amber-500 fill-amber-500" />
                      <span className="text-[11px] text-gray-600">{oficina.rating}</span>
                      <span className="text-[9px] text-gray-300">({oficina.reviews})</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mb-2">{oficina.specialty}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <MapPin size={10} className="text-gray-300" />
                      <span className="text-[10px] text-gray-400">{oficina.distance}</span>
                    </div>
                    <div className="flex gap-1">
                      {oficina.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-[#0D9488]/6 text-[8px] text-[#0D9488] uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-8" />
    </div>
  );
}
