import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from './Footer';

describe('Footer component', () => {
  it('renders footer content correctly', () => {
    render(<Footer />);

    expect(screen.getAllByText(/GDC/)[0]).toBeInTheDocument();
    expect(screen.getByText(/FLOTA/)).toBeInTheDocument();
    expect(screen.getByText(/Plataforma de gestión/)).toBeInTheDocument();
    expect(screen.getByText(/Ubicaciones/)).toBeInTheDocument();
    expect(screen.getByText(/Admin/)).toBeInTheDocument();
    expect(screen.getByText(/Bogotá, Colombia/)).toBeInTheDocument();
  });

  it('renders current year correctly', () => {
    const year = new Date().getFullYear();
    render(<Footer />);
    expect(screen.getByText(`© ${year} GDC`)).toBeInTheDocument();
  });

  it('renders links correctly', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    expect(links.some((link) => link.getAttribute('href') === '/catalog/milenio-plaza')).toBe(true);
    expect(links.some((link) => link.getAttribute('href') === '/catalog/el-porvenir')).toBe(true);
    expect(links.some((link) => link.getAttribute('href') === '/catalog/mercurio')).toBe(true);
    expect(links.some((link) => link.getAttribute('href') === '/admin')).toBe(true);
  });
});
