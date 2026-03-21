import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { ProductGrid } from '@/components/ui/ProductGrid';

const normalize = (str: string) => 
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Pre-generate static params for the mock categories
export function generateStaticParams() {
  const categories = Array.from(new Set(MOCK_PRODUCTS.map((p) => normalize(p.category))));
  return [...categories.map((c) => ({ category: c })), { category: 'ofertas' }, { category: 'recolecciones' }, { category: 'milenio-plaza' }];
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const normalizedCategory = normalize(decodedCategory);
  
  let filteredProducts = [];
  let categoryName = decodedCategory;

  if (normalizedCategory === 'ofertas') {
    filteredProducts = MOCK_PRODUCTS.filter((p) => p.originalPrice !== undefined);
    categoryName = 'Ofertas Especiales';
  } else if (normalizedCategory === 'recolecciones') {
    filteredProducts = MOCK_PRODUCTS.filter((p) => normalize(p.category).includes('bebe'));
    if (filteredProducts.length === 0) {
      // Fallback if no baby products in mock yet, show empty or some default
      categoryName = 'Bebés';
    }
  } else if (normalizedCategory === 'milenio-plaza') {
    filteredProducts = MOCK_PRODUCTS.filter((p) => normalize(p.category) === 'ventura');
    categoryName = 'Dormitorio';
  } else {
    // Filter products matching the category (case-insensitive and ignoring accents)
    filteredProducts = MOCK_PRODUCTS.filter(
      (p) => normalize(p.category) === normalizedCategory || 
             normalize(p.category) === normalizedCategory + 's' // simple singular/plural fallback
    );
    if (filteredProducts.length > 0) {
      categoryName = filteredProducts[0].category;
    }
  }

  // If after all specific checks and general checks it's still empty, return notFound()
  // UNLESS it's a known category like 'recolecciones' that we just didn't mock yet.
  if (filteredProducts.length === 0 && !['recolecciones', 'ofertas', 'milenio-plaza'].includes(normalizedCategory)) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Filters (Mock) - Vinted Style */}
      <div className="border-b border-gray-200 sticky top-16 md:top-20 bg-white z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:justify-between items-start md:items-center text-sm md:text-base gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-[#111111] capitalize">
            {normalizedCategory === 'ofertas' ? <span className="text-[#f59e0b]">Ofertas Especiales</span> : categoryName}
          </h1>
          
          <div className="flex gap-4 md:gap-6 overflow-x-auto whitespace-nowrap w-full md:w-auto" style={{ scrollbarWidth: 'none' }}>
            <span className="text-gray-500 min-w-[80px]">{filteredProducts.length} productos</span>
            <span className="font-bold text-[#111111] cursor-pointer hover:text-blue-600">Relevancia</span>
            <span className="text-gray-500 cursor-pointer hover:text-blue-600">Menor Precio</span>
            <span className="text-gray-500 cursor-pointer hover:text-blue-600">Mayor Precio</span>
          </div>
        </div>
      </div>
      
      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-4xl mb-4">📭</span>
            <h3 className="text-lg font-bold text-[#111111]">No hay productos aquí por ahora</h3>
            <p className="text-gray-500 mt-2">Pronto añadiremos nuevo inventario a esta sección.</p>
          </div>
        )}
      </div>
    </div>
  );
}
