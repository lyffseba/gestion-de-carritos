import { MOCK_PRODUCTS } from '@/lib/mockData';
import { ProductGrid } from '@/components/ui/ProductGrid';

export default function CatalogPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Filters (Mock) - Moved out of the dark banner to look more clean/Vinted */}
      <div className="border-b border-gray-200 sticky top-16 md:top-20 bg-white z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm md:text-base overflow-x-auto whitespace-nowrap gap-4" style={{ scrollbarWidth: 'none' }}>
          <p className="text-gray-500 min-w-[80px]">{MOCK_PRODUCTS.length} productos</p>
          <div className="flex gap-4 md:gap-6">
            <span className="font-bold text-[#111111] cursor-pointer hover:text-blue-600">Relevancia</span>
            <span className="text-gray-500 cursor-pointer hover:text-blue-600">Menor Precio</span>
            <span className="text-gray-500 cursor-pointer hover:text-blue-600">Mayor Precio</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
        <ProductGrid products={MOCK_PRODUCTS} />
      </div>
    </div>
  );
}
