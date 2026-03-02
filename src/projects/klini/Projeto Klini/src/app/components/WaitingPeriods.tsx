import { motion } from "motion/react";
import { PageHeader } from "./PageHeader";
import { Check, Clock, Lock } from "lucide-react";

const periods = [
  {
    id: 1,
    procedure: "Urgência e Emergência",
    days: 24,
    totalDays: 24,
    status: "completed" as const,
    completedDate: "24 Jan 2026",
  },
  {
    id: 2,
    procedure: "Consultas Básicas",
    days: 30,
    totalDays: 30,
    status: "completed" as const,
    completedDate: "30 Jan 2026",
  },
  {
    id: 3,
    procedure: "Exames Laboratoriais",
    days: 142,
    totalDays: 180,
    status: "active" as const,
    remainingDays: 38,
    endDate: "3 Abr 2026",
  },
  {
    id: 4,
    procedure: "Exames Complexos e Terapias",
    days: 142,
    totalDays: 180,
    status: "active" as const,
    remainingDays: 38,
    endDate: "3 Abr 2026",
  },
  {
    id: 5,
    procedure: "Internação Hospitalar",
    days: 142,
    totalDays: 300,
    status: "locked" as const,
    remainingDays: 158,
    endDate: "18 Ago 2026",
  },
  {
    id: 6,
    procedure: "Doenças Preexistentes",
    days: 142,
    totalDays: 720,
    status: "locked" as const,
    remainingDays: 578,
    endDate: "24 Set 2027",
  },
];

const statusConfig = {
  completed: { icon: Check, color: "#2D9F93", bg: "bg-[#2D9F93]/[0.08]", label: "Concluído" },
  active: { icon: Clock, color: "#E8A04C", bg: "bg-amber-50", label: "Em Andamento" },
  locked: { icon: Lock, color: "#B0B4BC", bg: "bg-gray-50", label: "Pendente" },
};

export function WaitingPeriods() {
  return (
    <div className="pb-4">
      <PageHeader title="Carências" />

      {/* Resumo */}
      <div className="px-5 pt-1 pb-2">
        <div
          className="bg-white rounded-[20px] p-5"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3">Início do Plano</p>
          <p className="text-[20px] text-[#1a1a2e] tracking-[-0.02em]">1 de Janeiro de 2026</p>
          <p className="text-[12px] text-[#9a9aaa] mt-1">Cobertura decorrida: 55 dias</p>
        </div>
      </div>

      {/* Lista de carências */}
      <div className="px-5 pt-3">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3 px-1">Cronograma de Cobertura</p>
        <div className="flex flex-col gap-3" role="list" aria-label="Lista de carências">
          {periods.map((period, index) => {
            const config = statusConfig[period.status];
            const StatusIcon = config.icon;
            const progress = (period.days / period.totalDays) * 100;

            return (
              <motion.div
                key={period.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white rounded-[20px] p-5"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
                role="listitem"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-[14px] text-[#1a1a2e] tracking-[-0.01em] mb-1">{period.procedure}</h4>
                    <span className="text-[12px] text-[#9a9aaa]">Requisito de {period.totalDays} dias</span>
                  </div>
                  <div className={`w-8 h-8 rounded-xl ${config.bg} flex items-center justify-center`}>
                    <StatusIcon size={14} style={{ color: config.color }} />
                  </div>
                </div>

                <div className="h-1.5 rounded-full bg-[#F0F1F3] overflow-hidden mb-2.5">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, delay: index * 0.06 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      background:
                        period.status === "completed"
                          ? "#2D9F93"
                          : period.status === "active"
                            ? "linear-gradient(90deg, #E8A04C, #F0B86E)"
                            : "#D8DAE0",
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px]" style={{ color: config.color }}>
                    {config.label}
                  </span>
                  {period.status === "completed" ? (
                    <span className="text-[11px] text-[#B0B4BC]">{period.completedDate}</span>
                  ) : (
                    <span className="text-[11px] text-[#B0B4BC]">{period.remainingDays} dias restantes</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
