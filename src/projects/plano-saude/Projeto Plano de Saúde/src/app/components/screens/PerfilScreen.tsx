import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

const achievements = [
  { emoji: "🔥", label: "12 semanas", sub: "Streak ativo" },
  { emoji: "⭐", label: "Check-up", sub: "Em dia" },
  { emoji: "💜", label: "Premium", sub: "Desde 2023" },
];

interface MenuItem {
  label: string;
  sub?: string;
  icon: React.ReactNode;
  color: string;
  tag?: string;
  tagColor?: string;
  path: string;
}

const menuSections: { title: string; items: MenuItem[] }[] = [
  {
    title: "CONTA",
    items: [
      {
        label: "Dados pessoais", sub: "Nome, CPF, endereço", color: "#6C5CE7", path: "/perfil/dados",
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>,
      },
      {
        label: "Dependentes", sub: "2 ativos", color: "#4DA6FF", tag: "2", tagColor: "#4DA6FF", path: "/perfil/dependentes",
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
      },
      {
        label: "Cartão virtual", sub: "Compartilhar ou baixar", color: "#00C48C", path: "/perfil/cartao",
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>,
      },
      {
        label: "Documentos", sub: "Boletos, contratos", color: "#FFB347", path: "/perfil/documentos",
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>,
      },
    ],
  },
  {
    title: "PREFERÊNCIAS",
    items: [
      {
        label: "Notificações", sub: "Push, e-mail, SMS", color: "#FF6B6B", path: "/perfil/notificacoes",
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>,
      },
      {
        label: "Privacidade", sub: "Dados e consentimentos", color: "#8F8FA3", path: "/perfil/privacidade",
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
      },
    ],
  },
  {
    title: "SUPORTE",
    items: [
      {
        label: "Central de ajuda", color: "#4DA6FF", path: "/perfil/ajuda",
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>,
      },
      {
        label: "Fale conosco", sub: "Chat 24h", color: "#00C48C", tag: "Online", tagColor: "#00C48C", path: "/perfil/chat",
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>,
      },
    ],
  },
];

