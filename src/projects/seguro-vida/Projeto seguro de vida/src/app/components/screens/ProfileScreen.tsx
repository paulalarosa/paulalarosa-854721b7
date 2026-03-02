import { motion } from "motion/react";
import { useState } from "react";
import {
  User,
  ChevronRight,
  Shield,
  CreditCard,
  Bell,
  HelpCircle,
  FileText,
  LogOut,
  Moon,
  Lock,
  Globe,
  Star,
  Settings,
  RotateCcw,
} from "lucide-react";
import { hapticLight, hapticMedium, hapticWarning } from "../haptics";

interface SettingGroup {
  title: string;
  items: {
    icon: typeof User;
    label: string;
    desc?: string;
    color: string;
    action?: string;
    toggle?: boolean;
    onClick?: () => void;
  }[];
}

export function ProfileScreen() {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    Notificacoes: true,
    "Tema escuro": false,
  });

  const handleToggle = (label: string) => {
    hapticLight();
    setToggleStates((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleReplayOnboarding = () => {
    hapticMedium();
    try { localStorage.removeItem("shield-onboarding-seen"); } catch {}
    window.location.reload();
  };

  const settingGroups: SettingGroup[] = [
    {
      title: "Conta",
      items: [
        { icon: User, label: "Dados pessoais", desc: "Nome, CPF, endereco", color: "#0F172A" },
        { icon: CreditCard, label: "Pagamento", desc: "Cartoes e metodos", color: "#0D9488" },
        { icon: Lock, label: "Seguranca", desc: "Senha e biometria", color: "#6366F1" },
      ],
    },
    {
      title: "Preferencias",
      items: [
        { icon: Bell, label: "Notificacoes", desc: "Push e email", color: "#D97706", toggle: true },
        { icon: Moon, label: "Tema escuro", color: "#0F172A", toggle: true },
        { icon: Globe, label: "Idioma", desc: "Portugues (BR)", color: "#0F172A" },
        { icon: RotateCcw, label: "Rever tutorial", desc: "Shield Score", color: "#0D9488", onClick: handleReplayOnboarding },
      ],
    },
    {
      title: "Suporte",
      items: [
        { icon: HelpCircle, label: "Central de ajuda", color: "#0F172A" },
        { icon: FileText, label: "Termos de uso", color: "#0F172A" },
        { icon: Star, label: "Avaliar o app", color: "#D97706" },
      ],
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="flex items-center justify-between pt-2 pb-2">
        <h1 className="text-[22px] text-[#0F172A] tracking-tight">Perfil</h1>
        <button
          className="w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#0D9488]"
          aria-label="Configuracoes"
        >
          <Settings size={18} className="text-[#0F172A]" strokeWidth={1.6} />
        </button>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl bg-[#0F172A] p-5 mb-5 mt-3"
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.08] flex items-center justify-center border border-white/[0.06]">
            <span className="text-[18px] text-white tracking-tight">RL</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[17px] text-white tracking-tight">Ricardo Lima</h2>
            <p className="text-[11px] text-gray-400 truncate">ricardo.lima@email.com</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Cliente desde 2022</p>
          </div>
          <button
            className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center border border-white/[0.04] focus-visible:outline-2 focus-visible:outline-[#5EEAD4]"
            aria-label="Editar perfil"
          >
            <ChevronRight size={14} className="text-white/40" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: "Apolices", value: "3" },
            { label: "Sinistros", value: "2" },
            { label: "Anos", value: "4" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-white/[0.04] p-2.5 border border-white/[0.04] text-center"
            >
              <p className="text-[16px] text-white tracking-tight">{stat.value}</p>
              <p className="text-[9px] text-gray-500 uppercase tracking-[0.1em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Loyalty */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 p-4 mb-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star size={14} className="text-amber-500" strokeWidth={1.6} />
            <span className="text-[12px] text-[#0F172A]">Fidelidade</span>
          </div>
          <span className="text-[10px] text-gray-400 tracking-wide">Nivel Ouro</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div className="h-full w-[72%] bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
        </div>
        <div className="flex justify-between">
          <span className="text-[9px] text-gray-300">4.320 pontos</span>
          <span className="text-[9px] text-gray-300">6.000 para Platina</span>
        </div>
      </motion.div>

      {/* Settings */}
      {settingGroups.map((group, groupIndex) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 + groupIndex * 0.05 }}
          className="mb-4"
        >
          <h3 className="text-[11px] text-gray-300 uppercase tracking-[0.1em] mb-2 px-1">
            {group.title}
          </h3>
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 overflow-hidden">
            {group.items.map((item, i) => (
              <button
                key={item.label}
                onClick={item.toggle ? () => handleToggle(item.label) : item.onClick}
                className={`w-full flex items-center justify-between p-3.5 text-left transition-all active:bg-gray-50/50 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0D9488] ${
                  i < group.items.length - 1 ? "border-b border-gray-50" : ""
                }`}
                aria-label={item.label}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}06` }}
                  >
                    <item.icon size={15} style={{ color: item.color }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#0F172A]">{item.label}</p>
                    {item.desc && <p className="text-[10px] text-gray-300">{item.desc}</p>}
                  </div>
                </div>
                {item.toggle ? (
                  <div
                    className={`w-[42px] h-[24px] rounded-full p-[2px] transition-colors duration-200 ${
                      toggleStates[item.label] ? "bg-[#0D9488]" : "bg-gray-200"
                    }`}
                    role="switch"
                    aria-checked={toggleStates[item.label]}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        toggleStates[item.label] ? "translate-x-[18px]" : "translate-x-0"
                      }`}
                    />
                  </div>
                ) : (
                  <ChevronRight size={14} className="text-gray-200" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Logout */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => hapticWarning()}
        whileTap={{ scale: 0.96 }}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-100 bg-red-50/50 focus-visible:outline-2 focus-visible:outline-[#DC2626]"
        aria-label="Sair da conta"
      >
        <LogOut size={15} className="text-[#DC2626]" strokeWidth={1.6} />
        <span className="text-[12px] text-[#DC2626]">Sair da conta</span>
      </motion.button>

      <p className="text-center text-[9px] text-gray-300 mt-4">Versao 2.4.1</p>
      <div className="h-6" />
    </div>
  );
}
