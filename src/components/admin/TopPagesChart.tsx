import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TopPage {
    path: string;
    views: number;
}

interface TopPagesChartProps {
    data: TopPage[];
}

export const TopPagesChart = ({ data }: TopPagesChartProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Páginas Mais Visitadas</CardTitle>
                <CardDescription>Top 5 páginas por visualizações</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    {data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} layout="vertical">
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
    );
};
