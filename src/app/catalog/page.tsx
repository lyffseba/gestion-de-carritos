import { MOCK_PRODUCTS } from '@/lib/mockData';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { Activity, Filter, MapPin } from 'lucide-react';

export default function CatalogPage() {
  const activeNodes = MOCK_PRODUCTS.filter(p => p.status === 'Operativo').length;
  
  return (
    <div className="font-sans text-slate-700 min-h-screen pb-20 bg-white">
      {/* Console Header */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center text-sm md:text-base gap-4">
          
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
              <MapPin className="w-6 h-6 text-slate-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Todas las Ubicaciones
              </h1>
              <p className="text-slate-400 mt-1 flex items-center gap-2">
                {MOCK_PRODUCTS.length} vehículos en {activeNodes} operativos
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6 items-center">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors text-slate-900 font-medium">
              <Filter className="w-4 h-4" /> Filtros
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
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