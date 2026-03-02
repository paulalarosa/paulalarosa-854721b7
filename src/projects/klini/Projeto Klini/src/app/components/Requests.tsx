import { useState } from "react";
import { motion } from "motion/react";
import { PageHeader } from "./PageHeader";
import { FileText, Plus, Clock, CheckCircle2, XCircle, Loader2, ChevronRight } from "lucide-react";

type FilterType = "todas" | "autorização" | "reembolso";

const requests = [
  {
    id: 1,
    type: "Autorização",
    filterKey: "autorização" as const,
    procedure: "Ressonância - Coluna Lombar",
    requestedDate: "18 Fev 2026",
    status: "approved" as const,
    responseDate: "20 Fev 2026",
    doctor: "Dr. Roberto Almeida",
  },
  {
    id: 2,
    type: "Reembolso",
    filterKey: "reembolso" as const,
    procedure: "Fisioterapia (6 sessões)",
    requestedDate: "12 Fev 2026",
    status: "processing" as const,
    amount: "R$ 840,00",
    doctor: "Dra. Ana Clara Mendes",
  },
  {
    id: 3,
    type: "Autorização",
    filterKey: "autorização" as const,
    procedure: "Painel de Teste Alérgico",
    requestedDate: "8 Fev 2026",
    status: "approved" as const,
    responseDate: "10 Fev 2026",
    doctor: "Dra. Patricia Sodre",
  },
  {
    id: 4,
    type: "Reembolso",
    filterKey: "reembolso" as const,
    procedure: "Consulta Fora da Rede",
    requestedDate: "25 Jan 2026",
    status: "denied" as const,
    responseDate: "30 Jan 2026",
    reason: "Prestador fora da área de cobertura",
    doctor: "Dr. Prestador Externo",
  },
  {
    id: 5,
    type: "Autorização",
    filterKey: "autorização" as const,
    procedure: "Teste de Esforço Cardíaco",
    requestedDate: "15 Jan 2026",
    status: "approved" as const,
    responseDate: "17 Jan 2026",
    doctor: "Dra. Patricia Sodre",
  },
];

const statusConfig = {
  approved: { icon: CheckCircle2, color: "#2D9F93", bg: "bg-[#2D9F93]/[0.08]", label: "Aprovada" },
  processing: { icon: Loader2, color: "#E8A04C", bg: "bg-amber-50", label: "Em Análise" },
  denied: { icon: XCircle, color: "#D07048", bg: "bg-red-50/60", label: "Negada" },
};

const filterLabels: Record<FilterType, string> = {
  todas: "Todas",
  "autorização": "Autorização",
  reembolso: "Reembolso",
};

export function Requests() {
  const [filter, setFilter] = useState<FilterType>("todas");

  const filtered = requests.filter((r) => {
    if (filter === "todas") return true;
    return r.filterKey === filter;
  });

  return (
    <div className="pb-4">
      <PageHeader title="Solicitações" />

      {/* Botão Nova Solicitação */}
      <div className="px-5 pt-1">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-2xl text-white text-[14px] tracking-wide flex items-center justify-center gap-2 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #2D9F93 0%, #3DB4A7 100%)",
            boxShadow: "0 6px 20px rgba(45,159,147,0.28)",
          }}
          aria-label="Criar nova solicitação"
        >
          <Plus size={18} strokeWidth={2.2} />
          Nova Solicitação
        </motion.button>
      </div>

      {/* Filtros */}
      <div className="px-5 pt-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar" role="group" aria-label="Filtrar solicitações">
          {(Object.keys(filterLabels) as FilterType[]).map((f) => {
            const active = filter === f;
            return (
              <motion.button
                key={f}
                whileTap={{ scale: 0.96 }}
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`shrink-0 px-4 py-2.5 rounded-full text-[13px] cursor-pointer transition-all ${
                  active ? "text-white" : "text-[#5a5a6a] bg-white"
                }`}
                style={
                  active
                    ? {
                        background: "linear-gradient(135deg, #2D9F93, #3DB4A7)",
                        boxShadow: "0 4px 12px rgba(45,159,147,0.25)",
                      }
                    : { boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.03)" }
                }
              >
                {filterLabels[f]}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lista de solicitações */}
      <div className="px-5 pt-4 flex flex-col gap-3" role="list" aria-label="Lista de solicitações">
        {filtered.map((req, index) => {
          const config = statusConfig[req.status];
          const StatusIcon = config.icon;
          return (
            <motion.article
              key={req.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="bg-white rounded-[20px] p-5"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
              role="listitem"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-[14px] bg-[#FAFBFC] flex items-center justify-center">
                    <FileText size={18} className="text-[#7a7a8a]" strokeWidth={1.7} />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#9a9aaa] tracking-wider uppercase">{req.type}</span>
                    <h4 className="text-[14px] text-[#1a1a2e] tracking-[-0.01em]">{req.procedure}</h4>
                  </div>
                </div>
                <ChevronRight size={16} className="text-[#C0C4CC] mt-2" />
              </div>

              <p className="text-[12px] text-[#9a9aaa] mb-3 pl-[50px]">
                Solicitado por {req.doctor}
              </p>

              <div className="flex items-center justify-between pl-[50px]">
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-[#C0C4CC]" />
                  <span className="text-[11px] text-[#9a9aaa]">{req.requestedDate}</span>
                </div>
                <div className={`px-2.5 py-1 rounded-full flex items-center gap-1 ${config.bg}`}>
                  <StatusIcon
                    size={11}
                    style={{ color: config.color }}
                    className={req.status === "processing" ? "animate-spin" : ""}
                  />
                  <span className="text-[10px]" style={{ color: config.color }}>
                    {config.label}
                  </span>
                </div>
              </div>

              {req.status === "denied" && req.reason && (
                <div className="mt-3 ml-[50px] px-3 py-2 rounded-xl bg-red-50/40 border border-red-100/50">
                  <p className="text-[11px] text-[#D07048]">{req.reason}</p>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
