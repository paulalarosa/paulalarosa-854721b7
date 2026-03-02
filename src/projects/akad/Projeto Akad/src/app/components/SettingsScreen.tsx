import React from "react";
import { User, Bell, Lock, Palette, HelpCircle, LogOut, ChevronRight, Moon, Globe, FileText, Shield } from "lucide-react";
import { akad } from "./akad-theme";
import { PhoneFrame } from "./PhoneFrame";
import { TabBar, TabId } from "./TabBar";
import { SettingsDetailScreen } from "./SettingsDetailScreen";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

const avatarUrl = "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90JTIwYnVzaW5lc3N8ZW58MXx8fHwxNzcxOTI0Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080";
type SettingsPage = "personal" | "security" | "notifications" | "language" | "appearance" | "terms" | "privacy" | "help";

interface SettingItem { icon: typeof User; label: string; description?: string; page: SettingsPage; hasToggle?: boolean; }

const settingSections: { title: string; items: SettingItem[] }[] = [
  { title: "Conta", items: [
    { icon: User, label: "Dados Pessoais", description: "Nome, e-mail, telefone", page: "personal" },
    { icon: Lock, label: "Segurança", description: "Senha, 2FA, biometria", page: "security" },
    { icon: Bell, label: "Notificações", description: "Push, e-mail, SMS", page: "notifications" },
  ]},
  { title: "Preferências", items: [
    { icon: Moon, label: "Modo Escuro", hasToggle: true, page: "appearance" },
    { icon: Globe, label: "Idioma", description: "Português (BR)", page: "language" },
    { icon: Palette, label: "Aparência", description: "Tema e cores", page: "appearance" },
  ]},
  { title: "Sobre", items: [
    { icon: FileText, label: "Termos de Uso", page: "terms" },
    { icon: Shield, label: "Privacidade", page: "privacy" },
    { icon: HelpCircle, label: "Ajuda", page: "help" },
  ]},
];

interface SettingsScreenProps { activeTab: TabId; onNavigate: (tab: TabId) => void; }

export function SettingsScreen({ activeTab, onNavigate }: SettingsScreenProps) {
  const [subPage, setSubPage] = React.useState<SettingsPage | null>(null);
  const [darkToggle, setDarkToggle] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);

  if (subPage) return <PhoneFrame><SettingsDetailScreen page={subPage} onBack={() => setSubPage(null)} /></PhoneFrame>;

  return (
    <PhoneFrame>
      <header className="px-5 pt-2 pb-1">
        <h1 style={{ color: akad.text, fontSize: "26px", fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.2 }}>Configurações</h1>
      </header>

      <main className="flex-1 px-4 pt-2 pb-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <motion.button onClick={() => setSubPage("personal")}
          className="w-full rounded-[18px] p-3.5 flex items-center gap-3 mb-4 cursor-pointer text-left"
          style={{ background: akad.gradientPrimary, boxShadow: "0 6px 24px rgba(26,16,84,0.18)" }}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          aria-label="Editar perfil">
          <div className="w-12 h-12 rounded-[14px] overflow-hidden shrink-0" style={{ border: "2px solid rgba(255,255,255,0.12)" }}>
            <ImageWithFallback src={avatarUrl} alt="Corretor" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>Carlos Eduardo Motta</p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", marginTop: "1px" }}>Corretor Premium · SUSEP 12345</p>
          </div>
          <ChevronRight size={14} color="rgba(255,255,255,0.25)" aria-hidden="true" />
        </motion.button>

        {settingSections.map((section, si) => (
          <motion.section key={section.title} className="mb-3.5" aria-label={section.title}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.04 + si * 0.04 }}>
            <p className="px-1 mb-1.5" style={{ fontSize: "10px", fontWeight: 600, color: akad.textTertiary, letterSpacing: "2px", textTransform: "uppercase" }}>
              {section.title}
            </p>
            <div className="rounded-[16px] overflow-hidden" style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}>
              {section.items.map((item, i) => (
                <button key={item.label}
                  onClick={() => item.hasToggle ? setDarkToggle(!darkToggle) : setSubPage(item.page)}
                  className="flex items-center gap-3 px-3.5 py-3 w-full text-left cursor-pointer"
                  style={{ borderTop: i > 0 ? `1px solid ${akad.border}` : "none" }}
                  role="menuitem" aria-label={item.label}>
                  <div className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: akad.pinkSoft }}>
                    <item.icon size={15} color={akad.pink} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "13px", fontWeight: 600, color: akad.text }}>{item.label}</p>
                    {item.description && <p style={{ fontSize: "11px", color: akad.textTertiary, marginTop: "0.5px" }}>{item.description}</p>}
                  </div>
                  {item.hasToggle ? (
                    <div className="w-[40px] h-[24px] rounded-full relative shrink-0"
                      style={{ background: darkToggle ? akad.pink : akad.surface, transition: "background 0.2s" }}
                      role="switch" aria-checked={darkToggle}>
                      <div className="absolute top-[3px] w-[18px] h-[18px] rounded-full"
                        style={{ background: "#fff", left: darkToggle ? "19px" : "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", transition: "left 0.2s" }} />
                    </div>
                  ) : <ChevronRight size={14} color={akad.textTertiary} aria-hidden="true" />}
                </button>
              ))}
            </div>
          </motion.section>
        ))}

        {!showLogout ? (
          <button onClick={() => setShowLogout(true)}
            className="w-full rounded-[16px] p-3.5 flex items-center justify-center gap-2 mb-2 cursor-pointer"
            style={{ background: akad.dangerSoft, border: "1px solid rgba(255,71,87,0.06)" }}
            aria-label="Sair da conta">
            <LogOut size={15} color={akad.danger} />
            <span style={{ fontSize: "13px", fontWeight: 600, color: akad.danger }}>Sair da Conta</span>
          </button>
        ) : (
          <motion.div className="rounded-[16px] p-4 mb-2"
            style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadowMd }}
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <p style={{ fontSize: "14px", fontWeight: 600, color: akad.text, textAlign: "center" }}>Deseja mesmo sair?</p>
            <p style={{ fontSize: "11px", color: akad.textTertiary, textAlign: "center", marginTop: "2px" }}>Login necessário ao retornar</p>
            <div className="flex items-center gap-2 mt-3">
              <button onClick={() => setShowLogout(false)} className="flex-1 rounded-xl p-2.5 text-center cursor-pointer" style={{ background: akad.surface }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: akad.text }}>Cancelar</span>
              </button>
              <button onClick={() => setShowLogout(false)} className="flex-1 rounded-xl p-2.5 text-center cursor-pointer" style={{ background: akad.danger }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>Sair</span>
              </button>
            </div>
          </motion.div>
        )}

        <p className="text-center pb-2" style={{ fontSize: "10px", color: akad.textTertiary }}>Akad Seguros v2.4.0</p>
        <div className="h-1" />
      </main>

      <TabBar active={activeTab} onNavigate={onNavigate} />
    </PhoneFrame>
  );
}
