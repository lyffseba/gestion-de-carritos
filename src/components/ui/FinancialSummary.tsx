import * as React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

export interface FinancialSummaryProps {
  revenue: number;
  expenses: number;
  currency?: string;
}

export function FinancialSummary({ revenue, expenses, currency = 'COP' }: FinancialSummaryProps) {
  const profit = revenue - expenses;
  const isProfit = profit >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border border-obys-border bg-black/5">
      <div className="flex flex-col border-b md:border-b-0 md:border-r border-obys-border pb-4 md:pb-0 md:pr-4">
        <span className="text-sm uppercase tracking-widest text-obys-text/60 mb-2">Ingresos (Recaudo)</span>
        <span className="text-3xl md:text-4xl font-medium text-obys-text">{formatCurrency(revenue, currency)}</span>
      </div>
      <div className="flex flex-col border-b md:border-b-0 md:border-r border-obys-border py-4 md:py-0 md:px-4">
        <span className="text-sm uppercase tracking-widest text-obys-text/60 mb-2">Gastos (Operación)</span>
        <span className="text-3xl md:text-4xl font-medium text-red-500/80">{formatCurrency(expenses, currency)}</span>
      </div>
      <div className="flex flex-col pt-4 md:pt-0 md:pl-4">
        <span className="text-sm uppercase tracking-widest text-obys-text/60 mb-2">Utilidad Neta</span>
        <span className={`text-3xl md:text-4xl font-medium ${isProfit ? 'text-green-600/80' : 'text-red-500'}`}>
          {formatCurrency(profit, currency)}
        </span>
      </div>
    </div>
  );
}