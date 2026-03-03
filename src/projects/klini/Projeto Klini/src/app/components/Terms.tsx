import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "./PageHeader";
import { ChevronDown, Scale, FileText, Shield, UserCheck } from "lucide-react";

const sections = [
  {
    id: 1,
    icon: FileText,
    title: "Termos Gerais de Uso",
    content:
      "O presente Termo de Uso regula as condições de utilização do aplicativo Klini, plataforma digital de gestão do plano de saúde. Ao utilizar o aplicativo, o beneficiário declara ter lido e concordado com todas as disposições aqui estabelecidas. O acesso ao app é pessoal e intransferível, sendo responsabilidade do titular manter suas credenciais de acesso em sigilo.",
  },
  {
    id: 2,
    icon: Shield,
    title: "Política de Privacidade",
    content:
      "A Klini se compromete a proteger os dados pessoais de seus beneficiários em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). Os dados coletados são utilizados exclusivamente para a prestação dos serviços do plano de saúde, incluindo agendamento de consultas, gestão de guias e autorizações, e processamento de coparticipação.",
  },
  {
    id: 3,
    icon: UserCheck,
    title: "Consentimento e Dados Sensíveis",
    content:
      "Dados de saúde são considerados dados sensíveis pela LGPD. O tratamento destes dados é realizado mediante consentimento expresso do titular e para finalidades específicas de prestação do serviço de saúde contratado. O beneficiário pode revogar seu consentimento a qualquer momento através das configurações de privacidade do app.",
  },
  {
    id: 4,
    icon: Scale,
    title: "Direitos do Beneficiário",
    content:
      "Conforme a LGPD, o beneficiário tem direito a: acessar seus dados pessoais armazenados; solicitar correção de dados incompletos ou desatualizados; solicitar a exclusão de dados desnecessários; revogar consentimento; solicitar portabilidade dos dados. Para exercer estes direitos, acesse as configurações de privacidade ou entre em contato pelo canal de suporte.",
  },
];

export function Terms() {
  const [openSection, setOpenSection] = useState<number | null>(1);

  return (
    <div className="pb-4">
      <PageHeader title="Termos de Uso" backTo="/profile" />

      {/* Info */}
      <div className="px-4 xs:px-5 pt-1 pb-2">
        <div
          className="bg-white rounded-[20px] p-5 flex items-center gap-4"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8F6F4, #F0FAF9)" }}
          >
            <Scale size={22} className="text-[#2D9F93]" />
          </div>
          <div>
            <p className="text-[15px] text-[#1a1a2e] tracking-[-0.01em]">Informações Legais</p>
            <p className="text-[12px] text-[#9a9aaa]">Última atualização: 01 Jan 2026</p>
          </div>
        </div>
      </div>

      {/* Seções */}
      <div className="px-4 xs:px-5 pt-3 flex flex-col gap-2.5">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            className="bg-white rounded-[20px] overflow-hidden"
            style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
          >
            <button
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              className="w-full p-5 flex items-center gap-3.5 text-left cursor-pointer"
              aria-expanded={openSection === section.id}
            >
              <div className="w-10 h-10 rounded-[14px] bg-[#FAFBFC] flex items-center justify-center shrink-0">
                <section.icon size={17} className="text-[#7a7a8a]" strokeWidth={1.7} />
              </div>
              <span className="text-[13px] text-[#1a1a2e] flex-1">{section.title}</span>
              <motion.div
                animate={{ rotate: openSection === section.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-[#C0C4CC] shrink-0" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 xs:px-5 pb-5 pt-0">
                    <p className="text-[12px] text-[#7a7a8a] leading-[1.7]">{section.content}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Aceite */}
      <div className="px-4 xs:px-5 pt-5">
        <div
          className="bg-[#2D9F93]/[0.05] rounded-[20px] p-5 border border-[#2D9F93]/10"
        >
          <p className="text-[12px] text-[#2D9F93] leading-[1.6]">
            Ao utilizar o aplicativo Klini, você declara que leu e concorda com os Termos de Uso e Política de Privacidade acima descritos. Aceito em 01 de Janeiro de 2026.
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-[10px] text-[#C0C4CC]">Klini Digital Ltda. · CNPJ: 12.345.678/0001-00</p>
      </div>
    </div>
  );
}
