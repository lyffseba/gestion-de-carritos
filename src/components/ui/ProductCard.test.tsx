import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCard } from './ProductCard';
import type { Product } from '@/lib/mockData';

const mockProduct: Product = {
  id: 'test-id',
  name: 'Test Product',
  description: 'Test Description',
  price: 1000,
  category: 'Test Category',
  status: 'Operativo',
  imageUrl: 'https://example.com/image.jpg',
  coins: 10,
};
describe('ProductCard component', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('$1000')).toBeInTheDocument();
    expect(screen.getByText(/10 USD/)).toBeInTheDocument();
    expect(screen.getByText('#TEST-I')).toBeInTheDocument();
  });

  it('renders maintenance badge when status is not Operativo', () => {
    const maintenanceProduct: Product = {
      ...mockProduct,
      status: 'Mantenimiento',
    };
    render(<ProductCard product={maintenanceProduct} />);

    expect(screen.getByText('Mantenimiento')).toBeInTheDocument();
  });

  it('renders default coins value when product.coins is missing', () => {
    const noCoinsProduct = {
      ...mockProduct,
    } as Product;
    delete (noCoinsProduct as any).coins;

    render(<ProductCard product={noCoinsProduct} />);
    expect(screen.getByText(/0 USD/)).toBeInTheDocument();
  });

  it('renders links correctly', () => {
    render(<ProductCard product={mockProduct} />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/product/test-id');
    expect(links[1]).toHaveAttribute('href', '/product/test-id');
    expect(links[2]).toHaveAttribute('href', '/product/test-id');
  });
});
