import { MOCK_PRODUCTS } from '@/lib/mockData';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { Activity, Filter, MapPin } from 'lucide-react';

export default function CatalogPage() {
  const activeNodes = MOCK_PRODUCTS.filter(p => p.status === 'Operativo').length;
  
  return (
    <div className="font-sans text-neutral-300 min-h-screen pb-20 bg-brand-dark">
      {/* Console Header */}
      <div className="border-b border-neutral-800 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center text-sm md:text-base gap-4">
          
          <div className="flex items-center gap-4">
            <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
              <MapPin className="w-6 h-6 text-neutral-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Todas las Ubicaciones
              </h1>
              <p className="text-neutral-500 mt-1 flex items-center gap-2">
                {MOCK_PRODUCTS.length} vehículos en {activeNodes} operativos
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6 items-center">
            <button className="flex items-center gap-2 px-4 py-2 border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors text-white font-medium">
              <Filter className="w-4 h-4" /> Filtros
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors font-medium">
              <Activity className="w-4 h-4" /> Ordenar por Monedas
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <ProductGrid products={MOCK_PRODUCTS} title="Vista Global de Flota" />
      </div>
    </div>
  );
}