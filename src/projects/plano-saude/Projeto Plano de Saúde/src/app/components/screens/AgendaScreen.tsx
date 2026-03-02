import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

const weekDays = [
  { key: "seg", label: "S", num: 24 },
  { key: "ter", label: "T", num: 25, active: true, events: 2 },
  { key: "qua", label: "Q", num: 26 },
  { key: "qui", label: "Q", num: 27, events: 1 },
  { key: "sex", label: "S", num: 28 },
  { key: "sab", label: "S", num: 29 },
  { key: "dom", label: "D", num: 30 },
];

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  time: string;
  duration: string;
  type: "presencial" | "online";
  avatar: string;
  color: string;
  location?: string;
}

const upcomingAppts: Appointment[] = [
  {
    id: "1",
    doctor: "Dr. Roberto Almeida",
    specialty: "Cardiologista",
    time: "14:00",
    duration: "45min",
    type: "presencial",
    avatar: "https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTkzNzQwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#6C5CE7",
    location: "Clínica Bem Estar",
  },
  {
    id: "2",
    doctor: "Dra. Camila Santos",
    specialty: "Dermatologista",
    time: "16:30",
    duration: "30min",
    type: "online",
    avatar: "https://images.unsplash.com/photo-1706565029539-d09af5896340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzE4NjEwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#00C48C",
  },
];

const pastAppts: Appointment[] = [
  {
    id: "3",
    doctor: "Dra. Ana Ribeiro",
    specialty: "Oftalmologista",
    time: "10:00",
    duration: "30min",
    type: "presencial",
    avatar: "https://images.unsplash.com/photo-1673865641073-4479f93a7776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGRvY3RvciUyMHN0ZXRob3Njb3BlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxOTM4NjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#FFB347",
    location: "Hospital São Lucas",
  },
];

type Tab = "proximas" | "historico";

