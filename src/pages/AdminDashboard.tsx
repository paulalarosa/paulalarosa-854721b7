import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Eye, Users, MousePointerClick, Globe, 
  LogOut, RefreshCw, Calendar, TrendingUp
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: number;
}

const StatCard = ({ title, value, icon, description, trend }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs mt-1 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          <TrendingUp className={`h-3 w-3 ${trend < 0 ? 'rotate-180' : ''}`} />
          {Math.abs(trend)}% vs período anterior
        </div>
      )}
    </CardContent>
  </Card>
);

const COLORS = ['hsl(var(--accent))', 'hsl(var(--primary))', 'hsl(var(--muted-foreground))', '#8884d8'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7');
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchAnalytics();
    }
  }, [dateRange, isAdmin]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/admin');
      return;
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      toast.error('Acesso negado');
      await supabase.auth.signOut();
      navigate('/admin');
      return;
    }

    setIsAdmin(true);
  };

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const startDate = startOfDay(subDays(new Date(), parseInt(dateRange)));
      const endDate = endOfDay(new Date());

      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching analytics:', error);
        toast.error('Erro ao carregar analytics');
        return;
      }

      setEvents(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  // Calculate metrics
  const totalPageViews = events.filter(e => e.event_type === 'page_view').length;
  const uniqueVisitors = new Set(events.map(e => e.visitor_id)).size;
  const uniqueSessions = new Set(events.map(e => e.session_id)).size;
  const totalClicks = events.filter(e => e.event_type === 'click' || e.event_type === 'external_link').length;

  // Page views by path
  const pageViewsByPath = events
    .filter(e => e.event_type === 'page_view')
    .reduce((acc, event) => {
      const path = event.page_path || '/';
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topPages = Object.entries(pageViewsByPath)
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Device distribution
  const deviceDistribution = events
    .reduce((acc, event) => {
      const device = event.device_type || 'unknown';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const deviceData = Object.entries(deviceDistribution)
    .map(([name, value]) => ({ name, value }));

  // Browser distribution
  const browserDistribution = events
    .reduce((acc, event) => {
      const browser = event.browser || 'unknown';
      acc[browser] = (acc[browser] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const browserData = Object.entries(browserDistribution)
    .map(([name, value]) => ({ name, value }));

  // Daily views
  const dailyViews = events
    .filter(e => e.event_type === 'page_view')
    .reduce((acc, event) => {
      const date = format(new Date(event.created_at), 'dd/MM', { locale: ptBR });
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

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
      {/* Header */}
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
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
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

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Views Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Visualizações por Dia</CardTitle>
              <CardDescription>Evolução do tráfego no período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {dailyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--accent))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Sem dados no período
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Páginas Mais Visitadas</CardTitle>
              <CardDescription>Top 5 páginas por visualizações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {topPages.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topPages} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis 
                        dataKey="path" 
                        type="category" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                        width={100}
                        tickFormatter={(value) => value.length > 15 ? value.slice(0, 15) + '...' : value}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="views" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Sem dados no período
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Device Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Dispositivos</CardTitle>
              <CardDescription>Distribuição por tipo de dispositivo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                {deviceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {deviceData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Sem dados
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Browser Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Navegadores</CardTitle>
              <CardDescription>Distribuição por navegador</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                {browserData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={browserData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {browserData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Sem dados
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
