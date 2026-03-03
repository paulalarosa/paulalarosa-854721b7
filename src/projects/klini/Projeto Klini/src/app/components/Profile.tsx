import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ChevronRight,
  Shield,
  Bell,
  Globe,
  HelpCircle,
  FileText,
  LogOut,
  Moon,
  Fingerprint,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

const menuSections = [
  {
    title: "Conta",
    items: [
      { icon: Shield, label: "Privacidade e Segurança", subtitle: "Biometria, PIN", path: "/privacy" },
      { icon: Bell, label: "Notificações", subtitle: "Push, alertas por e-mail", path: "/notification-settings" },
      { icon: Globe, label: "Idioma", subtitle: "Português", path: "/language" },
      { icon: Moon, label: "Aparência", subtitle: "Modo claro", path: "/appearance" },
    ],
  },
  {
    title: "Plano",
    items: [
      { icon: FileText, label: "Documentos do Plano", subtitle: "Contrato, diretrizes", path: "/documents" },
      { icon: Fingerprint, label: "Dados de Saúde", subtitle: "Perfil biométrico", path: "/biometric" },
    ],
  },
  {
    title: "Suporte",
    items: [
      { icon: HelpCircle, label: "Central de Ajuda", subtitle: "FAQ, fale conosco", path: "/support" },
      { icon: FileText, label: "Termos de Uso", subtitle: "Informações legais", path: "/terms" },
    ],
  },
];

export function Profile() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText("0144 0672 2300");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="pb-4">
      {/* Header do perfil */}
      <div
        className="px-6 pt-14 pb-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #155F57 0%, #1A7A70 40%, #2D9F93 100%)",
        }}
      >
        <div className="absolute top-[-40px] right-[-30px] w-[160px] h-[160px] rounded-full bg-white/[0.06]" />
        <div className="absolute bottom-[-20px] left-[-20px] w-[100px] h-[100px] rounded-full bg-white/[0.04]" />

        <div className="flex items-center gap-4 relative z-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-[20px] text-white/90"
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
            aria-hidden="true"
          >
            PR
          </div>
          <div>
            <h1 className="text-white tracking-[-0.02em]">Paula Rosa</h1>
            <p className="text-white/60 text-[13px] mt-0.5">paula.rosa@email.com</p>
          </div>
        </div>

        {/* ID inline */}
        <div
          className="mt-5 flex items-center justify-between rounded-2xl px-4 py-3 relative z-10"
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div>
            <p className="text-white/50 text-[10px] tracking-wider uppercase">ID do Membro</p>
            <p className="text-white text-[14px] tracking-wider mt-0.5">0144 0672 2300</p>
          </div>
          <button
            onClick={handleCopy}
            className="text-white/50 hover:text-white/80 transition-colors cursor-pointer"
            aria-label="Copiar ID do membro"
          >
            {copied ? (
              <CheckCircle2 size={18} className="text-emerald-300" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Badge do plano */}
      <div className="px-5 -mt-4 relative z-20">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/card")}
          className="w-full bg-white rounded-[20px] p-4 flex items-center gap-3 text-left cursor-pointer"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)" }}
          aria-label="Ver carteirinha digital"
        >
          <div
            className="w-10 h-10 rounded-[14px] flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8F6F4, #F0FAF9)" }}
          >
            <Shield size={18} className="text-[#2D9F93]" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] text-[#1a1a2e]">Klini Start PJ QC</p>
            <p className="text-[11px] text-[#9a9aaa]">Empresarial · Cobertura Total</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-emerald-600">Ativo</span>
          </div>
          <ChevronRight size={14} className="text-[#D0D4DC]" />
        </motion.button>
      </div>

      {/* Seções do menu */}
      {menuSections.map((section, sIdx) => (
        <div key={section.title} className="px-5 pt-5">
          <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">
            {section.title}
          </p>
          <div
            className="bg-white rounded-[20px] overflow-hidden"
            style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.04)" }}
          >
            {section.items.map((item, iIdx) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: (sIdx * 3 + iIdx) * 0.04 }}
                onClick={() => navigate(item.path)}
                className={`w-full px-4 py-3.5 flex items-center gap-3 text-left cursor-pointer hover:bg-[#FAFBFC] transition-colors ${iIdx < section.items.length - 1 ? "border-b border-[#F5F5F7]" : ""
                  }`}
                aria-label={item.label}
              >
                <div className="w-9 h-9 rounded-[12px] bg-[#FAFBFC] flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-[#7a7a8a]" strokeWidth={1.7} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[#1a1a2e]">{item.label}</p>
                  <p className="text-[11px] text-[#B0B4BC]">{item.subtitle}</p>
                </div>
                <ChevronRight size={14} className="text-[#D0D4DC] shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>
      ))}

      {/* Sair */}
      <div className="px-5 pt-5">
        <button
          className="w-full py-3.5 rounded-[20px] bg-white flex items-center justify-center gap-2 text-[#D07048] cursor-pointer"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.04)" }}
          aria-label="Sair da conta"
        >
          <LogOut size={16} strokeWidth={1.8} />
          <span className="text-[13px]">Sair</span>
        </button>
      </div>

      <div className="text-center pt-5">
        <p className="text-[10px] text-[#C0C4CC]">Klini v2.4.0 · 2026</p>
      </div>
    </div>
  );
}
