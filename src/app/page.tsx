import Link from 'next/link';
import { Activity, MapPin, AlertCircle, Wrench } from 'lucide-react';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4); 
  
  const totalCoins = MOCK_PRODUCTS.reduce((acc, p) => acc + (p.coins || 0), 0);
  const activeUnits = MOCK_PRODUCTS.filter(p => p.status === 'Operativo').length;
  const maintenanceUnits = MOCK_PRODUCTS.filter(p => p.status !== 'Operativo').length;

  return (
    <div className="font-sans text-neutral-300 min-h-screen pb-20 bg-brand-dark">
      
      {/* HEADER SECTION */}
      <div className="relative w-full border-b border-neutral-800 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-3">
                Panel de Flota
              </h1>
              <p className="text-neutral-400 mt-3 text-sm md:text-base max-w-xl">
                Monitoreo en tiempo real de la flota de carritos a través de todas las ubicaciones activas.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Link href="/admin" className="bg-white text-black hover:bg-neutral-200 transition-colors font-medium text-sm px-5 py-2.5 rounded-md flex items-center gap-2">
                Añadir Vehículo
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        
        {/* TOP METRICS DASHBOARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          
          <div className="bg-[#111111] border border-neutral-800 p-6 rounded-xl hover:border-neutral-600 transition-colors">
            <div className="flex items-center gap-2 text-neutral-400 mb-4 text-sm font-medium">
              <Activity className="w-4 h-4" /> Unidades Activas
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              {activeUnits}
            </div>
            <p className="text-xs text-neutral-500">Operativas actualmente</p>
          </div>

          <div className="bg-[#111111] border border-neutral-800 p-6 rounded-xl hover:border-neutral-600 transition-colors">
             <div className="flex items-center gap-2 text-neutral-400 mb-4 text-sm font-medium">
              <span className="text-brand-secondary text-base">🪙</span> Monedas Recaudadas
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              {totalCoins}
            </div>
            <p className="text-xs text-neutral-500">Estimado en cajas</p>
          </div>

          <div className="bg-[#111111] border border-neutral-800 p-6 rounded-xl hover:border-neutral-600 transition-colors">
             <div className="flex items-center gap-2 text-red-400 mb-4 text-sm font-medium">
              <Wrench className="w-4 h-4" /> En Mantenimiento
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              {maintenanceUnits}
            </div>
            <p className="text-xs text-neutral-500">Requieren atención</p>
          </div>

          <div className="bg-[#111111] border border-neutral-800 p-6 rounded-xl hover:border-neutral-600 transition-colors">
             <div className="flex items-center gap-2 text-neutral-400 mb-4 text-sm font-medium">
              <AlertCircle className="w-4 h-4" /> Alertas del Sistema
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              0
            </div>
            <p className="text-xs text-neutral-500">Sin incidencias graves</p>
          </div>
          
        </div>

        {/* ACTIVE NODES (LOCATIONS) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Centros Comerciales</h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { id: 'milenio-plaza', name: 'Milenio Plaza' },
              { id: 'el-porvenir', name: 'Mi Centro El Porvenir' },
              { id: 'mercurio', name: 'Mercurio' },
              { id: 'el-ensueno', name: 'El Ensueño' },
              { id: 'ventura', name: 'Ventura' }
            ].map((node) => (
              <Link key={node.id} href={`/catalog/${node.id}`} className="block bg-[#111111] border border-neutral-800 rounded-xl p-5 hover:border-neutral-600 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <MapPin className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#50e3c2]"></span>
                </div>
                <div className="text-sm md:text-base text-white font-medium mb-1 truncate">{node.name}</div>
                <div className="text-xs text-neutral-500">Conectado</div>
              </Link>
            ))}
          </div>
        </div>

        {/* RECENT FLEET */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Vehículos Recientes</h2>
            <Link href="/catalog" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              Ver todos &rarr;
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>

      </div>
    </div>
  );
}