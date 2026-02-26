import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import * as Sentry from "@sentry/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Eye,
  Users,
  MousePointerClick,
  Globe,
  LogOut,
  RefreshCw,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AnalyticsEvent {
  id: string;
  event_type: string;
  page_path: string;
  page_title: string | null;
  referrer: string | null;
  device_type: string | null;
  browser: string | null;
  created_at: string;
  session_id: string;
  visitor_id: string;
}

import { StatCard } from "@/components/admin/StatCard";
import { TopPagesChart } from "@/components/admin/TopPagesChart";
import { DailyViewsChart } from "@/components/admin/DailyViewsChart";
import { DistributionChart } from "@/components/admin/DistributionChart";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState("7");
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAuth = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/admin");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      toast.error("Acesso negado");
      await supabase.auth.signOut();
      navigate("/admin");
      return;
    }

    setIsAdmin(true);
  }, [navigate]);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    try {
      const startDate = startOfDay(subDays(new Date(), parseInt(dateRange)));
      const endDate = endOfDay(new Date());

      const { data, error } = await supabase
        .from("analytics_events")
        .select("*")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString())
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching analytics:", error);
        Sentry.captureException(error);
        toast.error("Erro ao carregar analytics. Tente novamente.");
        return;
      }

      setEvents(data || []);
    } catch (error) {
      console.error("Error:", error);
      Sentry.captureException(error);
      toast.error("Erro de conexão. Verifique sua rede.");
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAdmin) {
      fetchAnalytics();
    }
  }, [dateRange, isAdmin, fetchAnalytics]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const totalPageViews = events.filter((e) => e.event_type === "page_view").length;
  const uniqueVisitors = new Set(events.map((e) => e.visitor_id)).size;
  const uniqueSessions = new Set(events.map((e) => e.session_id)).size;
  const totalClicks = events.filter(
    (e) => e.event_type === "click" || e.event_type === "external_link",
  ).length;

  const pageViewsByPath = events
    .filter((e) => e.event_type === "page_view")
    .reduce(
      (acc, event) => {
        const path = event.page_path || "/";
        acc[path] = (acc[path] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

  const topPages = Object.entries(pageViewsByPath)
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const deviceDistribution = events.reduce(
    (acc, event) => {
      const device = event.device_type || "unknown";
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const deviceData = Object.entries(deviceDistribution).map(([name, value]) => ({ name, value }));

  const browserDistribution = events.reduce(
    (acc, event) => {
      const browser = event.browser || "unknown";
      acc[browser] = (acc[browser] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const browserData = Object.entries(browserDistribution).map(([name, value]) => ({ name, value }));

  const dailyViews = events
    .filter((e) => e.event_type === "page_view")
    .reduce(
      (acc, event) => {
        const date = format(new Date(event.created_at), "dd/MM", { locale: ptBR });
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

  const dailyData = Object.entries(dailyViews)
    .map(([date, views]) => ({ date, views }))
    .reverse();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Verificando permissões...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-semibold">Analytics Dashboard</h1>
            <p className="text-sm text-muted-foreground">Monitoramento de tráfego do portfólio</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="14">Últimos 14 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={fetchAnalytics} disabled={isLoading}>
              <RefreshCw className={`h - 4 w - 4 ${isLoading ? "animate-spin" : ""} `} />
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {}
      <main className="container mx-auto px-6 py-8">
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Visualizações"
            value={totalPageViews.toLocaleString()}
            icon={<Eye className="h-4 w-4 text-accent" />}
            description="Page views no período"
          />

          <StatCard
            title="Visitantes Únicos"
            value={uniqueVisitors.toLocaleString()}
            icon={<Users className="h-4 w-4 text-accent" />}
            description="Visitantes distintos"
          />

          <StatCard
            title="Sessões"
            value={uniqueSessions.toLocaleString()}
            icon={<Globe className="h-4 w-4 text-accent" />}
            description="Sessões de navegação"
          />

          <StatCard
            title="Cliques"
            value={totalClicks.toLocaleString()}
            icon={<MousePointerClick className="h-4 w-4 text-accent" />}
            description="Interações rastreadas"
          />
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DailyViewsChart data={dailyData} />
          <TopPagesChart data={topPages} />
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DistributionChart
            title="Dispositivos"
            description="Distribuição por tipo de dispositivo"
            data={deviceData}
          />

          <DistributionChart
            title="Navegadores"
            description="Distribuição por navegador"
            data={browserData}
          />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
