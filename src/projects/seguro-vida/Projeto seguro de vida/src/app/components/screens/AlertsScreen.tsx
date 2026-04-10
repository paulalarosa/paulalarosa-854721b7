import { useState } from "react";
import {
  Bell,
  CreditCard,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { hapticTick } from "../haptics";
import type { TabId } from "../BottomTabBar";
import type { QuickActionId } from "../QuickActions";

interface ScreenProps {
  onNavigate: (tab: TabId) => void;
  onOpenSearch?: () => void;
  onQuickAction?: (id: QuickActionId) => void;
}

interface Notification {
  id: string;
  type: "payment" | "claim" | "info" | "warning";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "payment",
    title: "Pagamento confirmado",
    message: "Parcela de R$ 389,90 do Seguro Auto processada com sucesso",
    time: "Agora",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Vencimento proximo",
    message: "Parcela do Seguro Vida vence em 3 dias - R$ 157,50",
    time: "2h",
    read: false,
  },
  {
    id: "3",
    type: "claim",
    title: "Sinistro atualizado",
    message: "Seu sinistro SIN-2025-041823 foi concluido. Veja os detalhes",
    time: "1d",
    read: false,
  },
  {
    id: "4",
    type: "info",
    title: "Novo beneficio",
    message: "Carro reserva estendido para 20 dias no seu plano Auto",
    time: "2d",
    read: true,
  },
  {
    id: "5",
    type: "payment",
    title: "Fatura disponivel",
    message: "A fatura de marco ja esta disponivel para consulta",
    time: "3d",
    read: true,
  },
  {
    id: "6",
    type: "info",
    title: "Atualizacao do app",
    message: "Nova versao disponivel com melhorias de seguranca",
    time: "5d",
    read: true,
  },
];

const iconMap = {
  payment: CreditCard,
  claim: Shield,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  payment: "#0D9488",
  claim: "#6366F1",
  info: "#0F172A",
  warning: "#D97706",
};

export function AlertsScreen({ onNavigate, onOpenSearch, onQuickAction }: ScreenProps) {
  // Props handled via destructuring for type safety
  void onNavigate; void onOpenSearch; void onQuickAction;
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayed = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    hapticTick();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6" style={{ scrollbarWidth: "none" }}>
      <div className="flex items-center justify-between pt-2 pb-5">
        <div>
          <h1 className="text-[22px] text-[#0F172A] tracking-tight">Alertas</h1>
          <p className="text-[12px] text-gray-400">
            {unreadCount > 0 ? `${unreadCount} nao lidas` : "Tudo em dia"}
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 flex items-center justify-center">
          <Bell size={18} className="text-[#0F172A]" strokeWidth={1.6} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1.5" role="tablist" aria-label="Filtro de notificacoes">
          {[
            { key: "all" as const, label: "Todas" },
            { key: "unread" as const, label: `Nao lidas (${unreadCount})` },
          ].map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => { hapticTick(); setFilter(f.key); }}
              className={`px-3.5 py-2 rounded-xl text-[11px] tracking-wide transition-all focus-visible:outline-2 focus-visible:outline-[#0D9488] ${
                filter === f.key
                  ? "bg-[#0F172A] text-white"
                  : "bg-white/80 text-gray-500 border border-gray-100/60"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-[11px] text-gray-400 tracking-wide focus-visible:outline-2 focus-visible:outline-[#0D9488] rounded"
            aria-label="Marcar todas como lidas"
          >
            Ler todas
          </button>
        )}
      </div>

      {/* Notifications */}
      <div className="space-y-2" role="list" aria-label="Lista de notificacoes">
        {displayed.map((notification, index) => {
          const Icon = iconMap[notification.type];
          const color = colorMap[notification.type];

          return (
            <motion.button
              key={notification.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              onClick={() => toggleRead(notification.id)}
              role="listitem"
              className={`w-full text-left p-4 rounded-2xl border transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#0D9488] ${
                notification.read
                  ? "bg-white/50 border-gray-100/40"
                  : "bg-white/80 backdrop-blur-sm border-gray-100/60 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
              }`}
              aria-label={`${notification.title} - ${notification.message}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: `${color}${notification.read ? "05" : "08"}` }}
                >
                  <Icon
                    size={16}
                    style={{ color: notification.read ? `${color}80` : color }}
                    strokeWidth={1.6}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className={`text-[12px] tracking-tight ${notification.read ? "text-gray-500" : "text-[#0F172A]"}`}>
                      {notification.title}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-gray-300">{notification.time}</span>
                      {!notification.read && (
                        <span className="w-[6px] h-[6px] rounded-full bg-[#0D9488]" />
                      )}
                    </div>
                  </div>
                  <p className={`text-[11px] ${notification.read ? "text-gray-300" : "text-gray-400"}`}>
                    {notification.message}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-12">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={22} className="text-gray-200" strokeWidth={1.5} />
          </div>
          <p className="text-[14px] text-gray-400 tracking-tight">Tudo em dia</p>
          <p className="text-[11px] text-gray-300 mt-1">Nenhuma notificacao pendente</p>
        </div>
      )}

      <div className="h-6" />
    </div>
  );
}
