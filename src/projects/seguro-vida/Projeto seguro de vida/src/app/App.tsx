import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MobileShell } from "./components/MobileShell";
import { BottomTabBar, type TabId } from "./components/BottomTabBar";
import { HomeScreen } from "./components/screens/HomeScreen";
import { PoliciesScreen } from "./components/screens/PoliciesScreen";
import { ClaimScreen } from "./components/screens/ClaimScreen";
import { AlertsScreen } from "./components/screens/AlertsScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { GuinchoScreen } from "./components/screens/GuinchoScreen";
import { OficinasScreen } from "./components/screens/OficinasScreen";
import { DocumentosScreen } from "./components/screens/DocumentosScreen";
import { SuporteScreen } from "./components/screens/SuporteScreen";
import { WhatsAppScreen } from "./components/screens/WhatsAppScreen";
import { CarteiraScreen } from "./components/screens/CarteiraScreen";
import { GlobalSearch } from "./components/GlobalSearch";
import { ShieldOnboarding, useShieldOnboarding } from "./components/ShieldOnboarding";
import { hapticLight } from "./components/haptics";
import type { QuickActionId } from "./components/QuickActions";

type SubScreen = QuickActionId | null;

const screens: Record<TabId, React.ComponentType<{ onNavigate: (tab: TabId) => void; onOpenSearch?: () => void; onQuickAction?: (id: QuickActionId) => void }>> = {
  inicio: HomeScreen,
  apolices: PoliciesScreen as any,
  sinistro: ClaimScreen,
  alertas: AlertsScreen as any,
  perfil: ProfileScreen as any,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("inicio");
  const [subScreen, setSubScreen] = useState<SubScreen>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { shouldShow: showOnboarding, dismiss: dismissOnboarding } = useShieldOnboarding();

  const handleTabChange = useCallback((tab: TabId) => {
    hapticLight();
    setSubScreen(null);
    setActiveTab(tab);
  }, []);

  const handleOpenSearch = useCallback(() => {
    hapticLight();
    setSearchOpen(true);
  }, []);

  const handleSearchNavigate = useCallback((tab: TabId) => {
    setActiveTab(tab);
    setSubScreen(null);
  }, []);

  const handleQuickAction = useCallback((id: QuickActionId) => {
    hapticLight();
    setSubScreen(id);
  }, []);

  const handleBackFromSub = useCallback(() => {
    hapticLight();
    setSubScreen(null);
  }, []);

  const Screen = screens[activeTab];

  // Render sub-screen if active
  const renderSubScreen = () => {
    switch (subScreen) {
      case "guincho":
        return <GuinchoScreen onBack={handleBackFromSub} />;
      case "oficinas":
        return <OficinasScreen onBack={handleBackFromSub} />;
      case "docs":
        return <DocumentosScreen onBack={handleBackFromSub} />;
      case "suporte":
        return <SuporteScreen onBack={handleBackFromSub} />;
      case "whatsapp":
        return <WhatsAppScreen onBack={handleBackFromSub} />;
      case "carteira":
        return <CarteiraScreen onBack={handleBackFromSub} />;
      default:
        return null;
    }
  };

  return (
    <MobileShell>
      <AnimatePresence mode="wait">
        {subScreen ? (
          <motion.div
            key={`sub-${subScreen}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 overflow-hidden flex flex-col"
          >
            {renderSubScreen()}
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-1 overflow-hidden flex flex-col"
          >
            <Screen
              onNavigate={handleTabChange}
              onOpenSearch={handleOpenSearch}
              onQuickAction={handleQuickAction}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomTabBar active={activeTab} onTabChange={handleTabChange} />

      <GlobalSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleSearchNavigate}
      />

      <AnimatePresence>
        {showOnboarding && activeTab === "inicio" && !subScreen && (
          <ShieldOnboarding onComplete={dismissOnboarding} />
        )}
      </AnimatePresence>
    </MobileShell>
  );
}
