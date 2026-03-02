import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "./PageHeader";
import { Hash, Copy, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const tokens = [
  {
    id: 1,
    code: "TK-2026-00847",
    procedure: "Hemograma Completo",
    provider: "Lab Klini - Barra da Tijuca",
    issuedDate: "20 Fev 2026",
    expiryDate: "22 Mar 2026",
    status: "active" as const,
  },
  {
    id: 2,
    code: "TK-2026-00832",
    procedure: "Eletrocardiograma",
    provider: "CM Klini - Centro",
    issuedDate: "15 Fev 2026",
    expiryDate: "17 Mar 2026",
    status: "active" as const,
  },
  {
    id: 3,
    code: "TK-2026-00798",
    procedure: "Ressonância - Coluna Lombar",
    provider: "Imagem Klini - Botafogo",
    issuedDate: "10 Fev 2026",
    expiryDate: "24 Fev 2026",
    status: "expiring" as const,
  },
  {
    id: 4,
    code: "TK-2026-00756",
    procedure: "Consulta Dermatologia",
    provider: "CM Klini - Botafogo",
    issuedDate: "28 Jan 2026",
    expiryDate: "10 Fev 2026",
    status: "used" as const,
    usedDate: "5 Fev 2026",
  },
  {
    id: 5,
    code: "TK-2025-00701",
    procedure: "Exame Oftalmológico",
    provider: "CM Klini - Copacabana",
    issuedDate: "15 Dez 2025",
    expiryDate: "14 Jan 2026",
    status: "expired" as const,
  },
];

type Tab = "active" | "past";

const statusConfig = {
  active: { icon: CheckCircle2, color: "#2D9F93", bg: "bg-[#2D9F93]/[0.08]", label: "Ativa" },
  expiring: { icon: AlertCircle, color: "#E8A04C", bg: "bg-amber-50", label: "Expirando" },
  used: { icon: CheckCircle2, color: "#7a7a8a", bg: "bg-gray-50", label: "Utilizada" },
  expired: { icon: XCircle, color: "#B0B4BC", bg: "bg-gray-50", label: "Expirada" },
};

export function Tokens() {
  const [activeTab, setActiveTab] = useState<Tab>("active");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const activeTokens = tokens.filter((t) => t.status === "active" || t.status === "expiring");
  const pastTokens = tokens.filter((t) => t.status === "used" || t.status === "expired");
  const displayTokens = activeTab === "active" ? activeTokens : pastTokens;

  const handleCopy = (id: number) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="pb-4">
      <PageHeader title="Guias" />

      {/* Resumo */}
      <div className="px-5 pt-1">
        <div
          className="bg-white rounded-[20px] p-5 flex items-center gap-4"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8F6F4, #F0FAF9)" }}
          >
            <Hash size={22} className="text-[#2D9F93]" />
          </div>
          <div>
            <p className="text-[20px] text-[#1a1a2e] tracking-[-0.02em]">
              {activeTokens.length} ativas
            </p>
            <p className="text-[12px] text-[#9a9aaa]">guias de autorização</p>
          </div>
        </div>
      </div>

      {/* Abas */}
      <div className="px-5 pt-4">
        <div className="flex bg-[#F0F1F3] rounded-2xl p-1 relative" role="tablist" aria-label="Abas de guias">
          <motion.div
            className="absolute top-1 bottom-1 rounded-[14px] bg-white"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
            animate={{
              left: activeTab === "active" ? "4px" : "50%",
              right: activeTab === "active" ? "50%" : "4px",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
          <button
            onClick={() => setActiveTab("active")}
            role="tab"
            aria-selected={activeTab === "active"}
            className={`flex-1 py-2.5 rounded-[14px] text-[13px] relative z-10 cursor-pointer transition-colors ${
              activeTab === "active" ? "text-[#1a1a2e]" : "text-[#B0B4BC]"
            }`}
          >
            Ativas
          </button>
          <button
            onClick={() => setActiveTab("past")}
            role="tab"
            aria-selected={activeTab === "past"}
            className={`flex-1 py-2.5 rounded-[14px] text-[13px] relative z-10 cursor-pointer transition-colors ${
              activeTab === "past" ? "text-[#1a1a2e]" : "text-[#B0B4BC]"
            }`}
          >
            Anteriores
          </button>
        </div>
      </div>

      {/* Lista de guias */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === "active" ? -8 : 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeTab === "active" ? 8 : -8 }}
          transition={{ duration: 0.2 }}
          className="px-5 pt-4 flex flex-col gap-3"
          role="list"
          aria-label={`Guias ${activeTab === "active" ? "ativas" : "anteriores"}`}
        >
          {displayTokens.map((token, index) => {
            const config = statusConfig[token.status];
            const StatusIcon = config.icon;
            return (
              <motion.div
                key={token.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="bg-white rounded-[20px] p-5"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
                role="listitem"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-[14px] text-[#1a1a2e] tracking-[-0.01em]">{token.procedure}</h4>
                    <p className="text-[12px] text-[#9a9aaa] mt-0.5">{token.provider}</p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full flex items-center gap-1 ${config.bg}`}>
                    <StatusIcon size={11} style={{ color: config.color }} />
                    <span className="text-[10px]" style={{ color: config.color }}>
                      {config.label}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#FAFBFC] rounded-xl px-3 py-2.5 mb-3">
                  <span className="text-[14px] text-[#1a1a2e] tracking-wider flex-1 font-mono">
                    {token.code}
                  </span>
                  <button
                    onClick={() => handleCopy(token.id)}
                    className="text-[#C0C4CC] hover:text-[#2D9F93] transition-colors cursor-pointer"
                    aria-label={`Copiar guia ${token.code}`}
                  >
                    {copiedId === token.id ? (
                      <CheckCircle2 size={16} className="text-[#2D9F93]" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-[#C0C4CC]" />
                    <span className="text-[11px] text-[#9a9aaa]">
                      {token.status === "used"
                        ? `Utilizada: ${token.usedDate}`
                        : `Expira: ${token.expiryDate}`}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
