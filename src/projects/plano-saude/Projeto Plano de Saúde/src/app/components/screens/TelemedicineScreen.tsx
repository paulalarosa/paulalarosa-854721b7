import { motion } from "motion/react";
import { useState } from "react";
import { SubHeader } from "../SubHeader";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

const specialties = [
  { id: "clinico", label: "Clínico Geral", icon: "🩺", available: 8 },
  { id: "dermato", label: "Dermatologia", icon: "🧴", available: 3 },
  { id: "psico", label: "Psicologia", icon: "🧠", available: 5 },
  { id: "nutri", label: "Nutrição", icon: "🥗", available: 4 },
  { id: "pediatra", label: "Pediatria", icon: "👶", available: 2 },
  { id: "ortopedia", label: "Ortopedia", icon: "🦴", available: 1 },
];

const doctors = [
  {
    id: "1",
    name: "Dra. Camila Santos",
    spec: "Dermatologista",
    rating: 4.9,
    reviews: 324,
    nextSlot: "Agora",
    avatar: "https://images.unsplash.com/photo-1706565029539-d09af5896340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzE4NjEwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    available: true,
  },
  {
    id: "2",
    name: "Dr. Felipe Rocha",
    spec: "Clínico Geral",
    rating: 4.8,
    reviews: 512,
    nextSlot: "14:30",
    avatar: "https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTkzNzQwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    available: true,
  },
  {
    id: "3",
    name: "Dra. Juliana Melo",
    spec: "Psicóloga",
    rating: 5.0,
    reviews: 198,
    nextSlot: "15:00",
    avatar: "https://images.unsplash.com/photo-1673865641073-4479f93a7776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGRvY3RvciUyMHN0ZXRob3Njb3BlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxOTM4NjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    available: false,
  },
];

export function TelemedicineScreen() {
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

  return (
    <>
      <SubHeader title="Telemedicina" subtitle="Consulte online com especialistas" />

      {/* Hero */}
      <motion.div className="px-5 pb-4" variants={fade(0)} initial="hidden" animate="visible">
        <div
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ background: "linear-gradient(155deg, #6C5CE7 0%, #8B7CF0 100%)" }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)" }}>
                MÉDICOS ONLINE AGORA
              </span>
            </div>
            <p style={{ fontSize: "28px", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              12
            </p>
            <p style={{ fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>
              especialistas disponíveis
            </p>
          </div>
          <svg className="absolute top-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100">
            <circle cx="100" cy="0" r="60" fill="none" stroke="white" strokeWidth="0.8" />
            <circle cx="100" cy="0" r="40" fill="none" stroke="white" strokeWidth="0.8" />
          </svg>
        </div>
      </motion.div>

      {/* Specialty pills */}
      <motion.div className="px-5 pb-4" variants={fade(1)} initial="hidden" animate="visible">
        <p className="px-1 mb-2.5" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#8F8FA3" }}>
          ESPECIALIDADES
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {specialties.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSpec(selectedSpec === s.id ? null : s.id)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl outline-none transition-all active:scale-95"
              style={{
                background: selectedSpec === s.id ? "#0F0F23" : "#fff",
                border: `1px solid ${selectedSpec === s.id ? "#0F0F23" : "rgba(0,0,0,0.05)"}`,
              }}
            >
              <span style={{ fontSize: "14px" }}>{s.icon}</span>
              <span style={{ fontSize: "11px", fontWeight: 600, color: selectedSpec === s.id ? "#fff" : "#0F0F23" }}>
                {s.label}
              </span>
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  background: selectedSpec === s.id ? "rgba(255,255,255,0.15)" : "rgba(108,92,231,0.08)",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: selectedSpec === s.id ? "#fff" : "#6C5CE7",
                }}
              >
                {s.available}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Doctor list */}
      <div className="px-5 pb-6">
        <p className="px-1 mb-2.5" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#8F8FA3" }}>
          DISPONÍVEIS
        </p>
        {doctors.map((doc, i) => (
          <motion.div key={doc.id} variants={fade(2 + i)} initial="hidden" animate="visible" className="mb-2.5">
            <div
              className="rounded-2xl p-4 flex items-center gap-3.5"
              style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden" style={{ background: "#F0F0F5" }}>
                  <ImageWithFallback src={doc.avatar} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                {doc.available && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full" style={{ background: "#00C48C", border: "2px solid #FAFAFD" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F0F23", letterSpacing: "-0.01em" }}>{doc.name}</p>
                <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3" }}>{doc.spec}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFB347" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#0F0F23" }}>{doc.rating}</span>
                  <span style={{ fontSize: "10px", fontWeight: 400, color: "#B0B0C4" }}>({doc.reviews})</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span
                  className="inline-block px-2.5 py-1 rounded-lg mb-1.5"
                  style={{
                    background: doc.nextSlot === "Agora" ? "#E8FAF2" : "#F3F1FE",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: doc.nextSlot === "Agora" ? "#00C48C" : "#6C5CE7",
                  }}
                >
                  {doc.nextSlot}
                </span>
                <br />
                <button
                  className="px-3 py-1.5 rounded-lg outline-none transition-transform active:scale-95"
                  style={{ background: "#0F0F23", fontSize: "10px", fontWeight: 700, color: "#fff" }}
                >
                  Consultar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
