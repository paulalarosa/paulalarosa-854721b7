import React from "react";
import { Search, Filter, ChevronRight, Car, Home as HomeIcon, Heart, Briefcase, Zap, X } from "lucide-react";
import { akad } from "./akad-theme";
import { PhoneFrame } from "./PhoneFrame";
import { TabBar, TabId } from "./TabBar";
import { PolicyDetailScreen } from "./PolicyDetailScreen";
import { motion, AnimatePresence } from "motion/react";

const allPolicies = [
  { id: 1, client: "Ana Carolina Silva", type: "Auto Premium", icon: Car, value: "R$ 4.200", status: "Ativa", statusColor: akad.success, dueDate: "15/08/2026" },
  { id: 2, client: "Carlos Eduardo Motta", type: "Residencial Plus", icon: HomeIcon, value: "R$ 2.800", status: "Ativa", statusColor: akad.success, dueDate: "22/09/2026" },
  { id: 3, client: "Mariana Ferreira", type: "Vida Individual", icon: Heart, value: "R$ 1.500", status: "Renovação", statusColor: akad.warning, dueDate: "03/03/2026" },
  { id: 4, client: "Roberto Almeida", type: "Empresarial", icon: Briefcase, value: "R$ 12.000", status: "Ativa", statusColor: akad.success, dueDate: "18/11/2026" },
  { id: 5, client: "Juliana Santos", type: "Cyber Security", icon: Zap, value: "R$ 8.400", status: "Pendente", statusColor: akad.pink, dueDate: "—" },
  { id: 6, client: "Fernando Costa", type: "Auto Básico", icon: Car, value: "R$ 2.100", status: "Vencida", statusColor: akad.danger, dueDate: "10/02/2026" },
];

const filterOptions = ["Todas", "Ativas", "Renovação", "Pendentes", "Vencidas"] as const;
type FilterOption = typeof filterOptions[number];
const statusMap: Record<FilterOption, string | null> = { "Todas": null, "Ativas": "Ativa", "Renovação": "Renovação", "Pendentes": "Pendente", "Vencidas": "Vencida" };

const stats = [
  { label: "Ativas", value: "1.148", color: akad.success },
  { label: "Renovação", value: "42", color: akad.warning },
  { label: "Pendentes", value: "18", color: akad.pink },
];

interface PoliciesScreenProps {
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
}

export function PoliciesScreen({ activeTab, onNavigate }: PoliciesScreenProps) {
  const [search, setSearch] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState<FilterOption>("Todas");
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedPolicy, setSelectedPolicy] = React.useState<typeof allPolicies[0] | null>(null);

  const filtered = allPolicies.filter((p) => {
    const matchesSearch = search.trim() === "" || p.client.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "Todas" || p.status === statusMap[activeFilter];
    return matchesSearch && matchesFilter;
  });

  if (selectedPolicy) {
    return (
      <PhoneFrame>
        <PolicyDetailScreen policyType={selectedPolicy.type} clientName={selectedPolicy.client}
          status={selectedPolicy.status} statusColor={selectedPolicy.statusColor}
          value={selectedPolicy.value} onBack={() => setSelectedPolicy(null)} />
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <header className="px-5 pt-2 pb-1">
        <h1 style={{ color: akad.text, fontSize: "26px", fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.2 }}>Apólices</h1>
        <p style={{ color: akad.textTertiary, fontSize: "12px", marginTop: "1px" }}>Gerencie todas as apólices</p>
      </header>

      <div className="px-4 pt-2 pb-1">
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl" style={{ background: akad.surface }}>
          <Search size={16} color={akad.textTertiary} aria-hidden="true" />
          <input type="search" placeholder="Buscar cliente ou apólice..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-[#A09CB8]"
            style={{ color: akad.text, fontSize: "13px", fontWeight: 500, lineHeight: 1.4 }}
            aria-label="Buscar apólices" />
          {search && <button onClick={() => setSearch("")} className="cursor-pointer" aria-label="Limpar"><X size={15} color={akad.textTertiary} /></button>}
          <button onClick={() => setShowFilters(!showFilters)}
            className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer shrink-0"
            style={{ background: showFilters ? akad.pink : akad.pinkSoft }}
            aria-label="Filtrar" aria-expanded={showFilters}>
            <Filter size={13} color={showFilters ? "#fff" : akad.pink} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.15 }} className="overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 pt-1.5 pb-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {filterOptions.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className="px-3 py-1.5 rounded-full whitespace-nowrap cursor-pointer shrink-0"
                  style={{ background: activeFilter === f ? akad.pink : akad.surface, color: activeFilter === f ? "#fff" : akad.textSecondary, fontSize: "11px", fontWeight: 600 }}
                  aria-pressed={activeFilter === f}>{f}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-1.5 px-4 py-2" role="list" aria-label="Resumo">
        {stats.map((s) => (
          <div key={s.label} className="flex-1 rounded-xl p-2.5 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}10` }} role="listitem">
            <p style={{ fontSize: "18px", fontWeight: 700, color: akad.text, letterSpacing: "-0.8px" }}>{s.value}</p>
            <p style={{ fontSize: "9px", color: akad.textSecondary, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", marginTop: "1px" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <main className="flex-1 px-4 pb-1 overflow-y-auto" style={{ scrollbarWidth: "none" }} role="list" aria-label="Apólices">
        <div className="flex flex-col gap-1.5">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10">
              <Search size={28} color={akad.textTertiary} />
              <p style={{ fontSize: "13px", color: akad.textTertiary, marginTop: "8px", fontWeight: 500 }}>Nenhuma apólice encontrada</p>
            </div>
          )}
          {filtered.map((policy) => (
            <motion.button key={policy.id} onClick={() => setSelectedPolicy(policy)}
              className="flex items-center gap-3 p-3 rounded-[16px] w-full text-left cursor-pointer"
              style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}
              layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.12 }}
              role="listitem" aria-label={`${policy.type} — ${policy.client} — ${policy.status}`}>
              <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0" style={{ background: akad.pinkSoft }}>
                <policy.icon size={17} color={akad.pink} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate" style={{ fontSize: "13px", fontWeight: 600, color: akad.text }}>{policy.type}</p>
                  <span className="px-1.5 py-0.5 rounded-full shrink-0"
                    style={{ background: `${policy.statusColor}10`, color: policy.statusColor, fontSize: "9px", fontWeight: 600 }}>
                    {policy.status}
                  </span>
                </div>
                <p className="truncate" style={{ fontSize: "11px", color: akad.textTertiary, marginTop: "1px" }}>
                  {policy.client} · {policy.value}/ano
                </p>
              </div>
              <ChevronRight size={14} color={akad.textTertiary} aria-hidden="true" />
            </motion.button>
          ))}
        </div>
        <div className="h-1" />
      </main>

      <TabBar active={activeTab} onNavigate={onNavigate} />
    </PhoneFrame>
  );
}
