import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { HomeScreen } from "./components/screens/HomeScreen";
import { ExploreScreen } from "./components/screens/ExploreScreen";
import { DropsScreen } from "./components/screens/DropsScreen";
import { BagScreen } from "./components/screens/BagScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { ProductDetailScreen } from "./components/screens/ProductDetailScreen";
import { OrdersScreen } from "./components/screens/OrdersScreen";
import { WishlistScreen } from "./components/screens/WishlistScreen";
import { InfoScreen } from "./components/screens/InfoScreen";
import { products, type Product, type CartItem, type ScreenState, type ScreenType } from "./components/data";

const TAB_SCREENS: ScreenType[] = ["home", "explore", "drops", "bag", "perfil"];

const screenTitles: Partial<Record<ScreenType, string>> = {
  explore: "EXPLORAR",
  drops: "DROPS",
  bag: "SACOLA",
  perfil: "PERFIL",
  "product-detail": "",
  orders: "PEDIDOS",
  wishlist: "DESEJOS",
  addresses: "ENDERECOS",
  payment: "PAGAMENTO",
  notifications: "NOTIFICACOES",
  "sizes-pref": "TAMANHOS",
  help: "AJUDA",
  returns: "TROCAS",
  terms: "TERMOS",
};

export default function App() {
  const [screenStack, setScreenStack] = useState<ScreenState[]>([{ type: "home" }]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(["2", "4", "6", "8"]);

  const currentScreen = screenStack[screenStack.length - 1];
  const isTabScreen = TAB_SCREENS.includes(currentScreen.type);
  const showBack = !isTabScreen;

  // Navigation
  const pushScreen = useCallback((screen: ScreenState) => {
    setScreenStack((prev) => [...prev, screen]);
  }, []);

  const popScreen = useCallback(() => {
    setScreenStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const switchTab = useCallback((tab: string) => {
    setScreenStack([{ type: tab as ScreenType }]);
  }, []);

  const navigateTo = useCallback((screen: ScreenType) => {
    if (TAB_SCREENS.includes(screen)) {
      switchTab(screen);
    } else {
      pushScreen({ type: screen });
    }
  }, [pushScreen, switchTab]);

  // Cart
  const addToCart = useCallback((product: Product, size?: string) => {
    setCart((prev) => {
      const s = size || product.sizes[1] || product.sizes[0];
      const existing = prev.find((item) => item.product.id === product.id && item.size === s);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === s
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size: s, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  // Wishlist
  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeTab = isTabScreen ? currentScreen.type : "";

  // Get header title
  const getTitle = () => {
    if (currentScreen.type === "home") return undefined;
    if (currentScreen.type === "product-detail") {
      const p = products.find((x) => x.id === currentScreen.productId);
      return p ? p.category.toUpperCase() : "";
    }
    return screenTitles[currentScreen.type];
  };

  const openProduct = (id: string) => pushScreen({ type: "product-detail", productId: id });

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#080808", fontFamily: "'Inter', sans-serif" }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2"
      >
        Pular para o conteudo principal
      </a>

      <Header
        showBack={showBack}
        title={getTitle()}
        cartCount={cartCount}
        onBack={popScreen}
        onCartPress={() => switchTab("bag")}
        onLogoPress={() => switchTab("home")}
      />

      <div id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentScreen.type}-${currentScreen.productId || ""}`}
            initial={{ opacity: 0, y: showBack ? 12 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: showBack ? 12 : -6 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          >
            {currentScreen.type === "home" && (
              <HomeScreen
                onAddToCart={(p) => addToCart(p)}
                onProductPress={openProduct}
                onNavigate={navigateTo}
              />
            )}
            {currentScreen.type === "explore" && (
              <ExploreScreen
                onAddToCart={(p) => addToCart(p)}
                onProductPress={openProduct}
              />
            )}
            {currentScreen.type === "drops" && <DropsScreen />}
            {currentScreen.type === "bag" && (
              <BagScreen
                cart={cart}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onProductPress={openProduct}
              />
            )}
            {currentScreen.type === "perfil" && (
              <ProfileScreen
                onNavigate={navigateTo}
                wishlistCount={wishlist.length}
              />
            )}
            {currentScreen.type === "product-detail" && currentScreen.productId && (() => {
              const product = products.find((p) => p.id === currentScreen.productId);
              if (!product) return null;
              return (
                <ProductDetailScreen
                  product={product}
                  onAddToCart={(p, s) => addToCart(p, s)}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              );
            })()}
            {currentScreen.type === "orders" && <OrdersScreen />}
            {currentScreen.type === "wishlist" && (
              <WishlistScreen
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
                onProductPress={openProduct}
                onAddToCart={(p) => addToCart(p)}
              />
            )}
            {["addresses", "payment", "notifications", "sizes-pref", "help", "returns", "terms"].includes(currentScreen.type) && (
              <InfoScreen type={currentScreen.type} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={switchTab} />
    </div>
  );
}
