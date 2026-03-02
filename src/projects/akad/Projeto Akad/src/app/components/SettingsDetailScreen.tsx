import React from "react";
import { ChevronLeft, User, Lock, Bell, Globe, Palette, FileText, Shield, HelpCircle, EyeOff, Smartphone, Key, Fingerprint, Check } from "lucide-react";
import { akad } from "./akad-theme";

type SettingsPage = "personal" | "security" | "notifications" | "language" | "appearance" | "terms" | "privacy" | "help";

interface SettingsDetailScreenProps {
  page: SettingsPage;
  onBack: () => void;
}

function Toggle({ on, label }: { on: boolean; label: string }) {
  const [isOn, setIsOn] = React.useState(on);
  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className="w-[44px] h-[26px] rounded-full relative cursor-pointer shrink-0"
      style={{ background: isOn ? akad.pink : akad.surface, transition: "background 0.2s ease" }}
      role="switch"
      aria-checked={isOn}
      aria-label={label}
    >
      <div
        className="absolute top-[3px] w-5 h-5 rounded-full"
        style={{
          background: "#fff",
          left: isOn ? "21px" : "3px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          transition: "left 0.2s ease",
        }}
      />
    </button>
  );
}

function PagePersonal() {
  return (
    <>
      <div className="flex flex-col items-center mb-5">
        <div
          className="w-20 h-20 rounded-[24px] flex items-center justify-center"
          style={{ background: akad.gradientMixed }}
        >
          <span style={{ color: "#fff", fontSize: "28px", fontWeight: 700 }}>CE</span>
        </div>
        <button className="mt-3 px-4 py-1.5 rounded-full cursor-pointer"
          style={{ background: akad.pinkSoft }}
          aria-label="Alterar foto de perfil"
        >
          <span style={{ fontSize: "12px", color: akad.pink, fontWeight: 600 }}>Alterar Foto</span>
        </button>
      </div>

      {[
        { label: "Nome Completo", value: "Carlos Eduardo Motta" },
        { label: "E-mail", value: "carlos@corretor.com" },
        { label: "Telefone", value: "(11) 98765-4321" },
        { label: "SUSEP", value: "12345" },
        { label: "CPF", value: "•••.•••.456-78" },
        { label: "Corretora", value: "Akad Seguros" },
      ].map((field) => (
        <div key={field.label} className="mb-3">
          <label style={{ fontSize: "11px", color: akad.textTertiary, letterSpacing: "1px", textTransform: "uppercase", fontWeight: 500, display: "block", marginBottom: "6px", paddingLeft: "4px" }}>
            {field.label}
          </label>
          <div
            className="rounded-[14px] px-4 py-3"
            style={{ background: akad.surface }}
          >
            <span style={{ fontSize: "14px", color: akad.text, fontWeight: 500 }}>{field.value}</span>
          </div>
        </div>
      ))}

      <button
        className="w-full rounded-[16px] p-3.5 flex items-center justify-center cursor-pointer mt-2"
        style={{ background: akad.gradientAccent }}
        aria-label="Salvar alterações"
      >
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>Salvar Alterações</span>
      </button>
    </>
  );
}

