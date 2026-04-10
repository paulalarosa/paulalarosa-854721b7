import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import React, { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import SmoothScroll from "./components/SmoothScroll";
import GrainOverlay from "./components/GrainOverlay";
import PageTransition from "./components/PageTransition";
import "./i18n/config";

const Index = React.lazy(() => import("./pages/Index"));
const CaseStudy = React.lazy(() => import("./pages/CaseStudy"));
const ProjetoPage = React.lazy(() => import("./pages/ProjetoPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AdminLogin = React.lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/case-study/:id"
          element={
            <PageTransition>
              <CaseStudy />
            </PageTransition>
          }
        />
        <Route
          path="/projeto/:id"
          element={
            <PageTransition>
              <ProjetoPage />
            </PageTransition>
          }
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SmoothScroll>
              <ScrollToTop />
              <Suspense
                fallback={
                  <div className="h-screen w-full bg-background grid place-items-center"></div>
                }
              >
                <AnimatedRoutes />
              </Suspense>
              <GrainOverlay />
            </SmoothScroll>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
