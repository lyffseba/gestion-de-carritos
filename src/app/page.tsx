import Link from 'next/link';
import { Activity, BatteryCharging, AlertTriangle, ShieldCheck, Cpu, Terminal, MapPin } from 'lucide-react';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4); 
  
  const totalCoins = MOCK_PRODUCTS.reduce((acc, p) => acc + (p.coins || 0), 0);
  const activeUnits = MOCK_PRODUCTS.filter(p => p.status === 'Operativo').length;
  const maintenanceUnits = MOCK_PRODUCTS.filter(p => p.status !== 'Operativo').length;

  return (
    <div className="font-mono text-neutral-300 min-h-screen pb-20">
      
      {/* COMMAND CENTER HEADER */}
      <div className="relative w-full border-b border-brand-borderGray bg-brand-grayBg/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-widest flex items-center gap-3">
                <Terminal className="w-8 h-8 text-primary-500" />
                OVERVIEW
              </h1>
              <p className="text-neutral-500 mt-2 text-sm max-w-xl">
                Real-time fleet monitoring and control center. System is currently routing data from 4 active locations.
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-brand-dark border border-primary-500/30 glow-box rounded-sm px-4 py-3 text-center">
                <div className="text-[10px] text-primary-500 mb-1">NETWORK_STATUS</div>
                <div className="text-white font-bold text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                  SECURE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        
        {/* TOP METRICS DASHBOARD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          
          <div className="bg-brand-grayBg border border-brand-borderGray p-5 rounded-sm relative overflow-hidden group hover:border-primary-500/50 transition-colors">
            <div className="absolute -right-4 -top-4 text-neutral-800 opacity-20 group-hover:text-primary-500/10 transition-colors">
              <Cpu className="w-24 h-24" />
            </div>
            <div className="text-[10px] text-neutral-500 mb-2">ACTIVE_UNITS</div>
            <div className="text-3xl font-bold text-white flex items-end gap-2">
              {activeUnits} <span className="text-sm text-primary-500 mb-1">ONLINE</span>
            </div>
          </div>

          <div className="bg-brand-grayBg border border-brand-borderGray p-5 rounded-sm relative overflow-hidden group hover:border-brand-secondary/50 transition-colors">
             <div className="absolute -right-4 -top-4 text-neutral-800 opacity-20 group-hover:text-brand-secondary/10 transition-colors">
              <BatteryCharging className="w-24 h-24" />
            </div>
            <div className="text-[10px] text-neutral-500 mb-2">TOTAL_COINS_DETECTED</div>
            <div className="text-3xl font-bold text-white flex items-end gap-2 glow-text">
              {totalCoins} <span className="text-sm text-brand-secondary mb-1">🪙</span>
            </div>
          </div>

          <div className="bg-brand-grayBg border border-brand-borderGray p-5 rounded-sm relative overflow-hidden group hover:border-red-500/50 transition-colors">
             <div className="absolute -right-4 -top-4 text-neutral-800 opacity-20 group-hover:text-red-500/10 transition-colors">
              <AlertTriangle className="w-24 h-24" />
            </div>
            <div className="text-[10px] text-neutral-500 mb-2">MAINTENANCE_REQ</div>
            <div className="text-3xl font-bold text-white flex items-end gap-2">
              {maintenanceUnits} <span className="text-sm text-red-500 mb-1">WARNINGS</span>
            </div>
          </div>

          <div className="bg-brand-grayBg border border-brand-borderGray p-5 rounded-sm relative overflow-hidden group hover:border-primary-500/50 transition-colors">
             <div className="absolute -right-4 -top-4 text-neutral-800 opacity-20 group-hover:text-primary-500/10 transition-colors">
              <ShieldCheck className="w-24 h-24" />
            </div>
            <div className="text-[10px] text-neutral-500 mb-2">SYSTEM_HEALTH</div>
            <div className="text-3xl font-bold text-primary-500 flex items-end gap-2">
              98% <span className="text-sm text-neutral-500 mb-1">NOMINAL</span>
            </div>
          </div>
          
        </div>

        {/* ACTIVE NODES (LOCATIONS) */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6 border-b border-brand-borderGray pb-4">
            <Activity className="text-primary-500 w-5 h-5" />
            <h2 className="text-xl font-bold text-white tracking-widest">ACTIVE_NODES</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['MILENIO_PLAZA', 'MERCURIO', 'EL_PORVENIR', 'EL_ENSUENO', 'VENTURA'].map((node) => (
              <Link key={node} href={`/catalog/${node.toLowerCase()}`} className="block border border-brand-borderGray bg-brand-grayBg p-4 hover:border-primary-500 transition-all glow-box group">
                <div className="flex justify-between items-start mb-4">
                  <MapPin className="w-5 h-5 text-neutral-500 group-hover:text-primary-500 transition-colors" />
                  <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse status-dot-green"></span>
                </div>
                <div className="text-sm text-white font-bold mb-1">{node}</div>
                <div className="text-[10px] text-primary-500">STATUS: SYNCED</div>
              </Link>
            ))}
          </div>
        </div>

        {/* FLEET TELEMETRY */}
        <div>
          <div className="flex justify-between items-center mb-6 border-b border-brand-borderGray pb-4">
            <div className="flex items-center gap-3">
              <Terminal className="text-primary-500 w-5 h-5" />
              <h2 className="text-xl font-bold text-white tracking-widest">FLEET_TELEMETRY</h2>
            </div>
            <Link href="/catalog" className="text-xs text-primary-500 hover:text-white transition-colors flex items-center gap-1">
              [VIEW_ALL_DATA]
            </Link>
          </div>
          
          <ProductGrid title="" products={featuredProducts} />
        </div>

      </div>
    </div>
  );
}