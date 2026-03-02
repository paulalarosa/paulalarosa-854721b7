import { useState } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  FileCheck,
  FileText,
  Download,
  Share2,
  Search,
  Eye,
  Calendar,
  Shield,
} from "lucide-react";
import { hapticLight, hapticTick } from "../haptics";

interface DocumentosScreenProps {
  onBack: () => void;
}

interface Document {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
  category: "apolice" | "fatura" | "contrato" | "sinistro";
  color: string;
}

const docs: Document[] = [
  { id: "1", title: "Apolice Auto - HB20", type: "PDF", date: "15 Jan 2025", size: "2.4 MB", category: "apolice", color: "#0D9488" },
  { id: "2", title: "Apolice Vida - Premium", type: "PDF", date: "01 Mar 2025", size: "1.8 MB", category: "apolice", color: "#6366F1" },
  { id: "3", title: "Apolice Auto - Civic", type: "PDF", date: "10 Jun 2025", size: "2.1 MB", category: "apolice", color: "#0D9488" },
  { id: "4", title: "Fatura Mar 2026 - Auto", type: "PDF", date: "01 Mar 2026", size: "340 KB", category: "fatura", color: "#D97706" },
  { id: "5", title: "Fatura Fev 2026 - Auto", type: "PDF", date: "01 Fev 2026", size: "320 KB", category: "fatura", color: "#D97706" },
  { id: "6", title: "Contrato de Servico", type: "PDF", date: "15 Jan 2025", size: "890 KB", category: "contrato", color: "#0F172A" },
  { id: "7", title: "Laudo Sinistro - Nov 2025", type: "PDF", date: "20 Nov 2025", size: "4.2 MB", category: "sinistro", color: "#DC2626" },
];

const categories = [
  { key: "all", label: "Todos" },
  { key: "apolice", label: "Apolices" },
  { key: "fatura", label: "Faturas" },
  { key: "contrato", label: "Contratos" },
  { key: "sinistro", label: "Sinistros" },
];

export function DocumentosScreen({ onBack }: DocumentosScreenProps) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = docs.filter(d => {
    const matchCategory = filter === "all" || d.category === filter;
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <div className="px-5 sm:px-6">
        <div className="flex items-center gap-3 pt-2 pb-5">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => { hapticLight(); onBack(); }}
            className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100/60 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#0D9488]"
            aria-label="Voltar"
          >
            <ChevronLeft size={16} className="text-[#0F172A]" strokeWidth={1.8} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-[20px] text-[#0F172A] tracking-tight">Documentos</h1>
            <p className="text-[11px] text-gray-400">{docs.length} arquivos</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#0F172A]/5 flex items-center justify-center">
            <FileCheck size={17} className="text-[#0F172A]" strokeWidth={1.6} />
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white border border-gray-100/60 mb-4">
          <Search size={15} className="text-gray-300" strokeWidth={1.5} />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); hapticTick(); }}
            placeholder="Buscar documento..."
            className="flex-1 text-[12px] text-[#0F172A] placeholder:text-gray-300 bg-transparent outline-none"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => { hapticTick(); setFilter(c.key); }}
              className={`px-3 py-1.5 rounded-lg text-[10px] tracking-wide whitespace-nowrap transition-all ${
                filter === c.key
                  ? "bg-[#0F172A] text-white"
                  : "bg-white text-gray-500 border border-gray-100/60"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { icon: Shield, label: "Apolices", count: "3", color: "#0D9488" },
            { icon: Calendar, label: "Faturas", count: "2", color: "#D97706" },
            { icon: FileText, label: "Outros", count: "2", color: "#0F172A" },
          ].map(s => (
            <div key={s.label} className="rounded-xl bg-white border border-gray-100/60 p-3 text-center">
              <s.icon size={14} style={{ color: s.color }} strokeWidth={1.5} className="mx-auto mb-1" />
              <p className="text-[14px] text-[#0F172A]">{s.count}</p>
              <p className="text-[8px] text-gray-400 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Document list */}
        <div className="space-y-2">
          {filtered.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-gray-100/60"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${doc.color}08` }}
                >
                  <FileText size={15} style={{ color: doc.color }} strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] text-[#0F172A] tracking-tight truncate">{doc.title}</p>
                  <p className="text-[9px] text-gray-300">{doc.date} · {doc.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => hapticTick()}
                  className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center"
                  aria-label="Visualizar"
                >
                  <Eye size={13} className="text-gray-400" strokeWidth={1.5} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => hapticTick()}
                  className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center"
                  aria-label="Baixar"
                >
                  <Download size={13} className="text-gray-400" strokeWidth={1.5} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10">
            <Search size={20} className="text-gray-200 mx-auto mb-2" />
            <p className="text-[12px] text-gray-400">Nenhum documento encontrado</p>
          </div>
        )}
      </div>
      <div className="h-8" />
    </div>
  );
}
