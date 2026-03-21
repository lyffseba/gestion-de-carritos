import { ProductCard } from './ProductCard';
import type { Product } from '@/lib/mockData';

export function ProductGrid({
  products,
  title,
}: {
  products: Product[];
  title?: string;
}) {
  return (
    <div className="w-full font-mono">
      {title && (
        <h2 className="mb-6 text-xl font-bold tracking-widest text-white border-b border-brand-borderGray pb-4 uppercase flex items-center gap-2">
          <span className="text-primary-500">&gt;</span> {title}
        </h2>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 pt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}