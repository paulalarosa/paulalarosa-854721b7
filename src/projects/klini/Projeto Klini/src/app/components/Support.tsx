import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "./PageHeader";
import {
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ExternalLink,
  Clock,
  MapPin,
} from "lucide-react";

const faqItems = [
  {
    id: 1,
    q: "Como agendar uma consulta?",
    a: "Acesse a Rede Credenciada na tela inicial, selecione a especialidade e tipo de atendimento desejado, escolha um profissional e toque em 'Agendar'.",
  },
  {
    id: 2,
    q: "Como obter uma cópia da minha carteirinha?",
    a: "Sua carteirinha digital está disponível na tela inicial. Toque em 'Ver carteirinha completa' para acessar a versão para impressão ou compartilhar diretamente com seu médico.",
  },
  {
    id: 3,
    q: "O que significa coparticipação?",
    a: "Coparticipação é um regime de divisão de custos onde você paga uma porcentagem de determinados procedimentos médicos. Consulte a seção Coparticipação para ver suas taxas específicas.",
  },
  {
    id: 4,
    q: "Como solicitar autorização para um procedimento?",
    a: "Acesse Solicitações na tela inicial e toque em 'Nova Solicitação'. Envie o pedido médico do seu profissional e nossa equipe processará em até 48 horas.",
  },
  {
    id: 5,
    q: "Como cancelar uma consulta?",
    a: "Abra a tela de Consultas, encontre sua consulta agendada e toque nela para ver os detalhes. Você verá a opção de cancelamento. Cancele com pelo menos 24 horas de antecedência.",
  },
];

const contactOptions = [
  {
    icon: MessageCircle,
    label: "Chat ao Vivo",
    subtitle: "Tempo médio: 2 min",
  },
  {
    icon: Phone,
    label: "Central de Atendimento",
    subtitle: "0800 123 4567",
  },
  {
    icon: Mail,
    label: "E-mail",
    subtitle: "suporte@klini.com.br",
  },
];

export function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pb-4">
      <PageHeader title="Suporte" />

      {/* Horário de funcionamento */}
      <div className="px-5 pt-1">
        <div
          className="bg-white rounded-[20px] p-5 flex items-center gap-4"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <div className="w-10 h-10 rounded-[14px] bg-[#2D9F93]/[0.07] flex items-center justify-center shrink-0">
            <Clock size={18} className="text-[#2D9F93]" />
          </div>
          <div>
            <p className="text-[13px] text-[#1a1a2e]">Disponível 24h</p>
            <p className="text-[11px] text-[#9a9aaa] mt-0.5">Linha de emergência sempre ativa</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-emerald-600">Online</span>
          </div>
        </div>
      </div>

      {/* Opções de contato */}
      <div className="px-5 pt-5">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3 px-1">Fale Conosco</p>
        <div className="flex flex-col gap-2.5">
          {contactOptions.map((option, index) => (
            <motion.button
              key={option.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-[20px] p-4 flex items-center gap-4 w-full text-left cursor-pointer"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)" }}
              aria-label={`${option.label}: ${option.subtitle}`}
            >
              <div className="w-10 h-10 rounded-[14px] bg-[#2D9F93]/[0.07] flex items-center justify-center shrink-0">
                <option.icon size={18} className="text-[#2D9F93]" strokeWidth={1.7} />
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-[#1a1a2e]">{option.label}</p>
                <p className="text-[12px] text-[#9a9aaa] mt-0.5">{option.subtitle}</p>
              </div>
              <ExternalLink size={14} className="text-[#C0C4CC]" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Clínica mais próxima */}
      <div className="px-5 pt-5">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3 px-1">Clínica Mais Próxima</p>
        <div
          className="bg-white rounded-[20px] p-5"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-[14px] bg-[#2D9F93]/[0.07] flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-[#2D9F93]" />
            </div>
            <div>
              <p className="text-[14px] text-[#1a1a2e]">CM Klini - Barra da Tijuca</p>
              <p className="text-[12px] text-[#9a9aaa] mt-0.5">
                Av. das Américas, 4200 - Bloco 2
              </p>
              <p className="text-[11px] text-[#2D9F93] mt-1">A 2,3 km de distância</p>
            </div>
          </div>
        </div>
      </div>

      {/* Perguntas Frequentes */}
      <div className="px-5 pt-5">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3 px-1">
          Perguntas Frequentes
        </p>
        <div className="flex flex-col gap-2.5">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 + 0.2 }}
              className="bg-white rounded-[20px] overflow-hidden"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)" }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                aria-expanded={openFaq === item.id}
                aria-controls={`faq-${item.id}`}
              >
                <span className="text-[13px] text-[#1a1a2e] flex-1 pr-3">{item.q}</span>
                <motion.div
                  animate={{ rotate: openFaq === item.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-[#C0C4CC] shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === item.id && (
                  <motion.div
                    id={`faq-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-[12px] text-[#7a7a8a] leading-[1.6]">{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
