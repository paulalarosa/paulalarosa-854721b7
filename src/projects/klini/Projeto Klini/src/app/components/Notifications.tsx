import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "./PageHeader";
import {
  CalendarCheck,
  FileCheck,
  CreditCard,
  AlertTriangle,
  Bell,
  Check,
  Trash2,
} from "lucide-react";

interface Notification {
  id: number;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  category: "consulta" | "guia" | "financeiro" | "alerta";
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    icon: CalendarCheck,
    iconBg: "bg-[#2D9F93]/[0.08]",
    iconColor: "#2D9F93",
    title: "Consulta confirmada",
    description: "Sua consulta com Dr. Marcelo Ximenes em 27 Fev às 09:20 foi confirmada.",
    time: "Há 2 horas",
    read: false,
    category: "consulta",
  },
  {
    id: 2,
    icon: FileCheck,
    iconBg: "bg-[#2D9F93]/[0.08]",
    iconColor: "#2D9F93",
    title: "Guia aprovada",
    description: "Sua guia TK-2026-00847 para Hemograma Completo foi aprovada.",
    time: "Há 5 horas",
    read: false,
    category: "guia",
  },
  {
    id: 3,
    icon: CreditCard,
    iconBg: "bg-amber-50",
    iconColor: "#E8A04C",
    title: "Coparticipação registrada",
    description: "Coparticipação de R$ 35,00 referente à consulta de Psiquiatria.",
    time: "Ontem",
    read: true,
    category: "financeiro",
  },
  {
    id: 4,
    icon: AlertTriangle,
    iconBg: "bg-red-50/60",
    iconColor: "#D07048",
    title: "Guia expirando",
    description: "Sua guia TK-2026-00798 para Ressonância expira em 2 dias.",
    time: "Ontem",
    read: true,
    category: "alerta",
  },
  {
    id: 5,
    icon: CalendarCheck,
    iconBg: "bg-blue-50",
    iconColor: "#4A90D9",
    title: "Lembrete de consulta",
    description: "Dra. Ana Clara Mendes - Telemedicina amanhã às 14:00.",
    time: "2 dias atrás",
    read: true,
    category: "consulta",
  },
  {
    id: 6,
    icon: FileCheck,
    iconBg: "bg-[#2D9F93]/[0.08]",
    iconColor: "#2D9F93",
    title: "Solicitação aprovada",
    description: "Sua solicitação de autorização para Teste de Esforço Cardíaco foi aprovada.",
    time: "3 dias atrás",
    read: true,
    category: "guia",
  },
];

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="pb-4">
      <PageHeader
        title="Notificações"
        rightAction={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              className="text-[12px] text-[#2D9F93] cursor-pointer px-3 py-1.5 rounded-xl hover:bg-[#2D9F93]/[0.05] transition-colors"
            >
              Marcar todas como lidas
            </button>
          ) : null
        }
      />

      {/* Resumo */}
      <div className="px-5 pt-1 pb-2">
        <div
          className="bg-white rounded-[20px] p-5 flex items-center gap-4"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8F6F4, #F0FAF9)" }}
          >
            <Bell size={22} className="text-[#2D9F93]" />
          </div>
          <div>
            <p className="text-[20px] text-[#1a1a2e] tracking-[-0.02em]">
              {unreadCount > 0 ? `${unreadCount} novas` : "Tudo lido"}
            </p>
            <p className="text-[12px] text-[#9a9aaa]">
              {notifications.length} notificações no total
            </p>
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="px-5 pt-3">
        <AnimatePresence>
          <div className="flex flex-col gap-2" role="list" aria-label="Lista de notificações">
            {notifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className={`bg-white rounded-[20px] p-4 relative overflow-hidden ${
                  !notif.read ? "border-l-[3px] border-l-[#2D9F93]" : ""
                }`}
                style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
                role="listitem"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-[14px] ${notif.iconBg} flex items-center justify-center shrink-0`}>
                    <notif.icon size={17} style={{ color: notif.iconColor }} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[13px] text-[#1a1a2e] tracking-[-0.01em]">{notif.title}</h4>
                      <span className="text-[10px] text-[#B0B4BC] shrink-0 mt-0.5">{notif.time}</span>
                    </div>
                    <p className="text-[12px] text-[#7a7a8a] mt-1 leading-[1.5]">{notif.description}</p>
                    <div className="flex items-center gap-2 mt-2.5">
                      {!notif.read && (
                        <button
                          onClick={() => markRead(notif.id)}
                          className="flex items-center gap-1 text-[11px] text-[#2D9F93] cursor-pointer hover:bg-[#2D9F93]/[0.05] px-2 py-1 rounded-lg transition-colors"
                        >
                          <Check size={12} />
                          Marcar como lida
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notif.id)}
                        className="flex items-center gap-1 text-[11px] text-[#B0B4BC] cursor-pointer hover:text-[#D07048] hover:bg-red-50/50 px-2 py-1 rounded-lg transition-colors"
                      >
                        <Trash2 size={11} />
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {notifications.length === 0 && (
          <div className="text-center py-16">
            <Bell size={40} className="text-[#E0E2E6] mx-auto mb-3" strokeWidth={1.2} />
            <p className="text-[14px] text-[#9a9aaa]">Nenhuma notificação</p>
            <p className="text-[12px] text-[#C0C4CC] mt-1">Você está em dia!</p>
          </div>
        )}
      </div>
    </div>
  );
}
