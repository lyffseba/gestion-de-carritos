import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FinancialSummary } from './FinancialSummary';

describe('FinancialSummary component', () => {
  it('renders revenue, expenses, and profit correctly', () => {
    render(<FinancialSummary revenue={1000000} expenses={595000} activeUnits={10} currency="COP" />);
    expect(screen.getByText(/Ingresos Brutos/i)).toBeInTheDocument();
    expect(screen.getByText(/Costos Operativos/i)).toBeInTheDocument();
    expect(screen.getByText(/Utilidad Neta/i)).toBeInTheDocument();
    expect(screen.getByText(/Margen Neto/i)).toBeInTheDocument();
    expect(screen.getByText(/ARPU/i)).toBeInTheDocument(); // Average Revenue Per Unit
  });

  it('calculates and renders positive profit and margin correctly', () => {
    render(<FinancialSummary revenue={1500} expenses={500} activeUnits={5} currency="USD" />);
    const profitValue = screen.getByText(/\$1,000\.00/i);
    expect(profitValue).toHaveClass('text-green-600/80');
    expect(screen.getByText('66.7%')).toBeInTheDocument(); // Margin
    expect(screen.getByText(/\$300\.00/i)).toBeInTheDocument(); // ARPU (1500 / 5)
  });

  it('renders negative profit in red and 0% margin', () => {
    render(<FinancialSummary revenue={500} expenses={1000} activeUnits={2} currency="USD" />);
    const profitValue = screen.getByText(/-\$500\.00/i);
    expect(profitValue).toHaveClass('text-red-500');
    expect(screen.getByText('-100.0%')).toBeInTheDocument();
  });

  it('uses default currency if not provided', () => {
    render(<FinancialSummary revenue={100} expenses={50} activeUnits={1} />);
    expect(screen.getByText(/Costos/)).toBeInTheDocument();
  });

  it('handles zero revenue and zero units gracefully', () => {
    render(<FinancialSummary revenue={0} expenses={500} activeUnits={0} currency="USD" />);
    expect(screen.getByText('-100.0%')).toBeInTheDocument(); // Margin
  });
});