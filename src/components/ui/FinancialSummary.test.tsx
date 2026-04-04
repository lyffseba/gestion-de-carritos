import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FinancialSummary } from './FinancialSummary';

describe('FinancialSummary component', () => {
  it('renders revenue, expenses, and profit correctly', () => {
    render(<FinancialSummary revenue={1000000} expenses={595000} currency="COP" />);
    expect(screen.getByText(/Ingresos \(Recaudo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Gastos \(Operación\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Utilidad Neta/i)).toBeInTheDocument();
  });

  it('renders positive profit in green', () => {
    render(<FinancialSummary revenue={1500} expenses={500} currency="USD" />);
    const profitValue = screen.getByText(/\$1,000\.00/i);
    expect(profitValue).toHaveClass('text-green-600/80');
  });

  it('renders negative profit in red', () => {
    render(<FinancialSummary revenue={500} expenses={1000} currency="USD" />);
    const profitValue = screen.getByText(/-\$500\.00/i);
    expect(profitValue).toHaveClass('text-red-500');
  });

  it('uses default currency if not provided', () => {
    render(<FinancialSummary revenue={100} expenses={50} />);
    expect(screen.getByText(/Gastos/)).toBeInTheDocument();
  });
});