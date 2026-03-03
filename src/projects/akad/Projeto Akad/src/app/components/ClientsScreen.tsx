import React from "react";
import { Search, Plus, ChevronRight, X } from "lucide-react";
import { akad } from "./akad-theme";
import { PhoneFrame } from "./PhoneFrame";
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
    <PhoneFrame>
      <header className="px-5 pt-2 pb-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ color: akad.text, fontSize: "26px", fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.2 }}>
              Clientes
            </h1>
            <p style={{ color: akad.textTertiary, fontSize: "12px", marginTop: "2px" }}>
              {filtered.length} {search ? "encontrado" + (filtered.length !== 1 ? "s" : "") : "ativos"}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div>
                <p style={{ color: akad.textTertiary, fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase" }}>Carteira</p>
                <p style={{ color: akad.text, fontSize: "13px", fontWeight: 700, letterSpacing: "-0.3px" }}>R$ 51.0K</p>
              </div>
              <div style={{ width: "1px", height: "24px", background: akad.border }} />
              <div>
                <p style={{ color: akad.textTertiary, fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase" }}>Premium</p>
                <p style={{ color: akad.pink, fontSize: "13px", fontWeight: 700 }}>2</p>
              </div>
              <div style={{ width: "1px", height: "24px", background: akad.border }} />
              <div>
                <p style={{ color: akad.textTertiary, fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase" }}>Empresarial</p>
                <p style={{ color: akad.blueLight, fontSize: "13px", fontWeight: 700 }}>1</p>
              </div>
            </div>
          </div>
          <button
            onClick={onAddClient}
            className="w-9 h-9 rounded-[12px] flex items-center justify-center cursor-pointer"
            style={{ background: akad.gradientAccent, boxShadow: "0 4px 12px rgba(230,0,126,0.2)" }}
            aria-label="Adicionar novo cliente"
          >
            <Plus size={18} color="#fff" />
          </button>
        </div>
      </header>

      <div className="px-4 pt-2 pb-2">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl"
          style={{ background: akad.surface }}>
          <Search size={16} color={akad.textTertiary} aria-hidden="true" />
          <input
            type="search"
            placeholder="Nome ou cidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-[#A09CB8]"
            style={{ color: akad.text, fontSize: "13px", fontWeight: 500, lineHeight: 1.4 }}
            aria-label="Buscar clientes"
          />
          {search && (
            <button onClick={() => setSearch("")} className="cursor-pointer" aria-label="Limpar busca">
              <X size={15} color={akad.textTertiary} />
            </button>
          )}
        </div>
      </div>

      <main className="flex-1 px-4 pb-1 overflow-y-auto" style={{ scrollbarWidth: "none" }} role="list" aria-label="Lista de clientes">
        {!search && (
          <p className="px-1" style={{ fontSize: "10px", fontWeight: 600, color: akad.textTertiary, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
            Recentes
          </p>
        )}
        <div className="flex flex-col gap-1.5">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10">
              <Search size={28} color={akad.textTertiary} />
              <p style={{ fontSize: "13px", color: akad.textTertiary, marginTop: "8px", fontWeight: 500 }}>Nenhum cliente encontrado</p>
            </div>
          )}
          {filtered.map((client, i) => (
            <motion.button
              key={client.id}
              onClick={() => onSelectClient(client.id)}
              className="flex items-center gap-3 p-3 rounded-[16px] w-full text-left cursor-pointer"
              style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12, delay: i * 0.025 }}
              role="listitem"
              aria-label={`${client.name} — ${client.policies} apólice${client.policies > 1 ? "s" : ""} — ${client.city}`}
            >
              {client.avatar ? (
                <div className="w-11 h-11 rounded-[14px] overflow-hidden shrink-0">
                  <ImageWithFallback src={client.avatar} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <AvatarInitials name={client.name} />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate" style={{ fontSize: "14px", fontWeight: 600, color: akad.text }}>{client.name}</p>
                  {client.tag && (
                    <span className="px-1.5 py-0.5 rounded shrink-0"
                      style={{ background: client.tag === "Premium" ? `${akad.pink}10` : `${akad.blue}10`, color: client.tag === "Premium" ? akad.pink : akad.blueLight, fontSize: "8px", fontWeight: 700, letterSpacing: "0.5px" }}>
                      {client.tag.toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="truncate" style={{ fontSize: "11px", color: akad.textTertiary, marginTop: "1px" }}>
                  {client.policies} apólice{client.policies > 1 ? "s" : ""} · {client.totalValue}/ano · {client.city}
                </p>
              </div>
              <ChevronRight size={15} color={akad.textTertiary} aria-hidden="true" />
            </motion.button>
          ))}
        </div>
        <div className="h-1" />
      </main>

      <TabBar active={activeTab} onNavigate={onNavigate} />
    </PhoneFrame>
  );
}
