import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  MapPin,
  Star,
  Clock,
  SlidersHorizontal,
  Brain,
  Heart,
  Sparkles,
  Bone,
  Baby,
  Microscope,
  Eye,
  Stethoscope,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "./PageHeader";

const specialties = [
  { label: "Psiquiatria", icon: Brain },
  { label: "Cardiologia", icon: Heart },
  { label: "Dermatologia", icon: Sparkles },
  { label: "Ortopedia", icon: Bone },
  { label: "Pediatria", icon: Baby },
  { label: "Neurologia", icon: Microscope },
  { label: "Oftalmologia", icon: Eye },
  { label: "Ginecologia", icon: Stethoscope },
];

const serviceTypes = ["Consulta", "Exame", "Terapia", "Cirurgia"];

const doctorGradients = [
  "linear-gradient(135deg, #2D9F93, #1A7A70)",
  "linear-gradient(135deg, #4A7FD9, #2A5FAA)",
  "linear-gradient(135deg, #1A7A70, #3DBDB0)",
];

const mockResults = [
  {
    id: 1,
    name: "Dr. Marcelo Ximenes Furtado",
    specialty: "Psiquiatria",
    location: "CM Klini - Barra da Tijuca",
    room: "Térreo, Sala 122",
    rating: 4.8,
    reviews: 124,
    available: "27 Fev, 09:20",
    avatar: "MX",
    gradientIndex: 0,
  },
  {
    id: 2,
    name: "Dra. Patricia Sodre de Oliveira",
    specialty: "Psiquiatria",
    location: "CM Klini - Centro",
    room: "5º Andar, Sala 508",
    rating: 4.9,
    reviews: 89,
    available: "3 Mar, 14:00",
    avatar: "PS",
    gradientIndex: 1,
  },
  {
    id: 3,
    name: "Dr. Roberto Almeida Santos",
    specialty: "Psiquiatria",
    location: "CM Klini - Botafogo",
    room: "2º Andar, Sala 204",
    rating: 4.7,
    reviews: 67,
    available: "5 Mar, 10:30",
    avatar: "RA",
    gradientIndex: 2,
  },
];

export function NetworkSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="pb-4">
      <PageHeader
        title="Rede Credenciada"
        rightAction={
          <button
            className="w-9 h-9 rounded-xl bg-white flex items-center justify-center cursor-pointer"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04)" }}
            aria-label="Filtros"
          >
            <SlidersHorizontal size={16} className="text-[#5a5a6a]" strokeWidth={1.8} />
          </button>
        }
      />

      <div className="px-5 pt-1">
        <label htmlFor="search-network" className="sr-only">
          Buscar médico ou especialidade
        </label>
        <div
          className="flex items-center bg-white rounded-2xl px-4 py-4 gap-3"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04)" }}
        >
          <Search size={18} className="text-[#C0C4CC] shrink-0" strokeWidth={2} />
          <input
            id="search-network"
            type="text"
            placeholder="Médico, especialidade, clínica..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 bg-transparent outline-none text-[14px] text-[#1a1a2e] placeholder-[#C0C4CC]"
            aria-label="Buscar médicos ou especialidades"
          />
        </div>
      </div>

      <div className="px-5 pt-5">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3 px-1">Tipo de Atendimento</p>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label="Filtro por tipo de atendimento">
          {serviceTypes.map((service) => {
            const active = selectedService === service;
            return (
              <motion.button
                key={service}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedService(active ? null : service)}
                aria-pressed={active}
                className={`shrink-0 px-5 py-2.5 rounded-full text-[13px] transition-all duration-200 cursor-pointer ${active ? "text-white" : "text-[#5a5a6a] bg-white"
                  }`}
                style={
                  active
                    ? {
                      background: "linear-gradient(135deg, #2D9F93, #3DB4A7)",
                      boxShadow: "0 4px 12px rgba(45,159,147,0.25)",
                    }
                    : {
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)",
                    }
                }
              >
                {service}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-4">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3 px-1">Especialidade</p>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label="Filtro por especialidade">
          {specialties.map((s) => {
            const active = selectedSpecialty === s.label;
            const SpecIcon = s.icon;
            return (
              <motion.button
                key={s.label}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedSpecialty(active ? null : s.label)}
                aria-pressed={active}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] transition-all duration-200 cursor-pointer ${active ? "text-white" : "text-[#5a5a6a] bg-white"
                  }`}
                style={
                  active
                    ? {
                      background: "linear-gradient(135deg, #2D9F93, #3DB4A7)",
                      boxShadow: "0 4px 12px rgba(45,159,147,0.25)",
                    }
                    : {
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)",
                    }
                }
              >
                <SpecIcon size={14} strokeWidth={1.6} />
                {s.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          className="w-full py-4 rounded-2xl text-white text-[15px] tracking-wide cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #2D9F93 0%, #3DB4A7 100%)",
            boxShadow: "0 6px 20px rgba(45,159,147,0.28)",
          }}
          aria-label="Buscar na rede credenciada"
        >
          Buscar na Rede
        </motion.button>
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="px-5 pt-6"
          >
            <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3 px-1">
              {mockResults.length} profissionais encontrados
            </p>

            <div className="flex flex-col gap-3" role="list" aria-label="Resultados da busca">
              {mockResults.map((doctor, index) => (
                <motion.article
                  key={doctor.id}
                  role="listitem"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="bg-white rounded-[20px] p-5"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)" }}
                >
                  <div className="flex items-start gap-3.5 mb-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] font-semibold"
                      style={{ background: doctorGradients[doctor.gradientIndex] }}
                      aria-hidden="true"
                    >
                      {doctor.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] text-[#1a1a2e] tracking-[-0.01em] mb-0.5">
                        {doctor.name}
                      </h4>
                      <span className="text-[12px] text-[#9a9aaa]">{doctor.specialty}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span className="text-[12px] font-semibold text-[#1a1a2e]">{doctor.rating}</span>
                      <span className="text-[11px] text-[#9ca3af]">({doctor.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin size={13} className="text-[#C0C4CC] shrink-0" />
                    <span className="text-[12px] text-[#7a7a8a]">{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4 pl-[21px]">
                    <span className="text-[11px] text-[#B0B4BC]">{doctor.room}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[#2D9F93]">
                      <Clock size={13} strokeWidth={2} />
                      <span className="text-[12px]">Próx: {doctor.available}</span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => navigate("/appointments")}
                      className="px-5 py-2.5 rounded-xl text-[12px] text-[#2D9F93] font-medium cursor-pointer transition-colors"
                      style={{ background: "rgba(45,159,147,0.12)" }}
                      aria-label={`Agendar consulta com ${doctor.name}`}
                    >
                      Agendar
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
