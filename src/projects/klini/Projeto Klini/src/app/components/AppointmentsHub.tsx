import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Search, Plus, Clock, Video } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "./PageHeader";

const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Marcelo Ximenes Furtado",
    specialty: "Psiquiatria",
    location: "CM Klini - Barra da Tijuca",
    room: "Térreo, Sala 122",
    date: "27 Fev",
    time: "09:20",
    status: "Confirmada" as const,
    isTelemedicine: false,
    avatar: "MX",
  },
  {
    id: 2,
    doctor: "Dra. Ana Clara Mendes",
    specialty: "Dermatologia",
    location: "CM Klini - Botafogo",
    room: "3º Andar, Sala 312",
    date: "5 Mar",
    time: "14:00",
    status: "Pendente" as const,
    isTelemedicine: true,
    avatar: "AC",
  },
  {
    id: 3,
    doctor: "Dr. Marcelo Ximenes Furtado",
    specialty: "Psiquiatria",
    location: "CM Klini - Barra da Tijuca",
    room: "Térreo, Sala 122",
    date: "20 Mar",
    time: "13:06",
    status: "Confirmada" as const,
    isTelemedicine: false,
    avatar: "MX",
  },
];

const historyAppointments = [
  {
    id: 4,
    doctor: "Dra. Patricia Sodre de Oliveira",
    specialty: "Cardiologia",
    location: "CM Klini - Centro",
    room: "5º Andar, Sala 508",
    date: "15 Jan",
    time: "10:00",
    status: "Realizada" as const,
    avatar: "PS",
  },
  {
    id: 5,
    doctor: "Dr. Roberto Almeida Santos",
    specialty: "Dermatologia",
    location: "CM Klini - Botafogo",
    room: "2º Andar, Sala 204",
    date: "8 Dez",
    time: "14:30",
    status: "Realizada" as const,
    avatar: "RA",
  },
  {
    id: 6,
    doctor: "Dra. Ana Clara Mendes",
    specialty: "Ortopedia",
    location: "CM Klini - Copacabana",
    room: "3º Andar, Sala 312",
    date: "22 Nov",
    time: "11:00",
    status: "Cancelada" as const,
    avatar: "AC",
  },
];

type Tab = "upcoming" | "history";

const statusConfig = {
  Confirmada: { bg: "bg-[#2D9F93]/[0.08]", text: "text-[#2D9F93]" },
  Pendente: { bg: "bg-amber-50", text: "text-amber-600" },
  Realizada: { bg: "bg-[#2D9F93]/[0.08]", text: "text-[#2D9F93]" },
  Cancelada: { bg: "bg-gray-50", text: "text-[#B0B4BC]" },
};

function AppointmentCard({
  apt,
  index,
}: {
  apt: (typeof upcomingAppointments)[0] & { isTelemedicine?: boolean };
  index: number;
}) {
  const status = statusConfig[apt.status];
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-white rounded-[20px] p-5"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
      role="article"
      aria-label={`Consulta com ${apt.doctor}`}
    >
      <div className="flex items-start gap-3.5 mb-3">
        <div
          className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 text-[13px] text-[#2D9F93]"
          style={{ background: "linear-gradient(135deg, #E8F6F4, #F0FAF9)" }}
          aria-hidden="true"
        >
          {apt.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[14px] text-[#1a1a2e] tracking-[-0.01em] mb-0.5">
            {apt.doctor}
          </h4>
          <span className="text-[12px] text-[#9a9aaa]">{apt.specialty}</span>
        </div>
        {"isTelemedicine" in apt && apt.isTelemedicine && (
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0" aria-label="Consulta por telemedicina">
            <Video size={14} className="text-blue-500" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-1">
        <MapPin size={13} className="text-[#C0C4CC] shrink-0" />
        <span className="text-[12px] text-[#7a7a8a]">{apt.location}</span>
      </div>
      <div className="pl-[21px] mb-4">
        <span className="text-[11px] text-[#B0B4BC]">{apt.room}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Clock size={13} className="text-[#C0C4CC]" />
          <span className="text-[13px] text-[#1a1a2e] tracking-[-0.01em]">
            {apt.date}, {apt.time}
          </span>
        </div>
        <span className={`px-3 py-1 rounded-full text-[11px] tracking-wide ${status.bg} ${status.text}`}>
          {apt.status}
        </span>
      </div>
    </motion.article>
  );
}

export function AppointmentsHub() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");
  const [historySearch, setHistorySearch] = useState("");

  const filteredHistory = historyAppointments.filter(
    (apt) =>
      apt.doctor.toLowerCase().includes(historySearch.toLowerCase()) ||
      apt.specialty.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div className="pb-4">
      <PageHeader title="Consultas" />

      {/* Abas */}
      <div className="px-5 pt-1">
        <div
          className="flex bg-[#F0F1F3] rounded-2xl p-1 relative"
          role="tablist"
          aria-label="Abas de consultas"
        >
          <motion.div
            className="absolute top-1 bottom-1 rounded-[14px] bg-white"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
            animate={{
              left: activeTab === "upcoming" ? "4px" : "50%",
              right: activeTab === "upcoming" ? "50%" : "4px",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
          <button
            onClick={() => setActiveTab("upcoming")}
            role="tab"
            aria-selected={activeTab === "upcoming"}
            aria-controls="panel-upcoming"
            className={`flex-1 py-2.5 rounded-[14px] text-[13px] transition-colors duration-200 relative z-10 cursor-pointer ${
              activeTab === "upcoming" ? "text-[#1a1a2e]" : "text-[#B0B4BC]"
            }`}
          >
            Próximas
            <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-[#2D9F93]/10 text-[#2D9F93]">
              {upcomingAppointments.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("history")}
            role="tab"
            aria-selected={activeTab === "history"}
            aria-controls="panel-history"
            className={`flex-1 py-2.5 rounded-[14px] text-[13px] transition-colors duration-200 relative z-10 cursor-pointer ${
              activeTab === "history" ? "text-[#1a1a2e]" : "text-[#B0B4BC]"
            }`}
          >
            Histórico
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <AnimatePresence mode="wait">
        {activeTab === "upcoming" ? (
          <motion.div
            key="upcoming"
            id="panel-upcoming"
            role="tabpanel"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            className="px-5 pt-4"
          >
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/search")}
              className="w-full py-4 rounded-2xl text-white text-[14px] tracking-wide flex items-center justify-center gap-2 mb-4 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #2D9F93 0%, #3DB4A7 100%)",
                boxShadow: "0 6px 20px rgba(45,159,147,0.28)",
              }}
              aria-label="Agendar nova consulta"
            >
              <Plus size={18} strokeWidth={2.2} />
              Nova Consulta
            </motion.button>

            <div className="flex flex-col gap-3" role="list" aria-label="Próximas consultas">
              {upcomingAppointments.map((apt, index) => (
                <AppointmentCard key={apt.id} apt={apt} index={index} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="history"
            id="panel-history"
            role="tabpanel"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="px-5 pt-4"
          >
            <div
              className="flex items-center bg-white rounded-2xl px-4 py-3.5 gap-3 mb-4"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.03)" }}
            >
              <Search size={16} className="text-[#C0C4CC] shrink-0" />
              <input
                type="text"
                placeholder="Buscar consultas anteriores..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[14px] text-[#1a1a2e] placeholder-[#C0C4CC]"
                aria-label="Buscar no histórico de consultas"
              />
            </div>

            <div className="flex flex-col gap-3" role="list" aria-label="Consultas anteriores">
              {filteredHistory.map((apt, index) => (
                <AppointmentCard key={apt.id} apt={apt} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
