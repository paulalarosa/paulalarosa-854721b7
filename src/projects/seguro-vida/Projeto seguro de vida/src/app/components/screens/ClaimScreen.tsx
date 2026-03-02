import { useState } from "react";
import {
  ShieldAlert,
  Phone,
  Camera,
  FileText,
  MapPin,
  Car,
  Heart,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Clock,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { TabId } from "../BottomTabBar";
import { hapticMedium, hapticHeavy, hapticTick, hapticSuccess } from "../haptics";

type Step = "type" | "details" | "confirm" | "done";

interface ClaimScreenProps {
  onNavigate: (tab: TabId) => void;
}

export function ClaimScreen({ onNavigate }: ClaimScreenProps) {
  const [step, setStep] = useState<Step>("type");
  const [claimType, setClaimType] = useState<"auto" | "vida" | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const autoReasons = ["Colisao", "Roubo ou furto", "Danos naturais", "Incendio", "Outros"];
  const vidaReasons = ["Internacao", "Cirurgia", "Invalidez", "Doenca grave", "Outros"];

  const handleReset = () => {
    setStep("type");
    setClaimType(null);
    setSelectedReason(null);
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6" style={{ scrollbarWidth: "none" }}>
      <div className="flex items-center justify-between pt-2 pb-5">
        <div>
          <h1 className="text-[22px] text-[#0F172A] tracking-tight">Sinistro</h1>
          <p className="text-[12px] text-gray-400">Abra um chamado</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-[#DC2626]/8 flex items-center justify-center">
          <ShieldAlert size={18} className="text-[#DC2626]" strokeWidth={1.6} />
        </div>
      </div>

      {/* Emergency Banner */}
      <button
        className="w-full flex items-center gap-3.5 p-4 rounded-[16px] bg-[#DC2626] mb-5 active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626]"
        aria-label="Ligar para emergencia"
      >
        <div className="w-10 h-10 rounded-xl bg-white/12 flex items-center justify-center border border-white/8">
          <Phone size={18} className="text-white" strokeWidth={1.8} />
        </div>
        <div className="text-left flex-1">
          <p className="text-[14px] text-white tracking-tight">Emergencia 24h</p>
          <p className="text-[11px] text-white/60">0800 123 4567</p>
        </div>
        <ChevronRight size={16} className="text-white/40" />
      </button>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        {[
          { icon: Phone, label: "Ligar agora", desc: "Central 24h" },
          { icon: Camera, label: "Enviar fotos", desc: "Do ocorrido" },
          { icon: MapPin, label: "Localizacao", desc: "Compartilhar" },
        ].map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-1.5 p-3.5 rounded-[16px] bg-white border border-gray-100/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)] active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#0D9488]"
            aria-label={action.label}
          >
            <action.icon size={18} className="text-[#0F172A]" strokeWidth={1.5} />
            <span className="text-[10px] text-[#0F172A] tracking-wide">{action.label}</span>
            <span className="text-[9px] text-gray-300">{action.desc}</span>
          </button>
        ))}
      </div>

      {/* Step Flow */}
      <AnimatePresence mode="wait">
        {step === "type" && (
          <motion.div
            key="type"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-[13px] text-[#0F172A] mb-3">Selecione o tipo</h3>
            <div className="space-y-2.5">
              {[
                { type: "auto" as const, icon: Car, title: "Seguro Auto", desc: "Colisao, roubo, danos", color: "#0D9488" },
                { type: "vida" as const, icon: Heart, title: "Seguro Vida", desc: "Saude, invalidez", color: "#6366F1" },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => { hapticMedium(); setClaimType(item.type); setStep("details"); }}
                  className="w-full flex items-center justify-between p-4 rounded-[16px] bg-white border border-gray-100/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-[#0D9488]"
                  aria-label={`Sinistro de ${item.title}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ backgroundColor: `${item.color}08` }}>
                      <item.icon size={18} style={{ color: item.color }} strokeWidth={1.6} />
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] text-[#0F172A]">{item.title}</p>
                      <p className="text-[11px] text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-200" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] text-[#0F172A]">Motivo do sinistro</h3>
              <button onClick={handleReset} className="text-[11px] text-gray-400" aria-label="Voltar">
                <X size={16} className="text-gray-300" />
              </button>
            </div>
            <div className="space-y-2">
              {(claimType === "auto" ? autoReasons : vidaReasons).map((reason) => (
                <button
                  key={reason}
                  onClick={() => { hapticTick(); setSelectedReason(reason); setStep("confirm"); }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-[14px] border transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#0D9488] ${
                    selectedReason === reason
                      ? "bg-[#0F172A] border-[#0F172A] text-white"
                      : "bg-white border-gray-100/60 text-[#0F172A]"
                  }`}
                  aria-label={reason}
                >
                  <span className="text-[12px]">{reason}</span>
                  <ChevronRight size={14} className={selectedReason === reason ? "text-white/40" : "text-gray-200"} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-[18px] bg-white border border-gray-100/60 p-4 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={14} className="text-amber-500" strokeWidth={1.6} />
                <h3 className="text-[13px] text-[#0F172A]">Confirmar sinistro</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[11px] text-gray-400">Tipo</span>
                  <span className="text-[12px] text-[#0F172A]">{claimType === "auto" ? "Auto" : "Vida"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-gray-400">Motivo</span>
                  <span className="text-[12px] text-[#0F172A]">{selectedReason}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-gray-400">Data</span>
                  <span className="text-[12px] text-[#0F172A]">24 Fev 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-gray-400">Protocolo</span>
                  <span className="text-[12px] text-[#0F172A]">SIN-2026-048271</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => { hapticTick(); setStep("details"); }}
                className="flex-1 py-3.5 rounded-[14px] bg-gray-100 text-[13px] text-gray-600 active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-[#0D9488]"
              >
                Voltar
              </button>
              <button
                onClick={() => { hapticHeavy(); setStep("done"); }}
                className="flex-1 py-3.5 rounded-[14px] bg-[#0F172A] text-[13px] text-white active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
              >
                Confirmar
              </button>
            </div>
          </motion.div>
        )}

        {step === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} className="text-emerald-500" strokeWidth={1.6} />
            </div>
            <h3 className="text-[18px] text-[#0F172A] tracking-tight mb-1">Sinistro aberto</h3>
            <p className="text-[12px] text-gray-400 mb-1">Protocolo SIN-2026-048271</p>
            <p className="text-[11px] text-gray-300 mb-6">Voce recebera atualizacoes por notificacao</p>

            <div className="rounded-[16px] bg-white border border-gray-100/60 p-4 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={13} className="text-gray-300" strokeWidth={1.5} />
                <span className="text-[11px] text-gray-400">Prazo estimado</span>
              </div>
              <p className="text-[15px] text-[#0F172A] tracking-tight">3 a 5 dias uteis</p>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={handleReset}
                className="flex-1 py-3.5 rounded-[14px] bg-gray-100 text-[13px] text-gray-600 active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-[#0D9488]"
              >
                Novo sinistro
              </button>
              <button
                onClick={() => onNavigate("inicio")}
                className="flex-1 py-3.5 rounded-[14px] bg-[#0F172A] text-[13px] text-white active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
              >
                Voltar ao inicio
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Claims */}
      {step === "type" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-6"
        >
          <h3 className="text-[13px] text-[#0F172A] mb-3">Historico recente</h3>
          <div className="space-y-2">
            {[
              { protocol: "SIN-2025-041823", type: "Auto - Colisao", date: "15 Nov 2025", status: "Concluido" },
              { protocol: "SIN-2025-038291", type: "Vida - Internacao", date: "03 Set 2025", status: "Concluido" },
            ].map((claim) => (
              <div
                key={claim.protocol}
                className="p-3.5 rounded-[14px] bg-white border border-gray-100/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] text-[#0F172A]">{claim.type}</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 size={10} className="text-emerald-500" />
                    <span className="text-[9px] text-emerald-600">{claim.status}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-300">{claim.protocol}</span>
                  <span className="text-[10px] text-gray-300">{claim.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="h-6" />
    </div>
  );
}