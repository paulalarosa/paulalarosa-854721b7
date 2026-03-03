import { motion } from "motion/react";
import { PageHeader } from "./PageHeader";
import { Fingerprint, Heart, Droplets, Ruler, Weight, Activity, Calendar } from "lucide-react";

const healthData = [
  {
    icon: Droplets,
    label: "Tipo Sanguíneo",
    value: "A+",
    bg: "bg-red-50/60",
    color: "#D07048",
  },
  {
    icon: Ruler,
    label: "Altura",
    value: "1,68 m",
    bg: "bg-blue-50",
    color: "#4A90D9",
  },
  {
    icon: Weight,
    label: "Peso",
    value: "62 kg",
    bg: "bg-amber-50",
    color: "#E8A04C",
  },
  {
    icon: Heart,
    label: "IMC",
    value: "21.9",
    bg: "bg-[#2D9F93]/[0.08]",
    color: "#2D9F93",
  },
];

const allergies = [
  "Dipirona",
  "Penicilina",
  "Látex",
];

const conditions = [
  { name: "Asma leve", since: "Desde 2018" },
  { name: "Rinite alérgica", since: "Desde 2015" },
];

const vaccinations = [
  { name: "COVID-19 (4ª dose)", date: "Mar 2024" },
  { name: "Influenza", date: "Abr 2025" },
  { name: "Hepatite B", date: "Jul 2020" },
  { name: "Febre Amarela", date: "Jan 2019" },
];

export function BiometricData() {
  return (
    <div className="pb-4">
      <PageHeader title="Dados de Saúde" backTo="/profile" />

      {/* Perfil de saúde */}
      <div className="px-4 xs:px-5 pt-1 pb-2">
        <div
          className="bg-white rounded-[20px] p-5 flex items-center gap-4"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8F6F4, #F0FAF9)" }}
          >
            <Fingerprint size={22} className="text-[#2D9F93]" />
          </div>
          <div className="flex-1">
            <p className="text-[15px] text-[#1a1a2e] tracking-[-0.01em]">Perfil de Saúde</p>
            <p className="text-[12px] text-[#9a9aaa]">Última atualização: 15 Fev 2026</p>
          </div>
        </div>
      </div>

      {/* Cards de dados vitais */}
      <div className="px-4 xs:px-5 pt-3">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Dados Vitais</p>
        <div className="grid grid-cols-2 gap-2.5">
          {healthData.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              className="bg-white rounded-[20px] p-4"
              style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
            >
              <div className={`w-9 h-9 rounded-[12px] ${item.bg} flex items-center justify-center mb-3`}>
                <item.icon size={16} style={{ color: item.color }} strokeWidth={1.8} />
              </div>
              <p className="text-[18px] text-[#1a1a2e] tracking-[-0.02em]">{item.value}</p>
              <p className="text-[11px] text-[#9a9aaa] mt-0.5">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Alergias */}
      <div className="px-5 pt-4">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Alergias</p>
        <div
          className="bg-white rounded-[20px] p-5"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <div className="flex flex-wrap gap-2">
            {allergies.map((allergy) => (
              <span
                key={allergy}
                className="px-3 py-1.5 rounded-full bg-red-50/60 text-[12px] text-[#D07048]"
              >
                {allergy}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Condições */}
      <div className="px-5 pt-4">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Condições Crônicas</p>
        <div
          className="bg-white rounded-[20px] overflow-hidden"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          {conditions.map((condition, index) => (
            <div
              key={condition.name}
              className={`px-5 py-4 flex items-center gap-3 ${index < conditions.length - 1 ? "border-b border-[#F5F5F7]" : ""
                }`}
            >
              <div className="w-10 h-10 rounded-[14px] bg-amber-50 flex items-center justify-center shrink-0">
                <Activity size={16} className="text-amber-500" strokeWidth={1.7} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-[#1a1a2e]">{condition.name}</p>
                <p className="text-[11px] text-[#B0B4BC]">{condition.since}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vacinas */}
      <div className="px-5 pt-4">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Carteira de Vacinação</p>
        <div
          className="bg-white rounded-[20px] overflow-hidden"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          {vaccinations.map((vaccine, index) => (
            <motion.div
              key={vaccine.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.04 + 0.2 }}
              className={`px-5 py-3.5 flex items-center gap-3 ${index < vaccinations.length - 1 ? "border-b border-[#F5F5F7]" : ""
                }`}
            >
              <div className="w-1 h-8 rounded-full bg-[#2D9F93]/20" />
              <div className="flex-1">
                <p className="text-[13px] text-[#1a1a2e]">{vaccine.name}</p>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={11} className="text-[#C0C4CC]" />
                <span className="text-[11px] text-[#B0B4BC]">{vaccine.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
