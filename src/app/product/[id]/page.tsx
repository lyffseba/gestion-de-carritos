import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Terminal, BatteryCharging, AlertTriangle, Cpu, MapPin, Activity, CheckCircle } from 'lucide-react';
import { ProductGrid } from '@/components/ui/ProductGrid';

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function NodeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const node = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!node) {
    notFound();
  }

  const relatedNodes = MOCK_PRODUCTS.filter(
    (p) => p.category === node.category && p.id !== node.id
  ).slice(0, 4);

  const isOperativo = node.status === 'Operativo';
  const shortId = node.id.slice(0, 8).toUpperCase();

  return (
    <div className="font-mono text-neutral-300 min-h-screen pb-20 bg-brand-dark">
      
      {/* Node Header */}
      <div className="border-b border-brand-borderGray bg-brand-grayBg/90 backdrop-blur-md z-40 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Cpu className="text-primary-500 w-6 h-6" />
            <h1 className="text-white font-bold tracking-widest text-lg md:text-xl">
              NODE_ID: {shortId}
            </h1>
          </div>
          <div className="text-[10px] text-neutral-500 flex items-center gap-2">
            STATUS: <span className={`px-2 py-0.5 border font-bold ${isOperativo ? 'text-primary-500 border-primary-500/30 bg-primary-500/10' : 'text-red-500 border-red-500/30 bg-red-500/10'}`}>
              [{node.status?.toUpperCase() || 'UNKNOWN'}]
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Feed Display (Image) */}
          <div className="relative aspect-video w-full overflow-hidden bg-black border border-brand-borderGray glow-box group">
            <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-sm border border-brand-borderGray px-2 py-1 flex flex-col gap-1 text-[10px] text-primary-500">
              <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> CAM_01_FEED</span>
              <span>REC // <span className="text-red-500 animate-pulse">●</span></span>
            </div>
            
            <div className="absolute inset-0 bg-primary-500/5 mix-blend-overlay z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC41KSIvPjwvc3ZnPg==')] opacity-20 z-10 pointer-events-none"></div>
            
            <Image
              src={node.imageUrl}
              alt={node.name}
              fill
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 opacity-80"
              priority
            />
          </div>

          {/* Node Diagnostics */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-widest mb-1">{node.name.toUpperCase()}</h2>
              <p className="text-xs text-neutral-500 flex items-center gap-2">
                <MapPin className="w-3 h-3 text-primary-500" /> SECTOR: {node.category}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-grayBg border border-brand-borderGray p-4">
                <p className="text-[10px] text-neutral-500 mb-1 flex items-center gap-1">
                  <BatteryCharging className="w-3 h-3" /> COIN_VAULT
                </p>
                <p className="text-2xl font-bold text-brand-secondary">
                  🪙 {node.coins || 0}
                </p>
              </div>
              <div className="bg-brand-grayBg border border-brand-borderGray p-4">
                <p className="text-[10px] text-neutral-500 mb-1 flex items-center gap-1">
                  <Activity className="w-3 h-3" /> RATE_COP
                </p>
                <p className="text-2xl font-bold text-white">
                  ${node.price}
                </p>
              </div>
            </div>

            <div className="bg-black border border-brand-borderGray p-4 text-sm">
              <p className="text-primary-500 mb-2 font-bold text-[10px]">DIAGNOSTIC_LOG:</p>
              <p className="text-neutral-400 border-l-2 border-primary-500/50 pl-3 py-1">
                {node.description}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button className={`w-full py-3 border text-sm font-bold tracking-widest flex justify-center items-center gap-2 ${
                isOperativo 
                  ? 'bg-primary-500/10 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-black'
                  : 'bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
              } transition-colors`}>
                {isOperativo ? <><CheckCircle className="w-4 h-4"/> ACKNOWLEDGE_LOG</> : <><AlertTriangle className="w-4 h-4"/> INITIATE_MAINTENANCE_TICKET</>}
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-brand-borderGray text-[10px] text-neutral-500 flex flex-col gap-1">
              <p>FIRMWARE_VERSION: v2.4.1-stable</p>
              <p>LAST_PING: {new Date().toISOString()}</p>
              <p>UPLINK_BANDWIDTH: 1.2Mbps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Nodes */}
      {relatedNodes.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-8 border-t border-brand-borderGray bg-brand-grayBg/30">
          <ProductGrid title="SECTOR_ADJACENT_NODES" products={relatedNodes} />
        </div>
      )}
    </div>
  );
}