function PageSecurity() {
  return (
    <>
      <section className="rounded-[20px] p-4 mb-3" style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}>
        <div className="flex items-center gap-3 mb-4">
          <Key size={16} color={akad.pink} />
          <span style={{ fontSize: "13px", fontWeight: 700, color: akad.text, textTransform: "uppercase", letterSpacing: "0.8px" }}>Senha</span>
        </div>
        <div className="mb-3">
          <label style={{ fontSize: "11px", color: akad.textTertiary, letterSpacing: "1px", textTransform: "uppercase", fontWeight: 500, display: "block", marginBottom: "6px" }}>
            Senha Atual
          </label>
          <div className="flex items-center rounded-[14px] px-4 py-3" style={{ background: akad.surface }}>
            <span className="flex-1" style={{ fontSize: "14px", color: akad.text }}>••••••••</span>
            <EyeOff size={16} color={akad.textTertiary} />
          </div>
        </div>
        <button className="w-full rounded-[14px] p-3 flex items-center justify-center cursor-pointer"
          style={{ background: akad.pinkSoft }}
          aria-label="Alterar senha"
        >
          <span style={{ fontSize: "13px", fontWeight: 600, color: akad.pink }}>Alterar Senha</span>
        </button>
      </section>

      <section className="rounded-[20px] p-4 mb-3" style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}>
        <div className="flex items-center gap-3 mb-4">
          <Smartphone size={16} color={akad.blueLight} />
          <span style={{ fontSize: "13px", fontWeight: 700, color: akad.text, textTransform: "uppercase", letterSpacing: "0.8px" }}>Autenticação 2FA</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: "14px", fontWeight: 500, color: akad.text }}>SMS</p>
            <p style={{ fontSize: "11px", color: akad.textTertiary }}>Código por mensagem</p>
          </div>
          <Toggle on={true} label="SMS 2FA" />
        </div>
        <div className="my-2.5 h-px" style={{ background: akad.border }} />
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: "14px", fontWeight: 500, color: akad.text }}>App Autenticador</p>
            <p style={{ fontSize: "11px", color: akad.textTertiary }}>Google Authenticator</p>
          </div>
          <Toggle on={false} label="App Authenticator 2FA" />
        </div>
      </section>

      <section className="rounded-[20px] p-4" style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}>
        <div className="flex items-center gap-3 mb-4">
          <Fingerprint size={16} color={akad.success} />
          <span style={{ fontSize: "13px", fontWeight: 700, color: akad.text, textTransform: "uppercase", letterSpacing: "0.8px" }}>Biometria</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: "14px", fontWeight: 500, color: akad.text }}>Face ID / Touch ID</p>
            <p style={{ fontSize: "11px", color: akad.textTertiary }}>Login rápido e seguro</p>
          </div>
          <Toggle on={true} label="Biometria" />
        </div>
      </section>
    </>
  );
}

