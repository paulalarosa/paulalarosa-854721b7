import { motion } from "motion/react";
import { PageHeader } from "./PageHeader";
import { FileText, Download, ExternalLink, Calendar, FileCheck, BookOpen } from "lucide-react";

const documents = [
  {
    id: 1,
    title: "Contrato do Plano",
    description: "Contrato vigente do seu plano de saúde",
    type: "PDF",
    size: "2.4 MB",
    date: "01 Jan 2026",
    icon: FileText,
  },
  {
    id: 2,
    title: "Manual do Beneficiário",
    description: "Guia completo de utilização do plano",
    type: "PDF",
    size: "5.1 MB",
    date: "01 Jan 2026",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Tabela de Procedimentos",
    description: "Lista de procedimentos cobertos e coparticipação",
    type: "PDF",
    size: "1.8 MB",
    date: "01 Jan 2026",
    icon: FileCheck,
  },
  {
    id: 4,
    title: "Rede Credenciada",
    description: "Lista completa de médicos e clínicas",
    type: "PDF",
    size: "3.2 MB",
    date: "15 Fev 2026",
    icon: FileText,
  },
  {
    id: 5,
    title: "Carta de Portabilidade",
    description: "Documento para portabilidade de carências",
    type: "PDF",
    size: "0.8 MB",
    date: "01 Jan 2026",
    icon: FileCheck,
  },
  {
    id: 6,
    title: "Declaração de Saúde",
    description: "Declaração preenchida na adesão",
    type: "PDF",
    size: "0.5 MB",
    date: "01 Jan 2026",
    icon: FileText,
  },
];

export function Documents() {
  return (
    <div className="pb-4">
      <PageHeader title="Documentos do Plano" backTo="/profile" />

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
            <FileText size={22} className="text-[#2D9F93]" />
          </div>
          <div>
            <p className="text-[15px] text-[#1a1a2e] tracking-[-0.01em]">{documents.length} documentos</p>
            <p className="text-[12px] text-[#9a9aaa]">Todos atualizados</p>
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="px-5 pt-3 flex flex-col gap-2.5" role="list" aria-label="Lista de documentos">
        {documents.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-[20px] p-4"
            style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
            role="listitem"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-[14px] bg-[#FAFBFC] flex items-center justify-center shrink-0">
                <doc.icon size={17} className="text-[#7a7a8a]" strokeWidth={1.7} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] text-[#1a1a2e] tracking-[-0.01em]">{doc.title}</h4>
                <p className="text-[11px] text-[#9a9aaa] mt-0.5">{doc.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#F5F6F8] text-[#7a7a8a]">
                    {doc.type}
                  </span>
                  <span className="text-[10px] text-[#B0B4BC]">{doc.size}</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={10} className="text-[#C0C4CC]" />
                    <span className="text-[10px] text-[#B0B4BC]">{doc.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-xl bg-[#FAFBFC] flex items-center justify-center cursor-pointer hover:bg-[#2D9F93]/[0.08] transition-colors"
                  aria-label={`Ver ${doc.title}`}
                >
                  <ExternalLink size={14} className="text-[#7a7a8a]" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-xl bg-[#FAFBFC] flex items-center justify-center cursor-pointer hover:bg-[#2D9F93]/[0.08] transition-colors"
                  aria-label={`Baixar ${doc.title}`}
                >
                  <Download size={14} className="text-[#7a7a8a]" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
