import React from "react";
import { Search, Plus, ChevronRight, X } from "lucide-react";
import { akad } from "./akad-theme";

import { TabBar, TabId } from "./TabBar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

const clients = [
  { id: "ana", name: "Ana Carolina Silva", avatar: "https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwYnVzaW5lc3MlMjBhdmF0YXJ8ZW58MXx8fHwxNzcxOTI5NDI0fDA&ixlib=rb-4.1.0&q=80&w=1080", policies: 3, totalValue: "R$ 8.500", city: "São Paulo, SP", tag: "Premium" },
  { id: "carlos", name: "Carlos Eduardo Motta", avatar: "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90JTIwYnVzaW5lc3N8ZW58MXx8fHwxNzcxOTI0Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080", policies: 2, totalValue: "R$ 14.800", city: "Rio de Janeiro, RJ", tag: "Empresarial" },
  { id: "mariana", name: "Mariana Ferreira", avatar: "https://images.unsplash.com/photo-1765005204058-10418f5123c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMHdvbWFuJTIwaGVhZHNob3QlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzcxOTM4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", policies: 1, totalValue: "R$ 1.500", city: "Curitiba, PR", tag: null },
  { id: "roberto", name: "Roberto Almeida", avatar: null, policies: 4, totalValue: "R$ 22.300", city: "Belo Horizonte, MG", tag: "Premium" },
  { id: "juliana", name: "Juliana Santos", avatar: null, policies: 1, totalValue: "R$ 8.400", city: "Brasília, DF", tag: null },
  { id: "fernando", name: "Fernando Costa", avatar: null, policies: 2, totalValue: "R$ 4.300", city: "Porto Alegre, RS", tag: null },
];

function AvatarInitials({ name }: { name: string }) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(n => n[0]).join("").toUpperCase();
  return (
    <div className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
      style={{ background: akad.gradientMixed }} aria-hidden="true">
      <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700, lineHeight: 1 }}>{initials}</span>
    </div>
  );
}

interface ClientsScreenProps {
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
  onSelectClient: (id: string) => void;
  onAddClient: () => void;
}

export function ClientsScreen({ activeTab, onNavigate, onSelectClient, onAddClient }: ClientsScreenProps) {
  const [search, setSearch] = React.useState("");

  const filtered = clients.filter((c) =>
    search.trim() === "" ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      <header className="px-5 pt-12 pb-4 bg-white border-b border-gray-100 shadow-sm z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ color: akad.text, fontSize: "28px", fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.2 }}>
              Clientes
            </h1>
            <p style={{ color: akad.textTertiary, fontSize: "13px", marginTop: "2px", fontWeight: 500 }}>
              {filtered.length} {search ? "encontrado" + (filtered.length !== 1 ? "s" : "") : "ativos"} no portfólio
            </p>
            <div className="flex items-center gap-4 mt-4 bg-gray-50/80 p-3 rounded-[14px]">
              <div>
                <p style={{ color: akad.textTertiary, fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>Carteira</p>
                <p style={{ color: akad.text, fontSize: "15px", fontWeight: 700, letterSpacing: "-0.3px", marginTop: "1px" }}>R$ 51.0K</p>
              </div>
              <div style={{ width: "1px", height: "24px", background: akad.border }} />
              <div>
                <p style={{ color: akad.textTertiary, fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>Premium</p>
                <p style={{ color: akad.pink, fontSize: "15px", fontWeight: 700, marginTop: "1px" }}>2</p>
              </div>
              <div style={{ width: "1px", height: "24px", background: akad.border }} />
              <div>
                <p style={{ color: akad.textTertiary, fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>Empresarial</p>
                <p style={{ color: akad.blueLight, fontSize: "15px", fontWeight: 700, marginTop: "1px" }}>1</p>
              </div>
            </div>
          </div>
          <button
            onClick={onAddClient}
            className="w-12 h-12 rounded-[16px] flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
            style={{ background: akad.gradientAccent, boxShadow: "0 8px 16px rgba(230,0,126,0.25)" }}
            aria-label="Adicionar novo cliente"
          >
            <Plus size={22} color="#fff" strokeWidth={2.5} />
          </button>
        </div>
      </header>

      <div className="px-5 pt-4 pb-2 z-0 relative">
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-[16px] shadow-sm border border-gray-100"
          style={{ background: "#fff" }}>
          <Search size={18} color={akad.textTertiary} aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar por nome ou cidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-[#A09CB8]"
            style={{ color: akad.text, fontSize: "14px", fontWeight: 500, lineHeight: 1.4 }}
            aria-label="Buscar clientes"
          />
          {search && (
            <button onClick={() => setSearch("")} className="cursor-pointer bg-gray-100 p-1 rounded-full" aria-label="Limpar busca">
              <X size={14} color={akad.text} />
            </button>
          )}
        </div>
      </div>

      <main className="flex-1 px-5 pb-4 overflow-y-auto" style={{ scrollbarWidth: "none" }} role="list" aria-label="Lista de clientes">
        {!search && (
          <p className="px-1" style={{ fontSize: "11px", fontWeight: 600, color: akad.textTertiary, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", marginTop: "4px" }}>
            Recentes
          </p>
        )}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-[20px] border border-gray-100 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                <Search size={24} color={akad.textTertiary} />
              </div>
              <p style={{ fontSize: "15px", color: akad.text, fontWeight: 600 }}>Nenhum cliente encontrado</p>
              <p style={{ fontSize: "13px", color: akad.textTertiary, marginTop: "4px" }}>Tente ajustar a busca</p>
            </div>
          )}
          {filtered.map((client, i) => (
            <motion.button
              key={client.id}
              onClick={() => onSelectClient(client.id)}
              className="flex items-center gap-4 p-4 rounded-[20px] w-full text-left cursor-pointer transition-shadow hover:shadow-md"
              style={{ background: "#fff", border: `1px solid ${akad.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              role="listitem"
              aria-label={`${client.name} — ${client.policies} apólice${client.policies > 1 ? "s" : ""} — ${client.city}`}
            >
              {client.avatar ? (
                <div className="w-14 h-14 rounded-[16px] overflow-hidden shrink-0 shadow-sm border border-gray-100">
                  <ImageWithFallback src={client.avatar} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-14 h-14 shrink-0 shadow-sm border border-gray-100 rounded-[16px]">
                  <AvatarInitials name={client.name} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="truncate" style={{ fontSize: "16px", fontWeight: 600, color: akad.text }}>{client.name}</p>
                </div>
                <p className="truncate" style={{ fontSize: "13px", color: akad.textTertiary, fontWeight: 500 }}>
                  {client.policies} apólice{client.policies > 1 ? "s" : ""} · {client.totalValue}/ano
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="truncate" style={{ fontSize: "11px", color: akad.textSecondary, fontWeight: 500 }}>
                    📍 {client.city}
                  </p>
                  {client.tag && (
                    <span className="px-2 py-0.5 rounded-[6px] shrink-0"
                      style={{ background: client.tag === "Premium" ? `${akad.pink}15` : `${akad.blue}15`, color: client.tag === "Premium" ? akad.pink : akad.blueLight, fontSize: "9px", fontWeight: 700, letterSpacing: "0.5px" }}>
                      {client.tag.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                <ChevronRight size={18} color={akad.textSecondary} aria-hidden="true" />
              </div>
            </motion.button>
          ))}
        </div>
        <div className="h-6" />
      </main>

      <TabBar active={activeTab} onNavigate={onNavigate} />
    </div>
  );
}
