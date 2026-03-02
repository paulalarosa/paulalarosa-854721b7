import { motion } from "motion/react";
import { useState } from "react";
import { SubHeader } from "../SubHeader";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

const categories = [
  { id: "all", label: "Todos" },
  { id: "cardiologia", label: "Cardiologia" },
  { id: "dermatologia", label: "Dermatologia" },
  { id: "ortopedia", label: "Ortopedia" },
  { id: "pediatria", label: "Pediatria" },
  { id: "neurologia", label: "Neurologia" },
];

const doctors = [
  {
    id: "1", name: "Dr. Roberto Almeida", spec: "Cardiologista", distance: "1.2 km",
    address: "Rua das Flores, 230", rating: 4.9, price: "R$ 0", nextDate: "Hoje, 14h",
    avatar: "https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTkzNzQwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "2", name: "Dra. Camila Santos", spec: "Dermatologista", distance: "2.5 km",
    address: "Av. Paulista, 1500", rating: 4.9, price: "R$ 0", nextDate: "Amanhã, 10h",
    avatar: "https://images.unsplash.com/photo-1706565029539-d09af5896340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzE4NjEwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "3", name: "Dr. Paulo Fernandes", spec: "Ortopedista", distance: "3.1 km",
    address: "Rua Augusta, 890", rating: 4.7, price: "R$ 0", nextDate: "Seg, 09h",
    avatar: "https://images.unsplash.com/photo-1758691463606-1493d79cc577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBjb25zdWx0YXRpb24lMjBvZmZpY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzcxOTQwMzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "4", name: "Dra. Ana Ribeiro", spec: "Neurologista", distance: "4.8 km",
    address: "Rua Oscar Freire, 120", rating: 5.0, price: "R$ 0", nextDate: "Ter, 15h",
    avatar: "https://images.unsplash.com/photo-1673865641073-4479f93a7776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGRvY3RvciUyMHN0ZXRob3Njb3BlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxOTM4NjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function FindDoctorScreen() {
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <>
      <SubHeader title="Encontrar Médico" subtitle="Especialistas perto de você" />

      {/* Search */}
      <motion.div className="px-5 pb-3" variants={fade(0)} initial="hidden" animate="visible">
        <div
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
          style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.05)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0B0C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nome, especialidade ou local..."
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: "13px", fontWeight: 400, color: "#0F0F23" }}
            aria-label="Buscar médico"
          />
          {search && (
            <button onClick={() => setSearch("")} className="outline-none" aria-label="Limpar busca">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B0B0C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div className="px-5 pb-4" variants={fade(1)} initial="hidden" animate="visible">
        <div className="flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className="shrink-0 px-3 py-1.5 rounded-lg outline-none transition-all active:scale-95"
              style={{
                background: active === c.id ? "#0F0F23" : "transparent",
                border: `1px solid ${active === c.id ? "#0F0F23" : "rgba(0,0,0,0.06)"}`,
                fontSize: "11px",
                fontWeight: 600,
                color: active === c.id ? "#fff" : "#8F8FA3",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Location pill */}
      <motion.div className="px-5 pb-4" variants={fade(2)} initial="hidden" animate="visible">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "#F3F1FE" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#6C5CE7" stroke="none">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" fill="#F3F1FE" />
          </svg>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#6C5CE7" }}>
            São Paulo, SP — raio de 10km
          </span>
          <button className="ml-auto outline-none" aria-label="Alterar localização">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Doctor list */}
      <div className="px-5 pb-6">
        <p className="px-1 mb-2.5" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#8F8FA3" }}>
          {doctors.length} RESULTADOS
        </p>
        {doctors.map((doc, i) => (
          <motion.button
            key={doc.id}
            variants={fade(3 + i)}
            initial="hidden"
            animate="visible"
            className="w-full text-left rounded-2xl mb-2.5 overflow-hidden outline-none transition-transform active:scale-[0.98]"
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}
            aria-label={`${doc.name}, ${doc.spec}, ${doc.distance}`}
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0" style={{ background: "#F0F0F5" }}>
                  <ImageWithFallback src={doc.avatar} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F0F23", letterSpacing: "-0.01em" }}>{doc.name}</p>
                  <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3" }}>{doc.spec}</p>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFB347" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#0F0F23" }}>{doc.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#B0B0C4" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  </svg>
                  <span style={{ fontSize: "10px", fontWeight: 500, color: "#8F8FA3" }}>{doc.distance}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#B0B0C4" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span style={{ fontSize: "10px", fontWeight: 500, color: "#8F8FA3" }}>{doc.nextDate}</span>
                </div>
                <span className="ml-auto px-2 py-0.5 rounded-md" style={{ background: "#E8FAF2", fontSize: "10px", fontWeight: 700, color: "#00C48C" }}>
                  {doc.price}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </>
  );
}
