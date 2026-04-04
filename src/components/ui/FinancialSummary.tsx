import * as React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

export interface FinancialSummaryProps {
  revenue: number;
  expenses: number;
  activeUnits?: number;
  currency?: string;
}

export function FinancialSummary({ revenue, expenses, activeUnits = 1, currency = 'COP' }: FinancialSummaryProps) {
  const profit = revenue - expenses;
  const isProfit = profit >= 0;
  
  // Industry Standard Fleet KPIs
  const margin = revenue > 0 ? (profit / revenue) * 100 : (profit < 0 ? (profit / expenses) * 100 : 0);
  const arpu = activeUnits > 0 ? revenue / activeUnits : 0; // Average Revenue Per Unit

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 p-6 border border-obys-border bg-black/5 rounded-xl">
      {/* Metric 1: Revenue */}
      <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-obys-border pb-4 lg:pb-0 lg:pr-4">
        <span className="text-xs uppercase tracking-widest text-obys-text/60 mb-2">Ingresos Brutos</span>
        <span className="text-2xl lg:text-3xl font-medium text-obys-text">{formatCurrency(revenue, currency)}</span>
      </div>
      
      {/* Metric 2: Expenses */}
      <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-obys-border pb-4 lg:pb-0 lg:px-4">
        <span className="text-xs uppercase tracking-widest text-obys-text/60 mb-2">Costos Operativos</span>
        <span className="text-2xl lg:text-3xl font-medium text-red-500/80">{formatCurrency(expenses, currency)}</span>
      </div>
      
      {/* Metric 3: Net Profit */}
      <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-obys-border pb-4 pt-4 lg:pt-0 lg:pb-0 lg:px-4">
        <span className="text-xs uppercase tracking-widest text-obys-text/60 mb-2">Utilidad Neta</span>
        <span className={`text-2xl lg:text-3xl font-medium ${isProfit ? 'text-green-600/80' : 'text-red-500'}`}>
          {formatCurrency(profit, currency)}
        </span>
      </div>

      {/* Metric 4: Margin % */}
      <div className="flex flex-col border-r-0 lg:border-r border-obys-border pt-4 lg:pt-0 lg:px-4">
        <span className="text-xs uppercase tracking-widest text-obys-text/60 mb-2">Margen Neto</span>
        <span className={`text-2xl lg:text-3xl font-medium ${isProfit ? 'text-green-600/80' : 'text-red-500'}`}>
          {margin.toFixed(1)}%
        </span>
      </div>

      {/* Metric 5: ARPU (Average Revenue Per Unit) */}
      <div className="flex flex-col pt-4 lg:pt-0 lg:pl-4 col-span-2 lg:col-span-1">
        <span className="text-xs uppercase tracking-widest text-obys-text/60 mb-2">ARPU / Vehículo</span>
        <span className="text-2xl lg:text-3xl font-medium text-blue-600/80">
          {formatCurrency(arpu, currency)}
        </span>
      </div>
    </div>
  );
}