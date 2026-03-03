import { useState, useRef, useEffect, useMemo } from "react";
import {
  Search,
  X,
  Car,
  Heart,
  CreditCard,
  Shield,
  MapPin,
  Wrench,
  FileCheck,
  Headphones,
  Bell,
  User,
  ChevronRight,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { hapticLight, hapticTick } from "./haptics";
import type { TabId } from "./BottomTabBar";

interface SearchItem {
  id: string;
  icon: LucideIcon;
  color: string;
  title: string;
  subtitle: string;
  category: string;
  navigateTo?: TabId;
  keywords: string[];
}

const searchIndex: SearchItem[] = [
  // Policies
  {
    id: "p1",
    icon: Car,
    color: "#0D9488",
    title: "Seguro Auto - HB20 2024",
    subtitle: "AUT-2025-001847 · R$ 389,90/mes",
    category: "Apolice",
    navigateTo: "apolices",
    keywords: ["auto", "carro", "hb20", "hyundai", "veiculo", "seguro auto", "apolice"],
  },
  {
    id: "p2",
    icon: Heart,
    color: "#6366F1",
    title: "Seguro Vida - Premium",
    subtitle: "VID-2025-003291 · R$ 157,50/mes",
    category: "Apolice",
    navigateTo: "apolices",
    keywords: ["vida", "saude", "premium", "seguro vida", "apolice"],
  },
  {
    id: "p3",
    icon: Car,
    color: "#0D9488",
    title: "Seguro Auto - Civic 2023",
    subtitle: "AUT-2025-002103 · R$ 299,90/mes",
    category: "Apolice",
    navigateTo: "apolices",
    keywords: ["auto", "carro", "civic", "honda", "veiculo", "seguro auto", "apolice"],
  },
  // Payments
  {
    id: "pay1",
    icon: CreditCard,
    color: "#0D9488",
    title: "Pagamento - Seguro Auto HB20",
    subtitle: "R$ 389,90 · Vence 05 Mar 2026",
    category: "Pagamento",
    navigateTo: "inicio",
    keywords: ["pagamento", "fatura", "parcela", "pagar", "boleto", "hb20"],
  },
  {
    id: "pay2",
    icon: CreditCard,
    color: "#6366F1",
    title: "Pagamento - Seguro Vida",
    subtitle: "R$ 157,50 · Vence 12 Mar 2026",
    category: "Pagamento",
    navigateTo: "inicio",
    keywords: ["pagamento", "fatura", "parcela", "pagar", "boleto", "vida"],
  },
  {
    id: "pay3",
    icon: CreditCard,
    color: "#0D9488",
    title: "Pagamento - Seguro Auto Civic",
    subtitle: "R$ 299,90 · Vence 20 Mar 2026",
    category: "Pagamento",
    navigateTo: "inicio",
    keywords: ["pagamento", "fatura", "parcela", "pagar", "boleto", "civic"],
  },
  // Quick Actions
  {
    id: "a1",
    icon: MapPin,
    color: "#0D9488",
    title: "Solicitar Guincho",
    subtitle: "Assistencia 24 horas",
    category: "Acao",
    keywords: ["guincho", "reboque", "assistencia", "socorro", "pane"],
  },
  {
    id: "a2",
    icon: Wrench,
    color: "#6366F1",
    title: "Oficinas Credenciadas",
    subtitle: "Rede de oficinas parceiras",
    category: "Acao",
    keywords: ["oficina", "reparo", "conserto", "mecanico", "manutencao"],
  },
  {
    id: "a3",
    icon: FileCheck,
    color: "#0F172A",
    title: "Meus Documentos",
    subtitle: "Apolices, faturas e contratos",
    category: "Acao",
    keywords: ["documento", "contrato", "apolice", "fatura", "pdf", "arquivo"],
  },
  {
    id: "a4",
    icon: Headphones,
    color: "#D97706",
    title: "Suporte ao Cliente",
    subtitle: "Chat, telefone e email",
    category: "Acao",
    keywords: ["suporte", "ajuda", "contato", "chat", "telefone", "atendimento"],
  },
  // Claim
  {
    id: "c1",
    icon: Shield,
    color: "#DC2626",
    title: "Abrir Sinistro",
    subtitle: "Registrar ocorrencia",
    category: "Sinistro",
    navigateTo: "sinistro",
    keywords: ["sinistro", "acidente", "ocorrencia", "colisao", "roubo", "emergencia"],
  },
  // Notifications
  {
    id: "n1",
    icon: Bell,
    color: "#D97706",
    title: "Notificacoes",
    subtitle: "Alertas e atualizacoes",
    category: "Geral",
    navigateTo: "alertas",
    keywords: ["notificacao", "alerta", "aviso", "mensagem"],
  },
  // Profile
  {
    id: "u1",
    icon: User,
    color: "#0F172A",
    title: "Meu Perfil",
    subtitle: "Ricardo Lima · Dados pessoais",
    category: "Geral",
    navigateTo: "perfil",
    keywords: ["perfil", "conta", "dados", "pessoal", "configuracao", "nome"],
  },
];

const recentSearches = ["Pagamento HB20", "Guincho", "Sinistro"];

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: TabId) => void;
}

