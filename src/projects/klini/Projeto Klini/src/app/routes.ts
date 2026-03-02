import { createBrowserRouter } from "react-router";
import { MobileShell } from "./components/MobileShell";
import { HomeDashboard } from "./components/HomeDashboard";
import { NetworkSearch } from "./components/NetworkSearch";
import { AppointmentsHub } from "./components/AppointmentsHub";
import { WaitingPeriods } from "./components/WaitingPeriods";
import { Support } from "./components/Support";
import { Tokens } from "./components/Tokens";
import { Requests } from "./components/Requests";
import { CoParticipation } from "./components/CoParticipation";
import { Usage } from "./components/Usage";
import { Profile } from "./components/Profile";
import { Notifications } from "./components/Notifications";
import { DigitalCard } from "./components/DigitalCard";
import { Privacy } from "./components/Privacy";
import { NotificationSettings } from "./components/NotificationSettings";
import { Language } from "./components/Language";
import { Appearance } from "./components/Appearance";
import { Documents } from "./components/Documents";
import { BiometricData } from "./components/BiometricData";
import { Terms } from "./components/Terms";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MobileShell,
    children: [
      { index: true, Component: HomeDashboard },
      { path: "search", Component: NetworkSearch },
      { path: "appointments", Component: AppointmentsHub },
      { path: "waiting-periods", Component: WaitingPeriods },
      { path: "support", Component: Support },
      { path: "tokens", Component: Tokens },
      { path: "requests", Component: Requests },
      { path: "co-participation", Component: CoParticipation },
      { path: "usage", Component: Usage },
      { path: "profile", Component: Profile },
      { path: "notifications", Component: Notifications },
      { path: "card", Component: DigitalCard },
      { path: "privacy", Component: Privacy },
      { path: "notification-settings", Component: NotificationSettings },
      { path: "language", Component: Language },
      { path: "appearance", Component: Appearance },
      { path: "documents", Component: Documents },
      { path: "biometric", Component: BiometricData },
      { path: "terms", Component: Terms },
    ],
  },
], { basename: '/apps/klini' });
