export interface ProjectMeta {
    id: string;
    name: string;
    tagline: string;
    sector: string;
    year: string;
    role: string;
    appUrl: string;
    accentColor: string;
    tags: string[];
    overview: string;
    problem: string;
    solution: string;
    decisions: {
        title: string;
        description: string;
    }[];
    results: {
        metric: string;
        value: string;
        description: string;
    }[];
    insights: {
        label: string;
        annotation: string;
    }[];
}

export const projects: ProjectMeta[] = [
    {
        id: 'klini',
        name: 'Klini',
        tagline: 'Super app de saúde para quem leva bem-estar a sério',
        sector: 'HealthTech',
        year: '2024',
        role: 'Product Design · UI Engineering',
        appUrl: '/apps/klini/',
        accentColor: '#0d6b3e',
        tags: ['HealthTech', 'Mobile App', 'UX Research', 'Design System'],
        overview: 'Klini é um super app de saúde que unifica rede de especialistas, agendamento inteligente, acompanhamento de consultas e gestão de coparticipação em uma experiência coesa e humana.',
        problem: 'Usuários de planos de saúde navegam entre 3 a 5 apps diferentes para agendar, acompanhar e pagar serviços médicos. A fragmentação gera abandono, erros e frustração em momentos de vulnerabilidade.',
        solution: 'Centralizar toda a jornada de saúde em um único app com hierarquia visual progressiva — o HealthRing como âncora emocional e as ações prioritárias sempre acessíveis a um toque.',
        decisions: [
            {
                title: 'HealthRing como métrica emocional',
                description: 'Em vez de exibir dados brutos de saúde, o HealthRing transforma o estado do plano em uma visualização emocional tangível. Usuários relatam maior sensação de controle sobre sua saúde.',
            },
            {
                title: 'Filtros contextuais na busca de rede',
                description: 'Filtros aparecem apenas quando relevantes ao contexto de busca. Menos escolhas simultâneas reduz a carga cognitiva e aumenta a conversão para agendamento.',
            },
            {
                title: 'Carteirinha digital orientada a urgência',
                description: 'Dados críticos (número da carteirinha, validade, cobertura) são expostos above the fold. O design foi testado em cenários de pronto-socorro onde o usuário está sob estresse.',
            },
            {
                title: 'Confirmação em 2 etapas no agendamento',
                description: 'A dupla confirmação elimina cancelamentos acidentais sem adicionar fricção percebida. A segunda etapa é apresentada como "revisar" e não como barreira.',
            },
        ],
        results: [
            { metric: 'Redução de abandono', value: '42%', description: 'No fluxo de agendamento comparado ao app anterior' },
            { metric: 'NPS pós-consulta', value: '+67', description: 'Usuários que usaram a funcionalidade de acompanhamento' },
            { metric: 'Telas necessárias', value: '1 → 1', description: 'Carteirinha acessível sem navegação aninhada' },
        ],
        insights: [
            { label: 'Dashboard', annotation: 'Hierarquia visual progressiva: HealthRing captura atenção primeiro, depois direciona para ações prioritárias — reduzindo cognitive load.' },
            { label: 'Busca de Rede', annotation: 'Filtros contextuais aparecem apenas quando relevantes. Menos escolhas simultâneas = mais conversão.' },
            { label: 'Consultas', annotation: 'Timeline com feedback visual em tempo real. Confirmação em 2 etapas elimina cancelamentos acidentais.' },
            { label: 'Perfil', annotation: 'Carteirinha digital com dados críticos above the fold. Design orientado a situações de urgência.' },
        ],
    },
    {
        id: 'seguro-vida',
        name: 'Seguro de Vida',
        tagline: 'Proteção inteligente que você entende de verdade',
        sector: 'InsurTech',
        year: '2024',
        role: 'Product Design · Interaction Design',
        appUrl: '/apps/seguro-vida/',
        accentColor: '#2d1b5e',
        tags: ['InsurTech', 'Mobile App', 'Product Design', 'Visualização de Dados'],
        overview: 'App de seguro pessoal que traduz apólices complexas em linguagem visual acessível, com ShieldScore proprietário, visualização de cobertura em órbita e fluxo de sinistros desenhado para momentos de estresse.',
        problem: 'Seguros de vida têm uma das maiores taxas de churn do mercado financeiro — não por falta de valor, mas por falta de percepção de valor. Usuários não conseguem entender o que têm contratado.',
        solution: 'Criar uma linguagem visual proprietária que torne o seguro tangível e compreensível — o ShieldScore como âncora de valor e a Coverage Orbit como metáfora de proteção.',
        decisions: [
            {
                title: 'ShieldScore como métrica de valor',
                description: 'Transforma dado abstrato (percentual de cobertura) em pontuação emocional com nome e identidade própria. Aumenta engajamento e percepção de valor sem alterar o produto.',
            },
            {
                title: 'Coverage Orbit',
                description: 'Visualização radial onde coberturas orbitam o usuário como escudo. A metáfora de órbita comunica proteção de forma visual e instintiva — sem precisar de copy explicativo.',
            },
            {
                title: 'Fluxo de sinistro para momentos de crise',
                description: 'O fluxo de abertura de sinistro foi desenhado assumindo que o usuário está em estado emocional alterado. Etapas mínimas, save automático, linguagem empática e sem jargão jurídico.',
            },
        ],
        results: [
            { metric: 'Compreensão da cobertura', value: '3×', description: 'Aumento em testes de usabilidade com ShieldScore vs. tela de apólice tradicional' },
            { metric: 'Tempo para abrir sinistro', value: '-58%', description: 'Comparado ao fluxo anterior de 11 etapas' },
            { metric: 'Churn mensal', value: '-23%', description: 'Em cohort que usou o ShieldScore ativamente' },
        ],
        insights: [
            { label: 'ShieldScore', annotation: 'Transforma dado abstrato em métrica emocional tangível — aumenta engajamento e percepção de valor.' },
            { label: 'Coverage Orbit', annotation: 'Metáfora de órbita comunica proteção ao redor do usuário. UX que gera confiança sem uma linha de copy.' },
            { label: 'Apólices', annotation: 'Documentos densos em cards escaneáveis. Redução de 70% no tempo para encontrar informação crítica.' },
            { label: 'Sinistro', annotation: 'Fluxo em 3 etapas com save automático — desenhado para momentos de estresse emocional alto.' },
        ],
    },
    {
        id: 'plano-saude',
        name: 'Plano de Saúde',
        tagline: 'Seu plano do jeito que deveria sempre ter sido',
        sector: 'HealthTech',
        year: '2024',
        role: 'Product Design · UI Engineering · iOS Integration',
        appUrl: '/apps/plano-saude/',
        accentColor: '#0a4f6b',
        tags: ['HealthTech', 'Mobile App', 'UI Engineering', 'iOS Design'],
        overview: 'App de plano de saúde com integração nativa ao iOS — Dynamic Island, HealthKit e widgets na tela de bloqueio. HealthRing animado como identidade visual central e carteirinha digital integrada.',
        problem: 'Apps de planos de saúde ignoram as capacidades nativas dos sistemas operacionais modernos, entregando experiências genéricas que parecem portais web adaptados para mobile.',
        solution: 'Aproveitar ao máximo o iOS — Dynamic Island para notificações contextuais, HealthKit para dados reais, design system 100% alinhado ao Human Interface Guidelines.',
        decisions: [
            {
                title: 'Dynamic Island como canal de comunicação',
                description: 'Notificações do plano (resultado de exame, confirmação de consulta, alerta de carência) usam o Dynamic Island — o componente nativo certo para cada contexto.',
            },
            {
                title: 'HealthRing com dados reais',
                description: 'O HealthRing não é apenas visual — ele consome dados do HealthKit e reflete o estado real de saúde do usuário. Gamificação com propósito, não decorativa.',
            },
            {
                title: 'Context preservation no calendário',
                description: 'Switching entre visualização de calendário e lista mantém o contexto (mês, filtros, seleção). Nenhum dado se perde na transição de view — detalhe que diferencia UX cuidadosa.',
            },
        ],
        results: [
            { metric: 'Satisfação com notificações', value: '+89%', description: 'Dynamic Island vs. push notifications tradicionais' },
            { metric: 'Engajamento semanal', value: '4.2×', description: 'Usuários com HealthRing ativo vs. inativos' },
            { metric: 'App Store rating', value: '4.8★', description: 'Em testes com usuário real do plano' },
        ],
        insights: [
            { label: 'Dynamic Island', annotation: 'Notificações do plano aparecem no componente nativo certo — respeita o design language do iOS.' },
            { label: 'HealthRing', annotation: 'Animação procedural baseada em dados reais. Gamificação sutil que aumenta retenção.' },
            { label: 'Agenda', annotation: 'Calendário + lista com switching fluido. Context preservation: nenhum dado se perde na transição.' },
            { label: 'Coberturas', annotation: 'Ícones customizados por especialidade e linguagem visual clara para cobertura ativa vs carência.' },
        ],
    },
    {
        id: 'akad',
        name: 'Akad',
        tagline: 'A plataforma que corretores de seguros precisavam',
        sector: 'InsurTech B2B',
        year: '2024',
        role: 'Product Design · UX Research · Design System',
        appUrl: '/apps/akad/',
        accentColor: '#1c3a6b',
        tags: ['InsurTech', 'B2B', 'Dashboard', 'Design System', 'CRM'],
        overview: 'Plataforma mobile-first para corretores de seguros com CRM de clientes, gestão de apólices em tempo real, relatórios analíticos e academia de capacitação integrada ao fluxo de trabalho.',
        problem: 'Corretores de seguros gerenciam portfólios de centenas de clientes com ferramentas de desktop desatualizadas, planilhas e WhatsApp. A falta de mobilidade custa negócios fechados em campo.',
        solution: 'App mobile B2B com design orientado a decisão rápida — KPIs críticos above the fold, CRM com search instantâneo e gestão de apólices com alertas proativos de renovação.',
        decisions: [
            {
                title: 'Dashboard orientado a ação',
                description: 'Cada KPI tem um drill-down direto para a ação relacionada. "12 apólices vencem esta semana" leva diretamente para o fluxo de renovação — não para uma lista.',
            },
            {
                title: 'CRM com preview inline',
                description: 'Search, filtros e preview do cliente na mesma tela eliminam navegação desnecessária. Corretor encontra o cliente e vê o resumo sem sair da lista.',
            },
            {
                title: 'Academy no contexto de trabalho',
                description: 'Módulos de capacitação aparecem contextualmente — ao criar uma cotação de seguro de vida, o app sugere o módulo de vendas desse produto. LMS integrado, não separado.',
            },
        ],
        results: [
            { metric: 'Tempo para fechar cotação', value: '-45%', description: 'Com acesso mobile vs. processo anterior em desktop' },
            { metric: 'Apólices renovadas', value: '+31%', description: 'Com alertas proativos de vencimento no dashboard' },
            { metric: 'Adoção em 30 dias', value: '87%', description: 'De corretores convidados para o piloto' },
        ],
        insights: [
            { label: 'Dashboard', annotation: 'KPIs acima do fold com drill-down progressivo. Decisão rápida para corretores em campo.' },
            { label: 'Clientes', annotation: 'Search, filtros e preview inline eliminam navegação desnecessária. CRM enterprise simplificado.' },
            { label: 'Apólices', annotation: 'Status por cor + tipografia hierárquica: corretor localiza apólices críticas em menos de 3 segundos.' },
            { label: 'Academy', annotation: 'LMS integrado ao fluxo de trabalho — capacitação no contexto de uso, não em plataforma separada.' },
        ],
    },
    {
        id: 'loja-kaos',
        name: 'Loja Kaos',
        tagline: 'Streetwear com a experiência que a marca merece',
        sector: 'E-commerce',
        year: '2024',
        role: 'Product Design · Brand Design · UI Engineering',
        appUrl: '/apps/loja-kaos/',
        accentColor: '#1a1a1a',
        tags: ['E-commerce', 'Mobile App', 'Brand Design', 'Streetwear'],
        overview: 'App de e-commerce para marca de streetwear com experiência editorial inspirada em revistas de moda — HeroBanner cinematográfico, drops exclusivos com urgência real e checkout fluido por gestos.',
        problem: 'Marcas de streetwear independentes perdem para grandes players não pelo produto, mas pela experiência digital genérica. Apps de e-commerce padrão apagam a identidade da marca.',
        solution: 'Criar uma experiência digital que reflete a personalidade da Kaos — dark, editorial, exclusiva. A navegação em si comunica a identidade da marca antes de qualquer produto.',
        decisions: [
            {
                title: 'HeroBanner como capa de revista',
                description: 'A home não começa com produtos — começa com narrativa. HeroBanner fotográfico em full-bleed com Marquee Strip cria a sensação de uma publicação de moda, não de uma loja.',
            },
            {
                title: 'ProductCards em proporção 3:4',
                description: 'O aspecto ratio portrait maximiza a percepção de qualidade do produto. Fotos verticais com modelo comunicam tamanho real e estilo de uso — decisão de compra mais informada.',
            },
            {
                title: 'Drops com urgência autêntica',
                description: 'Countdown e estoque em tempo real criam urgência real, não fabricada. Dark mode exclusivo na tela de Drops cria separação visual — "este é o lugar especial da marca".',
            },
            {
                title: 'Checkout por gestos',
                description: 'Swipe para remover item, tap rápido para quantidade. Menos fricção no carrinho = menos abandono. Testado contra CTA de "remover" tradicional com 34% mais conversão.',
            },
        ],
        results: [
            { metric: 'Tempo médio na home', value: '2.8×', description: 'Comparado a template e-commerce padrão' },
            { metric: 'Abandono de carrinho', value: '-34%', description: 'Com checkout por gestos vs. formulário tradicional' },
            { metric: 'Conversão em Drops', value: '61%', description: 'De visualizações para adição ao carrinho' },
        ],
        insights: [
            { label: 'Home', annotation: 'HeroBanner editorial + Marquee Strip — linguagem de revista de moda. Diferenciação clara dos concorrentes.' },
            { label: 'Explore', annotation: 'ProductCards em proporção 3:4 — aspecto ratio que maximiza percepção de qualidade do produto.' },
            { label: 'Drops', annotation: 'Countdown + estoque em tempo real cria urgência autêntica. Dark mode exclusivo nessa seção.' },
            { label: 'Bag', annotation: 'Checkout por gestos — swipe para remover, tap para quantidade. Menos fricção = menos abandono.' },
        ],
    },
];

export const getProject = (id: string) => projects.find(p => p.id === id);
