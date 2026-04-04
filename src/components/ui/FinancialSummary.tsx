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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {/* Metric 1: Revenue */}
      <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6 flex flex-col hover:border-slate-300 transition-colors">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Ingresos Brutos</span>
        <span className="text-3xl font-bold text-slate-900">{formatCurrency(revenue, currency)}</span>
      </div>
      
      {/* Metric 2: Expenses */}
      <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6 flex flex-col hover:border-slate-300 transition-colors">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Costos Operativos</span>
        <span className="text-3xl font-bold text-red-500">{formatCurrency(expenses, currency)}</span>
      </div>
      
      {/* Metric 3: Net Profit */}
      <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6 flex flex-col hover:border-slate-300 transition-colors">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Utilidad Neta</span>
        <span className={`text-3xl font-bold ${isProfit ? 'text-emerald-600' : 'text-red-600'}`}>
          {formatCurrency(profit, currency)}
        </span>
      </div>

      {/* Metric 4: Margin % */}
      <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6 flex flex-col hover:border-slate-300 transition-colors">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Margen Neto</span>
        <span className={`text-3xl font-bold ${isProfit ? 'text-emerald-600' : 'text-red-600'}`}>
          {margin.toFixed(1)}%
        </span>
      </div>

      {/* Metric 5: ARPU (Average Revenue Per Unit) */}
      <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6 flex flex-col sm:col-span-2 xl:col-span-1 hover:border-slate-300 transition-colors">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">ARPU / Vehículo</span>
        <span className="text-3xl font-bold text-blue-600">
          {formatCurrency(arpu, currency)}
        </span>
      </div>
    </div>
  );
}