import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { CheckCircle, Filter, MapPin } from 'lucide-react';

const normalize = (str: string) => 
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function generateStaticParams() {
  const categories = Array.from(new Set(MOCK_PRODUCTS.map((p) => normalize(p.category))));
  return [...categories.map((c) => ({ category: c })), { category: 'mantenimiento' }, { category: 'recolecciones' }, { category: 'milenio-plaza' }, { category: 'mercurio' }, { category: 'el-porvenir' }];
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
  } else if (['milenio-plaza', 'mercurio', 'el-porvenir'].includes(normalizedCategory)) {
    const formattedCategoryMap: Record<string, string> = {
      'milenio-plaza': 'Milenio Plaza',
      'mercurio': 'Mercurio',
      'el-porvenir': 'Mi Centro El Porvenir'
    };
    const exactName = formattedCategoryMap[normalizedCategory];
    sectorName = exactName || decodedCategory;
    filteredNodes = MOCK_PRODUCTS.filter((p) => p.category === exactName);
  } else {
    filteredNodes = MOCK_PRODUCTS.filter(
      (p) => normalize(p.category) === normalizedCategory
    );
  }

  if (filteredNodes.length === 0 && !['mantenimiento', 'recolecciones', 'milenio-plaza', 'mercurio', 'el-porvenir'].includes(normalizedCategory)) {
    notFound();
  }

  const activeNodes = filteredNodes.filter(p => p.status === 'Operativo').length;
  const maintenanceNodes = filteredNodes.filter(p => p.status !== 'Operativo').length;

  return (
    <div className="font-sans min-h-screen bg-obys-bg text-obys-text">
      <div className="relative w-full border-b border-obys-border pt-16 pb-24 md:pt-32 md:pb-40">
        <div className="max-w-[90%] mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-8xl font-medium tracking-tighter uppercase leading-[0.85] mb-8 text-obys-text break-words">
                {sectorName}
              </h1>
              <p className="text-obys-text/70 mt-3 text-lg md:text-2xl font-medium leading-snug max-w-2xl">
                Catálogo filtrado de la flota en esta ubicación o categoría específica.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 items-end md:items-center text-sm font-medium uppercase tracking-widest text-obys-text/60">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-obys-text"></span>
                {activeNodes} Operativos
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-obys-accent"></span>
                {maintenanceNodes} Revisión
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[90%] mx-auto py-24">
        {filteredNodes.length > 0 ? (
          <ProductGrid products={filteredNodes} />
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-obys-border p-8 hover:bg-black/5 transition-colors">
            <CheckCircle className="w-16 h-16 text-obys-text/40 mb-8" />
            <h3 className="text-3xl font-medium uppercase tracking-tighter text-obys-text mb-4">Sin vehículos</h3>
            <p className="text-lg font-medium text-obys-text/60 max-w-md mx-auto leading-snug">
              No hay carritos registrados en esta categoría o ubicación por el momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
