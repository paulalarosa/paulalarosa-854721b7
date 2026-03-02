import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomeScreen } from "./components/screens/HomeScreen";
import { AgendaScreen } from "./components/screens/AgendaScreen";
import { CoberturasScreen } from "./components/screens/CoberturasScreen";
import { PerfilScreen } from "./components/screens/PerfilScreen";
import { TelemedicineScreen } from "./components/screens/TelemedicineScreen";
import { FindDoctorScreen } from "./components/screens/FindDoctorScreen";
import { ExamesScreen } from "./components/screens/ExamesScreen";
import { SOSScreen } from "./components/screens/SOSScreen";
import { ReceitasScreen } from "./components/screens/ReceitasScreen";
import { DicasScreen } from "./components/screens/DicasScreen";
import { GuiasScreen } from "./components/screens/GuiasScreen";
import { AgendarScreen } from "./components/screens/AgendarScreen";
import { DadosPessoaisScreen } from "./components/screens/DadosPessoaisScreen";
import { DependentesScreen } from "./components/screens/DependentesScreen";
import { CartaoVirtualScreen } from "./components/screens/CartaoVirtualScreen";
import { DocumentosScreen } from "./components/screens/DocumentosScreen";
import { NotificacoesScreen } from "./components/screens/NotificacoesScreen";
import { PrivacidadeScreen } from "./components/screens/PrivacidadeScreen";
import { AjudaScreen } from "./components/screens/AjudaScreen";
import { ChatScreen } from "./components/screens/ChatScreen";
import { BeneficiosScreen } from "./components/screens/BeneficiosScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomeScreen },
      { path: "agenda", Component: AgendaScreen },
      { path: "coberturas", Component: CoberturasScreen },
      { path: "perfil", Component: PerfilScreen },
      { path: "telemedicina", Component: TelemedicineScreen },
      { path: "encontrar-medico", Component: FindDoctorScreen },
      { path: "exames", Component: ExamesScreen },
      { path: "sos", Component: SOSScreen },
      { path: "receitas", Component: ReceitasScreen },
      { path: "dicas", Component: DicasScreen },
      { path: "guias", Component: GuiasScreen },
      { path: "agendar", Component: AgendarScreen },
      { path: "beneficios", Component: BeneficiosScreen },
      { path: "perfil/dados", Component: DadosPessoaisScreen },
      { path: "perfil/dependentes", Component: DependentesScreen },
      { path: "perfil/cartao", Component: CartaoVirtualScreen },
      { path: "perfil/documentos", Component: DocumentosScreen },
      { path: "perfil/notificacoes", Component: NotificacoesScreen },
      { path: "perfil/privacidade", Component: PrivacidadeScreen },
      { path: "perfil/ajuda", Component: AjudaScreen },
      { path: "perfil/chat", Component: ChatScreen },
      { path: "*", Component: HomeScreen },
    ],
  },
]);
