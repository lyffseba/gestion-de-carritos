import Link from 'next/link';
import { Activity, MapPin, AlertCircle, Wrench, ArrowRight } from 'lucide-react';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4); 
  
  const totalCoins = MOCK_PRODUCTS.reduce((acc, p) => acc + (p.coins || 0), 0);
  const activeUnits = MOCK_PRODUCTS.filter(p => p.status === 'Operativo').length;
  const maintenanceUnits = MOCK_PRODUCTS.filter(p => p.status !== 'Operativo').length;

  return (
    <div className="font-sans min-h-screen bg-obys-bg text-obys-text selection:bg-obys-text selection:text-obys-bg">
      
      {/* HEADER SECTION - OBYS STYLE */}
      <div className="relative w-full border-b border-obys-border pt-16 pb-24 md:pt-32 md:pb-40">
        <div className="max-w-[90%] mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-8xl font-medium tracking-tighter uppercase leading-[0.85] mb-8 text-obys-text">
                Gestión<br />
                <span className="text-obys-accent">Flota</span>
              </h1>
              <p className="text-obys-text/70 mt-3 text-lg md:text-2xl font-medium leading-snug max-w-2xl">
                Monitoreo en tiempo real de la flota de carritos a través de todas las ubicaciones activas.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Link href="/admin" className="group flex items-center gap-4 text-obys-text font-medium text-lg uppercase tracking-tight border border-obys-border px-8 py-4 rounded-full hover:bg-obys-text hover:text-obys-bg transition-all duration-300">
                Añadir Vehículo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[90%] mx-auto py-24">
        
        {/* TOP METRICS DASHBOARD - OBYS STYLE (MINIMALIST GRIDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-l border-obys-border mb-32">
          
          <div className="border-r border-b border-obys-border p-8 hover:bg-black/5 transition-colors group">
            <div className="flex items-center gap-3 text-obys-text/60 mb-12 text-sm font-medium uppercase tracking-widest">
              <Activity className="w-4 h-4" /> Unidades Activas
            </div>
            <div className="text-6xl md:text-7xl font-medium tracking-tighter text-obys-text mb-2 group-hover:text-obys-accent transition-colors">
              {activeUnits}
            </div>
            <p className="text-sm font-medium text-obys-text/50">Operativas actualmente</p>
          </div>

          <div className="border-r border-b border-obys-border p-8 hover:bg-black/5 transition-colors group">
             <div className="flex items-center gap-3 text-obys-text/60 mb-12 text-sm font-medium uppercase tracking-widest">
              <span>🪙</span> Recaudo
            </div>
            <div className="text-6xl md:text-7xl font-medium tracking-tighter text-obys-text mb-2 group-hover:text-obys-accent transition-colors">
              {totalCoins}
            </div>
            <p className="text-sm font-medium text-obys-text/50">Monedas en cajas</p>
          </div>

          <div className="border-r border-b border-obys-border p-8 hover:bg-black/5 transition-colors group">
             <div className="flex items-center gap-3 text-obys-accent mb-12 text-sm font-medium uppercase tracking-widest">
              <Wrench className="w-4 h-4" /> Mantenimiento
            </div>
            <div className="text-6xl md:text-7xl font-medium tracking-tighter text-obys-text mb-2 group-hover:text-obys-accent transition-colors">
              {maintenanceUnits}
            </div>
            <p className="text-sm font-medium text-obys-text/50">Requieren atención</p>
          </div>

          <div className="border-r border-b border-obys-border p-8 hover:bg-black/5 transition-colors group">
             <div className="flex items-center gap-3 text-obys-text/60 mb-12 text-sm font-medium uppercase tracking-widest">
              <AlertCircle className="w-4 h-4" /> Alertas
            </div>
            <div className="text-6xl md:text-7xl font-medium tracking-tighter text-obys-text mb-2 group-hover:text-obys-accent transition-colors">
              0
            </div>
            <p className="text-sm font-medium text-obys-text/50">Sistema estable</p>
          </div>
          
        </div>

        {/* ACTIVE NODES (LOCATIONS) */}
        <div className="mb-32">
          <div className="flex items-center justify-between mb-12 border-b border-obys-border pb-6">
            <h2 className="text-2xl md:text-4xl font-medium uppercase tracking-tighter text-obys-text">Ubicaciones</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { id: 'milenio-plaza', name: 'Milenio Plaza' },
              { id: 'el-porvenir', name: 'Mi Centro El Porvenir' },
              { id: 'mercurio', name: 'Mercurio' },
              { id: 'el-ensueno', name: 'El Ensueño' },
              { id: 'ventura', name: 'Ventura' }
            ].map((node, i) => (
              <Link key={node.id} href={`/catalog/${node.id}`} className="group block border border-obys-border p-8 hover:bg-obys-text transition-all duration-300">
                <div className="flex justify-between items-start mb-16">
                  <span className="text-xs font-mono text-obys-text/50 group-hover:text-obys-bg/50">0{i+1}</span>
                  <div className="w-2 h-2 rounded-full bg-obys-text group-hover:bg-obys-bg"></div>
                </div>
                <div className="text-xl md:text-2xl font-medium uppercase tracking-tight text-obys-text group-hover:text-obys-bg mb-2 break-words">{node.name}</div>
                <div className="flex items-center gap-2 text-sm font-medium text-obys-text/50 group-hover:text-obys-bg/70 uppercase">
                  <MapPin className="w-4 h-4" /> Conectado
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RECENT FLEET */}
        <div>
          <div className="flex items-center justify-between mb-12 border-b border-obys-border pb-6">
            <h2 className="text-2xl md:text-4xl font-medium uppercase tracking-tighter text-obys-text">Vehículos Recientes</h2>
            <Link href="/catalog" className="group flex items-center gap-2 text-sm md:text-base font-medium uppercase tracking-widest text-obys-text hover:text-obys-accent transition-colors">
              Ver todos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>

      </div>
    </div>
  );
}
