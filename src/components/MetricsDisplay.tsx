import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, TrendingUp, Calendar, Award } from 'lucide-react';
import type { Metrics } from './DataManager';

interface MetricsDisplayProps {
  metrics: Metrics;
}

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ metrics }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-end">
      <MetricCard
        icon={<Calendar className="w-4 h-4" />}
        label="Hoje"
        value={metrics.today}
        bgColor="soap-subjective-light"
        textColor="soap-subjective"
      />
      
      <MetricCard
        icon={<TrendingUp className="w-4 h-4" />}
        label="Semana"
        value={metrics.week}
        bgColor="soap-objective-light"
        textColor="soap-objective"
      />
      
      <MetricCard
        icon={<Award className="w-4 h-4" />}
        label="Total"
        value={metrics.total}
        bgColor="educational-purple-light"
        textColor="educational-purple"
      />
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon, 
  label, 
  value, 
  bgColor, 
  textColor 
}) => {
  return (
    <Card className={`bg-${bgColor} border-${textColor}/20 shadow-sm min-w-[100px]`}>
      <CardContent className="p-3">
        <div className="flex items-center space-x-2">
          <div className={`text-${textColor}`}>
            {icon}
          </div>
          <div>
            <div className={`text-lg font-bold text-${textColor}`}>
              {value}
            </div>
            <div className={`text-xs text-${textColor}/70`}>
              {label}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};