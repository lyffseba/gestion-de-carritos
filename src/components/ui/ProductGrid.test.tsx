import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductGrid } from './ProductGrid';
import type { Product } from '@/lib/mockData';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Desc 1',
    price: 1000,
    category: 'Cat 1',
    status: 'Operativo',
    imageUrl: 'https://example.com/1.jpg',
    coins: 10,
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Desc 2',
    price: 2000,
    category: 'Cat 2',
    status: 'Mantenimiento',
    imageUrl: 'https://example.com/2.jpg',
    coins: 20,
  },
];

describe('ProductGrid component', () => {
  it('renders a grid of products', () => {
    render(<ProductGrid products={mockProducts} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('renders a title when provided', () => {
    render(<ProductGrid products={mockProducts} title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
