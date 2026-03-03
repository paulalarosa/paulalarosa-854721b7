import { useState } from "react";
import { motion } from "motion/react";
import { PageHeader } from "./PageHeader";
import {
  Bell,
  CalendarCheck,
  FileText,
  CreditCard,
  AlertTriangle,
  Mail,
  Smartphone,
  MessageCircle,
} from "lucide-react";

interface ToggleRowProps {
  icon: any;
  label: string;
  description: string;
  defaultOn?: boolean;
  delay: number;
}

function ToggleRow({ icon: Icon, label, description, defaultOn = true, delay }: ToggleRowProps) {
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

export function NotificationSettings() {
  return (
    <div className="pb-4">
      <PageHeader title="Notificações" backTo="/profile" />

      {/* Canais */}
      <div className="px-4 xs:px-5 pt-1">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Canais</p>
        <div
          className="bg-white rounded-[20px] overflow-hidden divide-y divide-[#F5F5F7]"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <ToggleRow icon={Smartphone} label="Push" description="Notificações no celular" defaultOn={true} delay={0.05} />
          <ToggleRow icon={Mail} label="E-mail" description="Resumo por e-mail" defaultOn={true} delay={0.1} />
          <ToggleRow icon={MessageCircle} label="SMS" description="Alertas urgentes por SMS" defaultOn={false} delay={0.15} />
        </div>
      </div>

      {/* Categorias */}
      <div className="px-4 xs:px-5 pt-4">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Categorias</p>
        <div
          className="bg-white rounded-[20px] overflow-hidden divide-y divide-[#F5F5F7]"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <ToggleRow icon={CalendarCheck} label="Consultas" description="Confirmações, lembretes e cancelamentos" defaultOn={true} delay={0.2} />
          <ToggleRow icon={FileText} label="Guias e Autorizações" description="Aprovações e atualizações de guias" defaultOn={true} delay={0.25} />
          <ToggleRow icon={CreditCard} label="Financeiro" description="Coparticipação e reembolsos" defaultOn={true} delay={0.3} />
          <ToggleRow icon={AlertTriangle} label="Alertas" description="Vencimentos e avisos importantes" defaultOn={true} delay={0.35} />
          <ToggleRow icon={Bell} label="Promoções" description="Novidades e programas de bem-estar" defaultOn={false} delay={0.4} />
        </div>
      </div>
    </div>
  );
}
