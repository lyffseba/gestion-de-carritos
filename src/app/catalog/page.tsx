import { MOCK_PRODUCTS } from '@/lib/mockData';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { Terminal, Activity, Filter, RefreshCw } from 'lucide-react';

export default function CatalogPage() {
  const activeNodes = MOCK_PRODUCTS.filter(p => p.status === 'Operativo').length;
  
  return (
    <div className="font-mono text-neutral-300 min-h-screen pb-20 bg-brand-dark">
      {/* Console Header */}
      <div className="border-b border-brand-borderGray sticky top-16 md:top-20 bg-brand-grayBg/90 backdrop-blur-md z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center text-xs md:text-sm gap-4">
          
          <div className="flex items-center gap-3">
            <Terminal className="text-primary-500 w-5 h-5" />
            <div>
              <h1 className="text-white font-bold tracking-widest flex items-center gap-2">
                FLEET_CONSOLE
                <span className="bg-primary-500/10 text-primary-500 px-2 py-0.5 rounded-sm border border-primary-500/30 text-[10px]">LIVE</span>
              </h1>
              <p className="text-neutral-500 text-[10px] mt-1">TOTAL_NODES: {MOCK_PRODUCTS.length} | ACTIVE: {activeNodes}</p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6 overflow-x-auto whitespace-nowrap w-full md:w-auto items-center text-[10px]" style={{ scrollbarWidth: 'none' }}>
            <span className="flex items-center gap-1 text-primary-500 cursor-pointer hover:text-white transition-colors border border-primary-500 px-2 py-1 bg-primary-500/10">
              <Filter className="w-3 h-3" /> FILTER_ALL
            </span>
            <span className="text-neutral-500 cursor-pointer hover:text-primary-500 transition-colors flex items-center gap-1">
              <Activity className="w-3 h-3" /> SORT_BY_BATTERY
            </span>
            <span className="text-brand-secondary cursor-pointer hover:text-white transition-colors flex items-center gap-1 font-bold">
              🪙 SORT_BY_COINS
            </span>
            <span className="text-neutral-500 cursor-pointer hover:text-primary-500 transition-colors flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> PING_NODES
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
        <ProductGrid products={MOCK_PRODUCTS} title="ALL_ACTIVE_SECTORS" />
      </div>
    </div>
  );
}