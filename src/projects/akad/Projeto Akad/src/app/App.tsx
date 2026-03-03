import { useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DashboardScreen } from "./components/DashboardScreen";
import { PoliciesScreen } from "./components/PoliciesScreen";
import { ClientsScreen } from "./components/ClientsScreen";
import { ClientProfileScreen } from "./components/ClientProfileScreen";
import { AcademyScreen } from "./components/AcademyScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { NotificationsScreen } from "./components/NotificationsScreen";
import { ReportScreen } from "./components/ReportScreen";
import { NewClientScreen } from "./components/NewClientScreen";
import { SendQuoteScreen } from "./components/SendQuoteScreen";
import { PhoneFrame } from "./components/PhoneFrame";
import { TabId } from "./components/TabBar";

type Screen =
  | { type: "tab"; tab: TabId }
  | { type: "clientProfile"; clientId: string }
  | { type: "notifications" }
  | { type: "report" }
  | { type: "newClient" }
  | { type: "sendQuote"; clientName: string };

const tabOrder: TabId[] = ["dashboard", "policies", "clients", "academy", "settings"];

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: "tab", tab: "dashboard" });
  const prevTabRef = useRef<TabId>("dashboard");

  const currentTab = screen.type === "tab" ? screen.tab :
    screen.type === "clientProfile" || screen.type === "newClient" || screen.type === "sendQuote" ? "clients" : "dashboard";

  const handleNavigate = (tab: TabId) => {
    prevTabRef.current = currentTab;
    setScreen({ type: "tab", tab });
  };

  const handleSelectClient = (_id: string) => {
    setScreen({ type: "clientProfile", clientId: _id });
  };

  const handleBack = (tab: TabId) => {
    setScreen({ type: "tab", tab });
  };

  const handleOpenNotifications = () => setScreen({ type: "notifications" });
  const handleOpenReport = () => setScreen({ type: "report" });
  const handleOpenNewClient = () => setScreen({ type: "newClient" });
  const handleSendQuote = (clientName: string) => setScreen({ type: "sendQuote", clientName });

  const getDirection = (): number => {
    if (screen.type !== "tab") return 1;
    const currentIndex = tabOrder.indexOf(screen.tab);
    const prevIndex = tabOrder.indexOf(prevTabRef.current);
    return currentIndex >= prevIndex ? 1 : -1;
  };

  const screenKey = screen.type === "tab" ? screen.tab : screen.type;
  const direction = getDirection();
  const isSubScreen = screen.type !== "tab";

  const renderScreen = () => {
    switch (screen.type) {
      case "clientProfile":
        return (
          <ClientProfileScreen
            onBack={() => handleBack("clients")}
            onSendQuote={() => handleSendQuote("Ana Carolina Silva")}
          />
        );
      case "notifications":
        return (
          <NotificationsScreen onBack={() => handleBack("dashboard")} />
        );
      case "report":
        return (
          <ReportScreen onBack={() => handleBack("dashboard")} />
        );
      case "newClient":
        return (
          <NewClientScreen onBack={() => handleBack("clients")} />
        );
      case "sendQuote":
        return (
          <SendQuoteScreen clientName={screen.clientName} onBack={() => setScreen({ type: "clientProfile", clientId: "ana" })} />
        );
      case "tab":
        switch (screen.tab) {
          case "dashboard":
            return (
              <DashboardScreen
                activeTab={currentTab}
                onNavigate={handleNavigate}
                onOpenNotifications={handleOpenNotifications}
                onOpenReport={handleOpenReport}
              />
            );
          case "policies":
            return <PoliciesScreen activeTab={currentTab} onNavigate={handleNavigate} />;
          case "clients":
            return (
              <ClientsScreen
                activeTab={currentTab}
                onNavigate={handleNavigate}
                onSelectClient={handleSelectClient}
                onAddClient={handleOpenNewClient}
              />
            );
          case "academy":
            return <AcademyScreen activeTab={currentTab} onNavigate={handleNavigate} />;
          case "settings":
            return <SettingsScreen activeTab={currentTab} onNavigate={handleNavigate} />;
          default:
            return (
              <DashboardScreen
                activeTab={currentTab}
                onNavigate={handleNavigate}
                onOpenNotifications={handleOpenNotifications}
                onOpenReport={handleOpenReport}
              />
            );
        }
    }
  };

  return (
    <div
      className="w-full h-full overflow-hidden relative"
      style={{ fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screenKey}
          initial={{
            opacity: 0,
            x: isSubScreen ? "8%" : `${direction * 4}%`,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: isSubScreen ? "8%" : `${direction * -4}%`,
          }}
          transition={{
            duration: 0.2,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="absolute inset-0"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}