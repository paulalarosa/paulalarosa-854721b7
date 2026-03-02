import { useState } from "react";
import { motion } from "motion/react";
import type { ScreenType } from "../data";

interface InfoScreenProps {
  type: ScreenType;
}

const screenData: Record<string, { title: string; subtitle: string; content: { heading: string; body: string }[] }> = {
  addresses: {
    title: "ENDERECOS",
    subtitle: "Gerencie seus enderecos de entrega",
    content: [
      {
        heading: "CASA",
        body: "Rua das Acacias, 420\nAp 12B - Vila Madalena\nSao Paulo, SP - 05443-010",
      },
    ],
  },
  payment: {
    title: "PAGAMENTO",
    subtitle: "Metodos de pagamento salvos",
    content: [
      {
        heading: "CARTAO PRINCIPAL",
        body: "Visa **** **** **** 4832\nValidade: 08/28\nTitular: VISITANTE VRTX",
      },
    ],
  },
  notifications: {
    title: "NOTIFICACOES",
    subtitle: "Gerencie suas preferencias",
    content: [
      { heading: "DROPS E LANCAMENTOS", body: "Receba alertas quando um novo drop estiver disponivel." },
      { heading: "PEDIDOS E ENTREGAS", body: "Atualizacoes sobre seus pedidos e rastreamento." },
      { heading: "PROMOCOES", body: "Ofertas exclusivas e codigos de desconto." },
    ],
  },
  "sizes-pref": {
    title: "TAMANHOS",
    subtitle: "Seus tamanhos preferidos",
    content: [
      { heading: "ROUPAS SUPERIORES", body: "M" },
      { heading: "ROUPAS INFERIORES", body: "40" },
      { heading: "CALCADOS", body: "42" },
    ],
  },
  help: {
    title: "CENTRAL DE AJUDA",
    subtitle: "Como podemos ajudar?",
    content: [
      { heading: "COMO RASTREAR MEU PEDIDO?", body: "Acesse 'Meus Pedidos' no seu perfil e clique em 'Rastrear'. Voce recebera atualizacoes por e-mail e notificacao push." },
      { heading: "QUAL O PRAZO DE ENTREGA?", body: "Entregas para capitais: 3-5 dias uteis. Demais regioes: 5-10 dias uteis. Frete expresso disponivel para SP, RJ e MG." },
      { heading: "COMO ENTRAR EM CONTATO?", body: "E-mail: suporte@vrtx.com.br\nWhatsApp: (11) 99999-0000\nHorario: Seg-Sex, 9h-18h" },
    ],
  },
  returns: {
    title: "TROCAS",
    subtitle: "Politica de trocas e devolucoes",
    content: [
      { heading: "PRAZO", body: "Voce tem ate 30 dias apos o recebimento para solicitar troca ou devolucao." },
      { heading: "CONDICOES", body: "O produto deve estar sem uso, com etiquetas originais e na embalagem. Produtos de edicao limitada nao sao passiveis de troca." },
      { heading: "COMO SOLICITAR", body: "1. Acesse 'Meus Pedidos'\n2. Selecione o item\n3. Clique em 'Solicitar Troca'\n4. Envie com a etiqueta pre-paga" },
    ],
  },
  terms: {
    title: "TERMOS",
    subtitle: "Termos de uso e privacidade",
    content: [
      { heading: "USO DA PLATAFORMA", body: "Ao acessar e usar o aplicativo VRTX, voce concorda com estes termos. O uso e pessoal e intransferivel." },
      { heading: "PRIVACIDADE", body: "Coletamos apenas dados necessarios para processamento de pedidos. Nao compartilhamos informacoes pessoais com terceiros." },
      { heading: "PROPRIEDADE INTELECTUAL", body: "Todo conteudo, design e marca VRTX sao protegidos por direitos autorais. Reproducao proibida sem autorizacao." },
    ],
  },
};

export function InfoScreen({ type }: InfoScreenProps) {
  const data = screenData[type];
  const [toggles, setToggles] = useState<Record<number, boolean>>(
    type === "notifications" ? { 0: true, 1: true, 2: false } : {}
  );

  if (!data) return null;

  const isToggle = type === "notifications";
  const isSizePref = type === "sizes-pref";

  return (
    <main className="pt-24 pb-32 lg:pb-12 px-5 sm:px-8 max-w-[700px] mx-auto" role="main">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white uppercase mb-1"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(30px, 5vw, 40px)",
          lineHeight: 1,
        }}
      >
        {data.title}
      </motion.h2>
      <p
        className="text-white/25 mb-8"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "11px",
        }}
      >
        {data.subtitle}
      </p>

      <div className="flex flex-col gap-0">
        {data.content.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i }}
            className="py-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3
                  className="text-white/50 uppercase mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                  }}
                >
                  {item.heading}
                </h3>
                {isSizePref ? (
                  <span
                    className="text-white/80"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "28px",
                      lineHeight: 1,
                    }}
                  >
                    {item.body}
                  </span>
                ) : (
                  <p
                    className="text-white/30 whitespace-pre-line"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "12px",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.body}
                  </p>
                )}
              </div>

              {isToggle && (
                <button
                  onClick={() => setToggles((prev) => ({ ...prev, [i]: !prev[i] }))}
                  className="shrink-0 ml-4 mt-1 w-10 h-5 rounded-full cursor-pointer relative transition-colors"
                  style={{
                    background: toggles[i] ? "white" : "rgba(255,255,255,0.08)",
                  }}
                  role="switch"
                  aria-checked={toggles[i]}
                  aria-label={`${item.heading} ${toggles[i] ? "ativado" : "desativado"}`}
                >
                  <motion.div
                    animate={{ x: toggles[i] ? 22 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-3 h-3 rounded-full"
                    style={{
                      background: toggles[i] ? "#080808" : "rgba(255,255,255,0.3)",
                    }}
                  />
                </button>
              )}

              {type === "addresses" && (
                <button
                  className="shrink-0 ml-4 px-3 py-1.5 cursor-pointer"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "8px",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  EDITAR
                </button>
              )}

              {type === "payment" && (
                <div className="shrink-0 ml-4 flex items-center gap-2">
                  <div className="w-8 h-5 rounded-sm bg-white/10 flex items-center justify-center">
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "7px", color: "rgba(255,255,255,0.4)" }}>VISA</span>
                  </div>
                </div>
              )}

              {isSizePref && (
                <button
                  className="shrink-0 ml-4 mt-2 px-3 py-1.5 cursor-pointer"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "8px",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  ALTERAR
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {(type === "addresses" || type === "payment") && (
        <button
          className="mt-6 w-full py-3 cursor-pointer flex items-center justify-center gap-2 transition-colors hover:bg-white/6"
          style={{
            border: "1px dashed rgba(255,255,255,0.08)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 3V11M3 7H11" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round" />
          </svg>
          ADICIONAR {type === "addresses" ? "ENDERECO" : "CARTAO"}
        </button>
      )}
    </main>
  );
}
