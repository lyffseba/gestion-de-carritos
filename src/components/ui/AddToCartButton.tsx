'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from './Button';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/lib/mockData';

export function AddToCartButton({ product, className }: { product: Product, className?: string }) {
  const { addItem } = useCartStore();

  return (
    <Button 
      variant="accent" 
      size="lg"
      className={`gap-2 ${className || ''}`}
      onClick={() => addItem(product)}
    >
      <ShoppingCart className="h-5 w-5" />
      Agregar al Carrito
    </Button>
  );
}
