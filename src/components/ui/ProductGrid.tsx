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
    <div className="w-full font-sans">
      {title && (
        <h2 className="mb-6 text-xl font-bold tracking-tight text-slate-900 border-b border-slate-200 pb-4 flex items-center gap-2">
          {title}
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