import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    description?: string;
    trend?: number;
}

export const StatCard = ({ title, value, icon, description, trend }: StatCardProps) => (
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