export function PerfilScreen() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <motion.header
        className="px-7 pt-5 pb-2"
        initial="hidden" animate="visible" variants={fadeUp} custom={0}
      >
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0F0F23", letterSpacing: "-0.03em" }}>
          Perfil
        </h1>
      </motion.header>

      {/* Profile Hero */}
      <motion.section
        className="px-5 pt-3 pb-2"
        initial="hidden" animate="visible" variants={fadeUp} custom={1}
        aria-label="Informações do perfil"
      >
        <div
          className="rounded-[24px] p-5 relative overflow-hidden"
          style={{ background: "#fff", boxShadow: "0 1px 4px rgba(15,15,35,0.04), 0 8px 28px rgba(15,15,35,0.04)" }}
        >
          {/* Decorative bg */}
          <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 0%, rgba(108,92,231,0.04) 0%, transparent 70%)" }} />

          <div className="relative flex items-center gap-4 mb-5">
            <div className="relative">
              <div className="w-[60px] h-[60px] rounded-[18px] overflow-hidden" style={{ background: "#F0F0F5" }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1597373962445-dd49de3fbd30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBuYXR1cmFsJTIwbGlnaHQlMjBicmF6aWxpYW58ZW58MXx8fHwxNzcxOTM4NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Foto de perfil de Mariana Silva"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Verified badge */}
              <div
                className="absolute -bottom-1 -right-1 w-[18px] h-[18px] rounded-full flex items-center justify-center"
                style={{ background: "#6C5CE7", border: "2px solid #fff" }}
                aria-hidden="true"
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p style={{ fontSize: "18px", fontWeight: 800, color: "#0F0F23", letterSpacing: "-0.02em" }}>
                Mariana Silva
              </p>
              <p style={{ fontSize: "12px", fontWeight: 400, color: "#8F8FA3" }}>
                mariana.silva@email.com
              </p>
            </div>

            <button
              className="w-8 h-8 rounded-[10px] flex items-center justify-center outline-none transition-transform active:scale-90"
              style={{ background: "#F3F3F8" }}
              aria-label="Editar perfil"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8F8FA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
            </button>
          </div>

          {/* Achievements row */}
          <div className="flex gap-2.5">
            {achievements.map((a) => (
              <div
                key={a.label}
                className="flex-1 flex flex-col items-center py-3 rounded-[14px]"
                style={{ background: "#F8F8FC" }}
              >
                <span style={{ fontSize: "20px", lineHeight: 1 }}>{a.emoji}</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#0F0F23", marginTop: "4px" }}>
                  {a.label}
                </span>
                <span style={{ fontSize: "9px", fontWeight: 400, color: "#8F8FA3", marginTop: "1px" }}>
                  {a.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Health Score */}
      <motion.section
        className="px-5 pt-3 pb-2"
        initial="hidden" animate="visible" variants={fadeUp} custom={2}
        aria-label="Score de engajamento de saúde"
      >
        <div
          className="rounded-[20px] p-4 flex items-center gap-4"
          style={{ background: "linear-gradient(135deg, #6C5CE7, #8B7CF0)", boxShadow: "0 4px 20px rgba(108,92,231,0.2)" }}
        >
          <div
            className="w-14 h-14 rounded-[15px] flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <motion.span
              style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              78
            </motion.span>
          </div>
          <div className="flex-1">
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>
              Seu Health Score
            </p>
            <p style={{ fontSize: "11px", fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
              Acima da média! Continue cuidando de você.
            </p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </motion.section>

      {/* Menu Sections */}
      {menuSections.map((section, si) => (
        <div key={section.title}>
          <motion.div
            className="px-7 pt-5 pb-2"
            initial="hidden" animate="visible" variants={fadeUp} custom={3 + si * 0.8}
          >
            <p style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.14em", color: "#8F8FA3" }}>
              {section.title}
            </p>
          </motion.div>

          <motion.div
            className="px-5 pb-1"
            initial="hidden" animate="visible" variants={fadeUp} custom={3.4 + si * 0.8}
          >
            <div
              className="rounded-[18px] overflow-hidden"
              style={{ background: "#fff", boxShadow: "0 1px 4px rgba(15,15,35,0.03), 0 3px 12px rgba(15,15,35,0.03)" }}
            >
              {section.items.map((item, ii) => (
                <button
                  key={item.label}
                  className="w-full text-left flex items-center gap-3 px-4 py-3.5 outline-none transition-colors active:bg-[#F8F8FC]"
                  style={{ borderBottom: ii < section.items.length - 1 ? "1px solid #F5F5FA" : "none" }}
                  aria-label={item.sub ? `${item.label}: ${item.sub}` : item.label}
                  onClick={() => navigate(item.path)}
                >
                  <div
                    className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}10`, color: item.color }}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#0F0F23", display: "block" }}>
                      {item.label}
                    </span>
                    {item.sub && (
                      <span style={{ fontSize: "10px", fontWeight: 400, color: "#8F8FA3" }}>
                        {item.sub}
                      </span>
                    )}
                  </div>

                  {item.tag && (
                    <div
                      className="px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: `${item.tagColor}10` }}
                    >
                      <span style={{ fontSize: "9px", fontWeight: 700, color: item.tagColor }}>
                        {item.tag}
                      </span>
                    </div>
                  )}

                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8C8D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      ))}

      {/* Logout */}
      <motion.div
        className="px-5 pt-5 pb-6"
        initial="hidden" animate="visible" variants={fadeUp} custom={7}
      >
        <button
          className="w-full py-3.5 rounded-[16px] outline-none transition-transform active:scale-[0.98]"
          style={{ background: "#FFF0F2", fontSize: "13px", fontWeight: 700, color: "#FF6B6B" }}
          aria-label="Sair da conta"
          onClick={() => {
            if (window.confirm("Deseja realmente sair da conta?")) {
              navigate("/");
            }
          }}
        >
          Sair da conta
        </button>
        <p className="text-center mt-4" style={{ fontSize: "10px", fontWeight: 400, color: "#C8C8D4" }}>
          Viva Saúde v3.0 · Feito com 💜
        </p>
      </motion.div>
    </>
  );
}