export function AgendaScreen() {
  const [tab, setTab] = useState<Tab>("proximas");
  const appts = tab === "proximas" ? upcomingAppts : pastAppts;
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <motion.header
        className="px-7 pt-5 pb-3"
        initial="hidden" animate="visible" variants={fadeUp} custom={0}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0F0F23", letterSpacing: "-0.03em" }}>
              Agenda
            </h1>
            <p style={{ fontSize: "12px", fontWeight: 500, color: "#8F8FA3", marginTop: "1px" }}>
              Fevereiro 2026
            </p>
          </div>
          <button
            className="w-10 h-10 rounded-[13px] flex items-center justify-center outline-none transition-transform active:scale-90"
            style={{ background: "linear-gradient(135deg, #6C5CE7, #8B7CF0)", boxShadow: "0 4px 14px rgba(108,92,231,0.3)" }}
            aria-label="Agendar nova consulta"
            onClick={() => navigate("/agendar")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Week Strip */}
      <motion.section
        className="px-5 pb-5"
        initial="hidden" animate="visible" variants={fadeUp} custom={1}
        aria-label="Calendário semanal"
      >
        <div className="flex gap-1.5" role="listbox" aria-label="Dias da semana">
          {weekDays.map((d) => (
            <button
              key={d.key}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-[14px] outline-none transition-all"
              style={{
                background: d.active ? "#0F0F23" : "transparent",
              }}
              role="option"
              aria-selected={d.active}
              aria-label={`${d.label}, dia ${d.num}${d.events ? `, ${d.events} evento${d.events > 1 ? "s" : ""}` : ""}`}
            >
              <span style={{ fontSize: "10px", fontWeight: 500, color: d.active ? "rgba(255,255,255,0.45)" : "#B0B0C4" }}>
                {d.label}
              </span>
              <span style={{ fontSize: "16px", fontWeight: 700, color: d.active ? "#fff" : "#0F0F23", letterSpacing: "-0.01em" }}>
                {d.num}
              </span>
              {d.events && (
                <div className="flex gap-0.5">
                  {Array.from({ length: Math.min(d.events, 3) }).map((_, j) => (
                    <div
                      key={j}
                      className="w-1 h-1 rounded-full"
                      style={{ background: d.active ? "#6C5CE7" : "#6C5CE7" }}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Tabs */}
      <motion.div
        className="px-7 pb-4"
        initial="hidden" animate="visible" variants={fadeUp} custom={2}
      >
        <div className="flex gap-1 p-1 rounded-[13px]" style={{ background: "#F0F0F5" }} role="tablist">
          {(["proximas", "historico"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2 rounded-[10px] outline-none transition-all"
              style={{
                background: tab === t ? "#fff" : "transparent",
                boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
              }}
              role="tab"
              aria-selected={tab === t}
            >
              <span style={{ fontSize: "12px", fontWeight: tab === t ? 700 : 500, color: tab === t ? "#0F0F23" : "#8F8FA3" }}>
                {t === "proximas" ? "Próximas" : "Histórico"}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Timeline Appointments */}
      <div className="px-5 pb-6" role="list" aria-label={tab === "proximas" ? "Próximas consultas" : "Consultas anteriores"}>
        {appts.map((apt, i) => (
          <motion.article
            key={apt.id}
            initial="hidden" animate="visible" variants={fadeUp} custom={3 + i}
            className="relative pl-8 pb-5"
            role="listitem"
          >
            {/* Timeline line */}
            {i < appts.length - 1 && (
              <div
                className="absolute left-[11px] top-7 bottom-0 w-[1.5px]"
                style={{ background: "linear-gradient(180deg, #E0E0EC, transparent)" }}
                aria-hidden="true"
              />
            )}
            {/* Timeline dot */}
            <div className="absolute left-0 top-1.5" aria-hidden="true">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: `${apt.color}15` }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: apt.color }} />
              </div>
            </div>

            {/* Time label */}
            <div className="flex items-center gap-2 mb-2.5">
              <span style={{ fontSize: "20px", fontWeight: 800, color: "#0F0F23", letterSpacing: "-0.03em" }}>
                {apt.time}
              </span>
              <span style={{ fontSize: "11px", fontWeight: 500, color: "#B0B0C4" }}>
                · {apt.duration}
              </span>
              <div
                className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{
                  background: apt.type === "online" ? "#E8FAF2" : "#F3F1FE",
                }}
              >
                {apt.type === "online" ? (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="#00C48C"><circle cx="12" cy="12" r="6" /></svg>
                ) : (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="3"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /></svg>
                )}
                <span style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  color: apt.type === "online" ? "#00C48C" : "#6C5CE7",
                  letterSpacing: "0.02em",
                }}>
                  {apt.type === "online" ? "ONLINE" : "PRESENCIAL"}
                </span>
              </div>
            </div>

            {/* Card */}
            <div
              className="rounded-[20px] overflow-hidden"
              style={{ background: "#fff", boxShadow: "0 1px 4px rgba(15,15,35,0.04), 0 6px 20px rgba(15,15,35,0.04)" }}
            >
              <div className="p-4 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-[14px] overflow-hidden flex-shrink-0" style={{ background: "#F0F0F5" }}>
                  <ImageWithFallback
                    src={apt.avatar}
                    alt={`Foto de ${apt.doctor}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#0F0F23", letterSpacing: "-0.01em" }}>
                    {apt.doctor}
                  </p>
                  <p style={{ fontSize: "12px", fontWeight: 400, color: "#8F8FA3" }}>
                    {apt.specialty}{apt.location ? ` · ${apt.location}` : ""}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 pb-3 flex gap-2">
                {tab === "proximas" ? (
                  <>
                    <button
                      className="flex-1 py-2.5 rounded-[12px] outline-none transition-transform active:scale-95"
                      style={{ background: apt.color, fontSize: "12px", fontWeight: 700, color: "#fff" }}
                      aria-label={apt.type === "online" ? `Iniciar consulta online com ${apt.doctor}` : `Ver detalhes da consulta com ${apt.doctor}`}
                      onClick={() => navigate(apt.type === "online" ? "/telemedicina" : "/encontrar-medico")}
                    >
                      {apt.type === "online" ? "Iniciar chamada" : "Ver detalhes"}
                    </button>
                    <button
                      className="py-2.5 px-4 rounded-[12px] outline-none transition-transform active:scale-95"
                      style={{ background: "#F0F0F5", fontSize: "12px", fontWeight: 600, color: "#8F8FA3" }}
                      aria-label={`Remarcar consulta com ${apt.doctor}`}
                      onClick={() => navigate("/agendar")}
                    >
                      Remarcar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="flex-1 py-2.5 rounded-[12px] outline-none transition-transform active:scale-95"
                      style={{ background: "#F3F1FE", fontSize: "12px", fontWeight: 600, color: "#6C5CE7" }}
                      aria-label={`Reagendar com ${apt.doctor}`}
                      onClick={() => navigate("/agendar")}
                    >
                      Reagendar
                    </button>
                    <button
                      className="flex-1 py-2.5 rounded-[12px] outline-none transition-transform active:scale-95"
                      style={{ background: "#F0F0F5", fontSize: "12px", fontWeight: 600, color: "#8F8FA3" }}
                      aria-label={`Ver prontuário de ${apt.doctor}`}
                      onClick={() => navigate("/exames")}
                    >
                      Prontuário
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.article>
        ))}

        {appts.length === 0 && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="text-center py-10">
            <p style={{ fontSize: "14px", fontWeight: 500, color: "#8F8FA3" }}>
              Nenhuma consulta encontrada
            </p>
          </motion.div>
        )}
      </div>

      {/* Suggested doctors section */}
      {tab === "proximas" && (
        <motion.section
          className="px-5 pb-6"
          initial="hidden" animate="visible" variants={fadeUp} custom={6}
          aria-label="Médicos sugeridos para você"
        >
          <div className="px-2 mb-3">
            <p style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.14em", color: "#8F8FA3" }}>
              SUGERIDO PARA VOCÊ
            </p>
          </div>
          <div
            className="rounded-[20px] p-4 flex items-center gap-3.5"
            style={{ background: "#F8F7FF", border: "1px solid #EDEAFD" }}
          >
            <div className="w-11 h-11 rounded-[13px] overflow-hidden flex-shrink-0" style={{ background: "#E8E5F8" }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691463606-1493d79cc577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBjb25zdWx0YXRpb24lMjBvZmZpY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzcxOTQwMzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Dr. Paulo Fernandes"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0F0F23" }}>
                Check-up anual pendente
              </p>
              <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3" }}>
                Último: há 11 meses · Clínico geral
              </p>
            </div>
            <button
              className="px-3 py-1.5 rounded-full outline-none transition-transform active:scale-95 flex-shrink-0"
              style={{ background: "#6C5CE7", fontSize: "11px", fontWeight: 700, color: "#fff" }}
              aria-label="Agendar check-up anual"
              onClick={() => navigate("/agendar")}
            >
              Agendar
            </button>
          </div>
        </motion.section>
      )}
    </>
  );
}