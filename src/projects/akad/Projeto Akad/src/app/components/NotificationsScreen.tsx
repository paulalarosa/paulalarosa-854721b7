import { ChevronLeft, Bell, AlertTriangle, CheckCircle, Clock, FileText, TrendingUp } from "lucide-react";
import { akad } from "./akad-theme";

const notifications = [
  { id: 1, type: "alert", icon: AlertTriangle, title: "Renovação urgente", description: "Apólice de Ana Carolina vence em 3 dias", time: "Agora", read: false },
  { id: 2, type: "success", icon: CheckCircle, title: "Cotação aprovada", description: "Carlos Eduardo aprovou Residencial Plus", time: "2h atrás", read: false },
  { id: 3, type: "info", icon: FileText, title: "Nova apólice emitida", description: "Auto Premium — Mariana Ferreira", time: "5h atrás", read: false },
  { id: 4, type: "alert", icon: Clock, title: "Pendência de documentos", description: "Roberto Almeida — Seguro Empresarial", time: "1 dia", read: true },
  { id: 5, type: "success", icon: TrendingUp, title: "Meta atingida!", description: "Você superou a meta de conversão em 3%", time: "2 dias", read: true },
  { id: 6, type: "info", icon: Bell, title: "Academy: novo curso", description: "Auto & Frota já disponível na plataforma", time: "3 dias", read: true },
  { id: 7, type: "alert", icon: AlertTriangle, title: "5 renovações esta semana", description: "Ação necessária para evitar cancelamentos", time: "4 dias", read: true },
];

const typeColors: Record<string, { bg: string; color: string }> = {
  alert: { bg: `${akad.pink}12`, color: akad.pink },
  success: { bg: akad.successSoft, color: akad.success },
  info: { bg: `${akad.blue}12`, color: akad.blueLight },
};

interface NotificationsScreenProps {
  onBack: () => void;
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <nav className="px-4 pt-1 pb-1 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-[12px] flex items-center justify-center cursor-pointer"
          style={{ background: "rgba(255,255,255,0.06)" }}
          aria-label="Voltar ao dashboard"
        >
          <ChevronLeft size={18} color="#fff" />
        </button>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff", letterSpacing: "0.3px" }}>
          Notificações
        </span>
        <button
          className="px-3 py-1.5 rounded-full cursor-pointer"
          style={{ background: "rgba(230,0,126,0.1)" }}
          aria-label="Marcar todas como lidas"
        >
          <span style={{ fontSize: "11px", color: akad.pink, fontWeight: 600 }}>Limpar</span>
        </button>
      </nav>

      {unreadCount > 0 && (
        <div className="px-4 pt-2 pb-1">
          <span style={{ fontSize: "10px", fontWeight: 600, color: akad.textOnDarkTertiary, letterSpacing: "2px", textTransform: "uppercase" }}>
            Novas ({unreadCount})
          </span>
        </div>
      )}

      <main className="flex-1 px-4 pt-2 pb-4 overflow-y-auto" style={{ scrollbarWidth: "none" }} role="list" aria-label="Lista de notificações">
        <div className="flex flex-col gap-1.5">
          {notifications.map((n, i) => {
            const colors = typeColors[n.type];
            const showDivider = i === unreadCount - 1 && unreadCount > 0 && unreadCount < notifications.length;
            return (
              <div key={n.id}>
                <button
                  className="flex items-start gap-3 p-3 rounded-[16px] w-full text-left cursor-pointer"
                  style={{
                    background: n.read ? "transparent" : "rgba(255,255,255,0.03)",
                    border: n.read ? "1px solid transparent" : `1px solid ${akad.darkBorder}`,
                  }}
                  role="listitem"
                  aria-label={`${n.title} — ${n.description} — ${n.time}`}
                >
                  <div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: colors.bg }}
                  >
                    <n.icon size={15} color={colors.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate" style={{ fontSize: "13px", fontWeight: 600, color: n.read ? "rgba(255,255,255,0.5)" : "#fff" }}>
                        {n.title}
                      </p>
                      {!n.read && (
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: akad.pink }} aria-label="Não lida" />
                      )}
                    </div>
                    <p className="truncate" style={{ fontSize: "12px", color: akad.textOnDarkTertiary, marginTop: "2px" }}>
                      {n.description}
                    </p>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", marginTop: "4px" }}>
                      {n.time}
                    </p>
                  </div>
                </button>
                {showDivider && (
                  <div className="flex items-center gap-3 py-3 px-2">
                    <div className="flex-1 h-px" style={{ background: akad.darkBorder }} />
                    <span style={{ fontSize: "10px", color: akad.textOnDarkTertiary, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500 }}>
                      Anteriores
                    </span>
                    <div className="flex-1 h-px" style={{ background: akad.darkBorder }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}