function PageNotifications() {
  return (
    <>
      {[
        { title: "Push", items: [
          { label: "Renovações", desc: "Alertas de vencimento", on: true },
          { label: "Cotações", desc: "Novas e aprovadas", on: true },
          { label: "Sinistros", desc: "Atualizações de status", on: true },
          { label: "Academy", desc: "Novos cursos e certificados", on: false },
        ]},
        { title: "E-mail", items: [
          { label: "Relatório Semanal", desc: "Resumo de performance", on: true },
          { label: "Relatório Mensal", desc: "Análise completa", on: true },
          { label: "Marketing", desc: "Novidades e promoções", on: false },
        ]},
      ].map((section) => (
        <section key={section.title} className="mb-4">
          <p style={{ fontSize: "11px", fontWeight: 600, color: akad.textTertiary, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", paddingLeft: "4px" }}>
            {section.title}
          </p>
          <div className="rounded-[20px] overflow-hidden" style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}>
            {section.items.map((item, i) => (
              <div key={item.label} className="flex items-center justify-between px-4 py-3.5"
                style={{ borderTop: i > 0 ? `1px solid ${akad.border}` : "none" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: akad.text }}>{item.label}</p>
                  <p style={{ fontSize: "12px", color: akad.textTertiary, marginTop: "1px" }}>{item.desc}</p>
                </div>
                <Toggle on={item.on} label={item.label} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function PageText({ title, content }: { title: string; content: string[] }) {
  return (
    <section className="rounded-[22px] p-5" style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}>
      <h2 style={{ fontSize: "18px", fontWeight: 700, color: akad.text, marginBottom: "12px" }}>{title}</h2>
      {content.map((p, i) => (
        <p key={i} style={{ fontSize: "13px", color: akad.textSecondary, lineHeight: 1.6, marginBottom: "10px" }}>
          {p}
        </p>
      ))}
      <p style={{ fontSize: "11px", color: akad.textTertiary, marginTop: "8px" }}>
        Última atualização: 01/01/2026
      </p>
    </section>
  );
}

function PageHelp() {
  const faqs = [
    { q: "Como emitir uma nova apólice?", a: "Acesse Apólices → Adicionar e preencha os dados do cliente." },
    { q: "Como funciona a comissão?", a: "As comissões são calculadas automaticamente com base no prêmio líquido." },
    { q: "Posso exportar relatórios?", a: "Sim, acesse Dashboard → Relatório Mensal → Baixar PDF." },
    { q: "Como alterar dados do cliente?", a: "Acesse o perfil do cliente e toque em editar." },
  ];

  return (
    <>
      <section className="rounded-[22px] p-5 mb-3" style={{ background: akad.gradientPrimary }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>Precisa de ajuda?</p>
        <p style={{ color: "#fff", fontSize: "18px", fontWeight: 700, marginTop: "4px" }}>Fale com nosso suporte</p>
        <button
          className="mt-3 px-5 py-2.5 rounded-full cursor-pointer"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          aria-label="Abrir chat de suporte"
        >
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>Iniciar Chat</span>
        </button>
      </section>

      <p style={{ fontSize: "11px", fontWeight: 600, color: akad.textTertiary, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", paddingLeft: "4px" }}>
        Perguntas Frequentes
      </p>

      <div className="rounded-[20px] overflow-hidden" style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}>
        {faqs.map((faq, i) => (
          <details key={i} style={{ borderTop: i > 0 ? `1px solid ${akad.border}` : "none" }}>
            <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer list-none"
              style={{ fontSize: "14px", fontWeight: 600, color: akad.text }}>
              {faq.q}
            </summary>
            <p className="px-4 pb-3.5" style={{ fontSize: "13px", color: akad.textSecondary, lineHeight: 1.5 }}>
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </>
  );
}

const pageInfo: Record<SettingsPage, { title: string; icon: typeof User }> = {
  personal: { title: "Dados Pessoais", icon: User },
  security: { title: "Segurança", icon: Lock },
  notifications: { title: "Notificações", icon: Bell },
  language: { title: "Idioma", icon: Globe },
  appearance: { title: "Aparência", icon: Palette },
  terms: { title: "Termos de Uso", icon: FileText },
  privacy: { title: "Privacidade", icon: Shield },
  help: { title: "Central de Ajuda", icon: HelpCircle },
};

function PageLanguage() {
  const [selected, setSelected] = React.useState("pt-BR");
  const langs = [
    { code: "pt-BR", name: "Português (Brasil)" },
    { code: "en-US", name: "English (US)" },
    { code: "es-ES", name: "Español" },
  ];
  return (
    <div className="rounded-[20px] overflow-hidden" style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}>
      {langs.map((lang, i) => (
        <button
          key={lang.code}
          onClick={() => setSelected(lang.code)}
          className="flex items-center justify-between px-4 py-4 w-full text-left cursor-pointer"
          style={{ borderTop: i > 0 ? `1px solid ${akad.border}` : "none" }}
          aria-label={`Selecionar ${lang.name}`}
        >
          <span style={{ fontSize: "14px", fontWeight: 600, color: akad.text }}>{lang.name}</span>
          {selected === lang.code && (
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: akad.gradientAccent }}>
              <Check size={14} color="#fff" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

function PageAppearance() {
  const [selectedTheme, setSelectedTheme] = React.useState("light");
  return (
    <>
      <p style={{ fontSize: "11px", fontWeight: 600, color: akad.textTertiary, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", paddingLeft: "4px" }}>
        Tema
      </p>
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {[
          { id: "light", label: "Claro", bg: "#FAFAFC", fg: akad.text },
          { id: "dark", label: "Escuro", bg: akad.darkBg, fg: "#fff" },
          { id: "auto", label: "Sistema", bg: `linear-gradient(135deg, #FAFAFC 50%, ${akad.darkBg} 50%)`, fg: akad.text },
        ].map((theme) => (
          <button
            key={theme.id}
            onClick={() => setSelectedTheme(theme.id)}
            className="rounded-[16px] p-3 text-center cursor-pointer"
            style={{
              background: typeof theme.bg === "string" && theme.bg.includes("gradient") ? theme.bg : theme.bg,
              border: selectedTheme === theme.id ? `2px solid ${akad.pink}` : `2px solid ${akad.border}`,
              minHeight: "70px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end",
            }}
            aria-label={`Tema ${theme.label}`}
            aria-pressed={selectedTheme === theme.id}
          >
            <span style={{ fontSize: "11px", fontWeight: 600, color: selectedTheme === theme.id ? akad.pink : akad.textSecondary }}>
              {theme.label}
            </span>
          </button>
        ))}
      </div>

      <p style={{ fontSize: "11px", fontWeight: 600, color: akad.textTertiary, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", paddingLeft: "4px" }}>
        Cor de Destaque
      </p>
      <div className="flex items-center gap-3 px-1">
        {[akad.pink, akad.blue, akad.blueLight, akad.success, "#FF6B35", "#8B5CF6"].map((color) => (
          <button
            key={color}
            className="w-10 h-10 rounded-full cursor-pointer"
            style={{ background: color, border: color === akad.pink ? "3px solid rgba(230,0,126,0.3)" : "3px solid transparent" }}
            aria-label={`Cor ${color}`}
          />
        ))}
      </div>
    </>
  );
}

export function SettingsDetailScreen({ page, onBack }: SettingsDetailScreenProps) {
  const info = pageInfo[page];

  const renderContent = () => {
    switch (page) {
      case "personal":
        return <PagePersonal />;
      case "security":
        return <PageSecurity />;
      case "notifications":
        return <PageNotifications />;
      case "language":
        return <PageLanguage />;
      case "appearance":
        return <PageAppearance />;
      case "terms":
        return <PageText title="Termos de Uso" content={[
          "Ao utilizar o aplicativo Akad Seguros, você concorda com estes termos que regulam o uso da plataforma para corretores de seguros.",
          "A plataforma é destinada exclusivamente a corretores devidamente registrados na SUSEP e vinculados a empresas parceiras.",
          "O uso indevido da plataforma, incluindo compartilhamento de credenciais ou acesso não autorizado a dados de clientes, poderá resultar em suspensão.",
          "Todos os dados transacionados são protegidos por criptografia de ponta a ponta conforme a LGPD.",
        ]} />;
      case "privacy":
        return <PageText title="Política de Privacidade" content={[
          "A Akad Seguros respeita sua privacidade e se compromete com a proteção dos seus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD).",
          "Coletamos apenas os dados necessários para a operação da plataforma: nome, e-mail, telefone e registro SUSEP.",
          "Seus dados não são compartilhados com terceiros sem seu consentimento expresso, exceto quando exigido por lei.",
          "Você tem direito a acessar, corrigir e excluir seus dados a qualquer momento através das configurações do aplicativo.",
        ]} />;
      case "help":
        return <PageHelp />;
      default:
        return null;
    }
  };

  return (
    <>
      <nav className="px-4 pt-1 pb-1 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-[12px] flex items-center justify-center cursor-pointer"
          style={{ background: akad.surface }}
          aria-label="Voltar para configurações"
        >
          <ChevronLeft size={18} color={akad.text} />
        </button>
        <span style={{ fontSize: "13px", fontWeight: 600, color: akad.text }}>
          {info.title}
        </span>
        <div className="w-10" aria-hidden="true" />
      </nav>

      <main className="flex-1 px-4 pt-3 pb-4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {renderContent()}
      </main>
    </>
  );
}