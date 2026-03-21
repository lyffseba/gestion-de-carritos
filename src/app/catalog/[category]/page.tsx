import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { Terminal, Filter, RefreshCw, Cpu, CheckCircle } from 'lucide-react';

const normalize = (str: string) => 
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function generateStaticParams() {
  const categories = Array.from(new Set(MOCK_PRODUCTS.map((p) => normalize(p.category))));
  return [...categories.map((c) => ({ category: c })), { category: 'mantenimiento' }, { category: 'recolecciones' }, { category: 'el-ensueno' }, { category: 'milenio-plaza' }, { category: 'mercurio' }, { category: 'ventura' }];
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const normalizedCategory = normalize(decodedCategory);
  
  let filteredNodes = [];
  let sectorName = decodedCategory.replace(/-/g, '_').toUpperCase();

  if (normalizedCategory === 'mantenimiento') {
    filteredNodes = MOCK_PRODUCTS.filter((p) => p.status !== 'Operativo');
    sectorName = 'MAINTENANCE_BAY';
  } else if (normalizedCategory === 'recolecciones') {
    filteredNodes = MOCK_PRODUCTS.filter((p) => (p.coins || 0) > 100);
    sectorName = 'HIGH_COIN_NODES';
  } else if (['milenio-plaza', 'el-ensueno', 'mercurio', 'ventura'].includes(normalizedCategory)) {
    const formattedCategoryMap: Record<string, string> = {
      'milenio-plaza': 'Milenio Plaza',
      'el-ensueno': 'El Ensueño',
      'mercurio': 'Mercurio',
      'ventura': 'Ventura'
    };
    const exactName = formattedCategoryMap[normalizedCategory];
    filteredNodes = MOCK_PRODUCTS.filter((p) => p.category === exactName);
  } else {
    filteredNodes = MOCK_PRODUCTS.filter(
      (p) => normalize(p.category) === normalizedCategory
    );
  }

  if (filteredNodes.length === 0 && !['mantenimiento', 'recolecciones', 'el-ensueno', 'milenio-plaza', 'mercurio', 'ventura'].includes(normalizedCategory)) {
    notFound();
  }

  const isWarningSector = normalizedCategory === 'mantenimiento';
  const isCoinSector = normalizedCategory === 'recolecciones';
  const sectorColor = isWarningSector ? 'text-red-500 border-red-500' : isCoinSector ? 'text-brand-secondary border-brand-secondary' : 'text-primary-500 border-primary-500';

  return (
    <div className="font-mono text-neutral-300 min-h-screen pb-20 bg-brand-dark">
      {/* Sector Console Header */}
      <div className="border-b border-brand-borderGray sticky top-16 md:top-20 bg-brand-grayBg/90 backdrop-blur-md z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center text-xs md:text-sm gap-4">
          
          <div className="flex items-center gap-3">
            <Terminal className={`w-5 h-5 ${sectorColor.split(' ')[0]}`} />
            <div>
              <h1 className="text-white font-bold tracking-widest flex items-center gap-2">
                SECTOR: <span className={sectorColor.split(' ')[0]}>{sectorName}</span>
              </h1>
              <p className="text-neutral-500 text-[10px] mt-1 flex items-center gap-2">
                NODES_DETECTED: {filteredNodes.length}
                <span className={`px-2 py-0.5 rounded-sm border bg-black/50 ${sectorColor.replace('text-', 'border-').replace('text-', 'text-')}`}>
                  {isWarningSector ? 'SYS_WARNING' : 'STABLE_CONNECTION'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6 overflow-x-auto whitespace-nowrap w-full md:w-auto items-center text-[10px]" style={{ scrollbarWidth: 'none' }}>
            <span className={`flex items-center gap-1 cursor-pointer hover:text-white transition-colors border px-2 py-1 bg-black/50 ${sectorColor}`}>
              <Filter className="w-3 h-3" /> ACTIVE_FILTERS
            </span>
            <span className="text-neutral-500 cursor-pointer hover:text-primary-500 transition-colors flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> SYNC_NODES
            </span>
          </div>
        </div>
      </div>
      
      {/* Sector Telemetry Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
        {filteredNodes.length > 0 ? (
          <ProductGrid products={filteredNodes} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-brand-borderGray bg-brand-grayBg/50 mt-10 rounded-sm">
            <CheckCircle className="w-12 h-12 text-primary-500/50 mb-4" />
            <h3 className="text-sm font-bold text-primary-500 tracking-widest">NO_NODES_FOUND_IN_SECTOR</h3>
            <p className="text-neutral-500 text-[10px] mt-2 font-mono">ALL SYSTEMS OPERATIONAL OR SECTOR EMPTY.</p>
          </div>
        )}
      </div>
    </div>
  );
}