export function GlobalSearch({ isOpen, onClose, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Small delay for animation
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
    );
  }, [query]);

  const grouped = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    results.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [results]);

  const handleSelect = (item: SearchItem) => {
    hapticLight();
    if (item.navigateTo) {
      onNavigate(item.navigateTo);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-50 flex flex-col"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0F172A]/20 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative z-10 mx-4 sm:mx-5 mt-14 flex flex-col max-h-[75%]"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-3.5 rounded-t-[18px] bg-white border border-gray-100/60 border-b-0 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <Search size={18} className="text-gray-300 flex-shrink-0" strokeWidth={1.6} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  hapticTick();
                }}
                placeholder="Buscar apolices, pagamentos, acoes..."
                className="flex-1 text-[14px] text-[#0F172A] placeholder:text-gray-300 bg-transparent outline-none tracking-tight"
                aria-label="Campo de busca global"
              />
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => { setQuery(""); hapticTick(); inputRef.current?.focus(); }}
                  className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 focus-visible:outline-2 focus-visible:outline-[#0D9488]"
                  aria-label="Limpar busca"
                >
                  <X size={13} className="text-gray-400" strokeWidth={2} />
                </motion.button>
              )}
              <button
                onClick={onClose}
                className="text-[12px] text-gray-400 tracking-wide pl-1 focus-visible:outline-2 focus-visible:outline-[#0D9488] rounded"
              >
                Fechar
              </button>
            </div>

            {/* Results area */}
            <div
              className="rounded-b-[18px] bg-white border border-gray-100/60 border-t-0 shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-y-auto flex-1"
              style={{ scrollbarWidth: "none" }}
            >
              {/* No query — show recent */}
              {!query.trim() && (
                <div className="p-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Clock size={12} className="text-gray-300" strokeWidth={1.5} />
                    <span className="text-[10px] text-gray-300 uppercase tracking-[0.1em]">Recentes</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => { setQuery(term); hapticTick(); }}
                        className="px-3 py-1.5 rounded-lg bg-gray-50 text-[11px] text-gray-500 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#0D9488]"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 mb-2">
                    <span className="text-[10px] text-gray-300 uppercase tracking-[0.1em]">Acesso rapido</span>
                  </div>
                  <div className="space-y-1">
                    {searchIndex.filter((i) => ["c1", "a1", "a4"].includes(i.id)).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-[12px] text-left active:bg-gray-50 transition-all focus-visible:outline-2 focus-visible:outline-[#0D9488]"
                      >
                        <div
                          className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${item.color}08` }}
                        >
                          <item.icon size={15} style={{ color: item.color }} strokeWidth={1.6} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] text-[#0F172A] truncate">{item.title}</p>
                          <p className="text-[10px] text-gray-300 truncate">{item.subtitle}</p>
                        </div>
                        <ChevronRight size={13} className="text-gray-200 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Query with results */}
              {query.trim() && results.length > 0 && (
                <div className="p-3">
                  {Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="mb-3 last:mb-0">
                      <span className="text-[9px] text-gray-300 uppercase tracking-[0.12em] px-1.5">{category}</span>
                      <div className="mt-1.5 space-y-0.5">
                        {items.map((item, index) => (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15, delay: index * 0.03 }}
                            onClick={() => handleSelect(item)}
                            className="w-full flex items-center gap-3 p-2.5 rounded-[12px] text-left active:bg-gray-50 transition-all focus-visible:outline-2 focus-visible:outline-[#0D9488]"
                          >
                            <div
                              className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${item.color}08` }}
                            >
                              <item.icon size={15} style={{ color: item.color }} strokeWidth={1.6} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] text-[#0F172A] truncate">{item.title}</p>
                              <p className="text-[10px] text-gray-300 truncate">{item.subtitle}</p>
                            </div>
                            <ChevronRight size={13} className="text-gray-200 flex-shrink-0" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No results */}
              {query.trim() && results.length === 0 && (
                <div className="text-center py-10 px-6">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
                    <Search size={18} className="text-gray-200" strokeWidth={1.5} />
                  </div>
                  <p className="text-[13px] text-gray-400 tracking-tight">Nenhum resultado</p>
                  <p className="text-[11px] text-gray-300 mt-1">Tente buscar por "auto", "pagamento" ou "guincho"</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}