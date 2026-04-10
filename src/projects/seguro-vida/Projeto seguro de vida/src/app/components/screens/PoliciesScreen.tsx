import { useState } from "react";
import { Car, Heart, Shield, ChevronRight, ChevronLeft, CheckCircle2, Clock, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { hapticLight, hapticMedium, hapticTick } from "../haptics";
import type { TabId } from "../BottomTabBar";
import type { QuickActionId } from "../QuickActions";

interface Policy {
  id: string;
  type: "auto" | "vida";
  title: string;
  subtitle: string;
  status: "ativa" | "pendente";
  coverage: string;
  premium: string;
  nextPayment: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
  details: string[];
}

const policies: Policy[] = [
  {
    id: "1",
    type: "auto",
    title: "Seguro Auto",
    subtitle: "Hyundai HB20 2024",
    status: "ativa",
    coverage: "Cobertura Total",
    premium: "R$ 389,90/mes",
    nextPayment: "05 Mar 2026",
    policyNumber: "AUT-2025-001847",
    startDate: "15 Jan 2025",
    endDate: "15 Jan 2026",
    details: ["Colisao", "Roubo e Furto", "Terceiros", "Guincho 24h", "Carro reserva 15 dias"],
  },
  {
    id: "2",
    type: "vida",
    title: "Seguro Vida",
    subtitle: "Plano Premium",
    status: "ativa",
    coverage: "R$ 500.000",
    premium: "R$ 157,50/mes",
    nextPayment: "12 Mar 2026",
    policyNumber: "VID-2025-003291",
    startDate: "01 Mar 2025",
    endDate: "01 Mar 2026",
    details: ["Morte natural", "Morte acidental", "Invalidez permanente", "Doencas graves", "Assistencia funeral"],
  },
  {
    id: "3",
    type: "auto",
    title: "Seguro Auto",
    subtitle: "Honda Civic 2023",
    status: "ativa",
    coverage: "Cobertura Total",
    premium: "R$ 299,90/mes",
    nextPayment: "20 Mar 2026",
    policyNumber: "AUT-2025-002103",
    startDate: "10 Jun 2025",
    endDate: "10 Jun 2026",
    details: ["Colisao", "Roubo e Furto", "Terceiros", "Guincho 24h"],
  },
];

function PolicyDetail({ policy, onBack }: { policy: Policy; onBack: () => void }) {
  const Icon = policy.type === "auto" ? Car : Heart;
  const color = policy.type === "auto" ? "#0D9488" : "#6366F1";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 mb-5 text-gray-400 focus-visible:outline-2 focus-visible:outline-[#0D9488] rounded"
        aria-label="Voltar para lista de apolices"
      >
        <ChevronLeft size={16} strokeWidth={1.6} />
        <span className="text-[12px] tracking-wide">Voltar</span>
      </button>

      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}08` }}>
          <Icon size={22} style={{ color }} strokeWidth={1.6} />
        </div>
        <div>
          <h2 className="text-[18px] text-[#0F172A] tracking-tight">{policy.title}</h2>
          <p className="text-[12px] text-gray-400">{policy.subtitle}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 p-4 mb-3">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "N. da Apolice", value: policy.policyNumber },
            { label: "Status", value: policy.status === "ativa" ? "Ativa" : "Pendente", isStatus: true },
            { label: "Inicio", value: policy.startDate },
            { label: "Vencimento", value: policy.endDate },
            { label: "Cobertura", value: policy.coverage },
            { label: "Premio", value: policy.premium },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[9px] text-gray-300 uppercase tracking-[0.1em] mb-1">{item.label}</p>
              {'isStatus' in item && item.isStatus ? (
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  <p className="text-[13px] text-emerald-600">{item.value}</p>
                </div>
              ) : (
                <p className="text-[13px] text-[#0F172A]">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 p-4 mb-3">
        <h3 className="text-[13px] text-[#0F172A] mb-3">Coberturas incluidas</h3>
        <div className="space-y-2.5">
          {policy.details.map((detail, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: `${color}08` }}>
                <CheckCircle2 size={11} style={{ color }} strokeWidth={2} />
              </div>
              <span className="text-[12px] text-gray-600">{detail}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={13} className="text-gray-300" strokeWidth={1.5} />
          <h3 className="text-[13px] text-[#0F172A]">Proximo pagamento</h3>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80">
          <p className="text-[12px] text-gray-500">{policy.nextPayment}</p>
          <p className="text-[14px] text-[#0F172A] tracking-tight">{policy.premium}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface ScreenProps {
  onNavigate: (tab: TabId) => void;
  onOpenSearch?: () => void;
  onQuickAction?: (id: QuickActionId) => void;
}

export function PoliciesScreen({ onNavigate, onOpenSearch, onQuickAction }: ScreenProps) {
  // Props handled via destructuring for type safety
  void onNavigate; void onOpenSearch; void onQuickAction;
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  return (
    <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6" style={{ scrollbarWidth: "none" }}>
      <AnimatePresence mode="wait">
        {selectedPolicy ? (
          <PolicyDetail
            key="detail"
            policy={selectedPolicy}
            onBack={() => { hapticLight(); setSelectedPolicy(null); }}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <div className="flex items-center justify-between pt-2 pb-5">
              <div>
                <h1 className="text-[22px] text-[#0F172A] tracking-tight">Apolices</h1>
                <p className="text-[12px] text-gray-400">3 apolices ativas</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 flex items-center justify-center">
                <FileText size={18} className="text-[#0F172A]" strokeWidth={1.6} />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <div className="rounded-2xl bg-[#0F172A] p-4">
                <Shield size={16} className="text-[#5EEAD4] mb-2" strokeWidth={1.5} />
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.1em] mb-0.5">Valor total</p>
                <p className="text-[18px] text-white tracking-tight">R$ 847,30</p>
                <p className="text-[10px] text-gray-500 mt-1">por mes</p>
              </div>
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 p-4">
                <CheckCircle2 size={16} className="text-emerald-500 mb-2" strokeWidth={1.5} />
                <p className="text-[10px] text-gray-300 uppercase tracking-[0.1em] mb-0.5">Proxima renovacao</p>
                <p className="text-[18px] text-[#0F172A] tracking-tight">Jan 2026</p>
                <p className="text-[10px] text-gray-400 mt-1">em 11 meses</p>
              </div>
            </div>

            {/* Policy List */}
            <div className="space-y-2.5">
              {policies.map((policy, i) => {
                const Icon = policy.type === "auto" ? Car : Heart;
                const color = policy.type === "auto" ? "#0D9488" : "#6366F1";

                return (
                  <motion.button
                    key={policy.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => { hapticMedium(); setSelectedPolicy(policy); }}
                    className="w-full text-left p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 active:scale-[0.98] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#0D9488]"
                    aria-label={`${policy.title} - ${policy.subtitle}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}08` }}>
                          <Icon size={18} style={{ color }} strokeWidth={1.6} />
                        </div>
                        <div>
                          <p className="text-[14px] text-[#0F172A] tracking-tight">{policy.title}</p>
                          <p className="text-[11px] text-gray-400">{policy.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-[13px] text-[#0F172A] tracking-tight">{policy.premium}</p>
                          <div className="flex items-center gap-1 justify-end">
                            <span className="w-[5px] h-[5px] rounded-full bg-emerald-500" />
                            <span className="text-[9px] text-emerald-600 tracking-wide">Ativa</span>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-200" />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-6" />
    </div>
  );
}
