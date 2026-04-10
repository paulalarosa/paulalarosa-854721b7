import { useState } from "react";
import { motion } from "motion/react";
import { PageHeader } from "./PageHeader";
import { LucideIcon, Shield, Fingerprint, Lock, Eye, EyeOff, Smartphone, KeyRound } from "lucide-react";

interface ToggleItemProps {
  icon: LucideIcon;
  label: string;
  description: string;
  defaultOn?: boolean;
  delay: number;
}

function ToggleItem({ icon: Icon, label, description, defaultOn = false, delay }: ToggleItemProps) {
  const [enabled, setEnabled] = useState(defaultOn);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center gap-3.5 px-4 xs:px-5 py-4"
    >
      <div className="w-10 h-10 rounded-[14px] bg-[#FAFBFC] flex items-center justify-center shrink-0">
        <Icon size={17} className="text-[#7a7a8a]" strokeWidth={1.7} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-[#1a1a2e]">{label}</p>
        <p className="text-[11px] text-[#B0B4BC]">{description}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-[46px] h-[28px] rounded-full p-[2px] transition-colors duration-200 cursor-pointer shrink-0 ${enabled ? "bg-[#2D9F93]" : "bg-[#E0E2E6]"
          }`}
        role="switch"
        aria-checked={enabled}
        aria-label={label}
      >
        <motion.div
          className="w-[24px] h-[24px] rounded-full bg-white"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
          animate={{ x: enabled ? 18 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </motion.div>
  );
}

export function Privacy() {
  const [showPin, setShowPin] = useState(false);

  return (
    <div className="pb-4">
      <PageHeader title="Privacidade e Segurança" />

      {/* Status */}
      <div className="px-4 xs:px-5 pt-1 pb-2">
        <div
          className="bg-white rounded-[20px] p-5 flex items-center gap-4"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8F6F4, #F0FAF9)" }}
          >
            <Shield size={22} className="text-[#2D9F93]" />
          </div>
          <div className="flex-1">
            <p className="text-[15px] text-[#1a1a2e] tracking-[-0.01em]">Proteção alta</p>
            <p className="text-[12px] text-[#9a9aaa]">Biometria e PIN ativados</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-emerald-600">Seguro</span>
          </div>
        </div>
      </div>

      {/* Autenticação */}
      <div className="px-4 xs:px-5 pt-4">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Acesso</p>
        <div
          className="bg-white rounded-[20px] overflow-hidden divide-y divide-[#F5F5F7]"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <ToggleItem
            icon={Fingerprint}
            label="Biometria / Face ID"
            description="Desbloqueio rápido com biometria"
            defaultOn={true}
            delay={0.05}
          />
          <ToggleItem
            icon={Lock}
            label="PIN de acesso"
            description="PIN de 6 dígitos para segurança extra"
            defaultOn={true}
            delay={0.1}
          />
          <ToggleItem
            icon={Smartphone}
            label="Bloqueio automático"
            description="Bloquear após 5 minutos de inatividade"
            defaultOn={true}
            delay={0.15}
          />
        </div>
      </div>

      {/* Privacidade */}
      <div className="px-4 xs:px-5 pt-4">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Privacidade</p>
        <div
          className="bg-white rounded-[20px] overflow-hidden divide-y divide-[#F5F5F7]"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <ToggleItem
            icon={Eye}
            label="Ocultar dados sensíveis"
            description="Mascarar CPF e dados na tela inicial"
            defaultOn={false}
            delay={0.2}
          />
          <ToggleItem
            icon={KeyRound}
            label="Autenticação em dois fatores"
            description="SMS ou e-mail para login"
            defaultOn={true}
            delay={0.25}
          />
        </div>
      </div>

      {/* Alterar PIN */}
      <div className="px-4 xs:px-5 pt-4">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Credenciais</p>
        <div
          className="bg-white rounded-[20px] overflow-hidden"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPin(!showPin)}
            className="w-full px-4 xs:px-5 py-4 flex items-center gap-3.5 text-left cursor-pointer hover:bg-[#FAFBFC] transition-colors"
          >
            <div className="w-10 h-10 rounded-[14px] bg-[#FAFBFC] flex items-center justify-center shrink-0">
              <Lock size={17} className="text-[#7a7a8a]" strokeWidth={1.7} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-[#1a1a2e]">Alterar PIN</p>
              <p className="text-[11px] text-[#B0B4BC]">
                {showPin ? "• • • • • •" : "Último alterado há 30 dias"}
              </p>
            </div>
            {showPin ? (
              <EyeOff size={16} className="text-[#C0C4CC]" />
            ) : (
              <Eye size={16} className="text-[#C0C4CC]" />
            )}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 xs:px-5 py-4 flex items-center gap-3.5 text-left cursor-pointer hover:bg-[#FAFBFC] transition-colors border-t border-[#F5F5F7]"
          >
            <div className="w-10 h-10 rounded-[14px] bg-[#FAFBFC] flex items-center justify-center shrink-0">
              <KeyRound size={17} className="text-[#7a7a8a]" strokeWidth={1.7} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-[#1a1a2e]">Alterar senha</p>
              <p className="text-[11px] text-[#B0B4BC]">Senha do app e portal web</p>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
