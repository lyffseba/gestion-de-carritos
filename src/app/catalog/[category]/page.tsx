import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { CheckCircle, Filter, MapPin } from 'lucide-react';

const normalize = (str: string) => 
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function generateStaticParams() {
  const categories = Array.from(new Set(MOCK_PRODUCTS.map((p) => normalize(p.category))));
  return [...categories.map((c) => ({ category: c })), { category: 'mantenimiento' }, { category: 'recolecciones' }, { category: 'el-ensueno' }, { category: 'milenio-plaza' }, { category: 'mercurio' }, { category: 'el-porvenir' }, { category: 'ventura' }];
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const normalizedCategory = normalize(decodedCategory);
  
  let filteredNodes = [];
  let sectorName = decodedCategory.replace(/-/g, ' ');

  if (normalizedCategory === 'mantenimiento') {
    filteredNodes = MOCK_PRODUCTS.filter((p) => p.status !== 'Operativo');
    sectorName = 'En Mantenimiento';
  } else if (normalizedCategory === 'recolecciones') {
    filteredNodes = MOCK_PRODUCTS.filter((p) => (p.coins || 0) > 100);
    sectorName = 'Recolecciones (Monedas Altas)';
  } else if (['milenio-plaza', 'el-ensueno', 'mercurio', 'el-porvenir', 'ventura'].includes(normalizedCategory)) {
    const formattedCategoryMap: Record<string, string> = {
      'milenio-plaza': 'Milenio Plaza',
      'el-ensueno': 'El Ensueño',
      'mercurio': 'Mercurio',
      'el-porvenir': 'Mi Centro El Porvenir',
      'ventura': 'Ventura'
    };
    const exactName = formattedCategoryMap[normalizedCategory];
    sectorName = exactName;
    filteredNodes = MOCK_PRODUCTS.filter((p) => p.category === exactName);
  } else {
    filteredNodes = MOCK_PRODUCTS.filter(
      (p) => normalize(p.category) === normalizedCategory
    );
  }

  if (filteredNodes.length === 0 && !['mantenimiento', 'recolecciones', 'el-ensueno', 'milenio-plaza', 'mercurio', 'el-porvenir', 'ventura'].includes(normalizedCategory)) {
    notFound();
  }

  return (
    <div className="font-sans text-neutral-300 min-h-screen pb-20 bg-brand-dark">
      {/* Sector Console Header */}
      <div className="border-b border-neutral-800 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center text-sm md:text-base gap-4">
          
          <div className="flex items-center gap-4">
            <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
              <MapPin className="w-6 h-6 text-neutral-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight capitalize">
                {sectorName}
              </h1>
              <p className="text-neutral-500 mt-1 flex items-center gap-2">
                {filteredNodes.length} vehículos detectados
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6 items-center">
            <button className="flex items-center gap-2 px-4 py-2 border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors text-white font-medium">
              <Filter className="w-4 h-4" /> Filtros
            </button>
          </div>
        </div>
      </div>
      
      {/* Sector Telemetry Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        {filteredNodes.length > 0 ? (
          <ProductGrid products={filteredNodes} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[#111111] border border-neutral-800 rounded-xl mt-10">
            <CheckCircle className="w-12 h-12 text-neutral-600 mb-4" />
            <h3 className="text-base font-bold text-neutral-300">No hay vehículos en esta sección</h3>
            <p className="text-neutral-500 mt-2">La ubicación está registrada pero no cuenta con unidades activas.</p>
          </div>
        )}
      </div>
    </div>
  );
}