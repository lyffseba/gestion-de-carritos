'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Activity, Battery, MapPin, AlertCircle, Cpu } from 'lucide-react';
import type { Product } from '@/lib/mockData';

export function ProductCard({ product }: { product: Product }) {
  const isOperativo = product.status === 'Operativo';
  
  // Terminal-style ID generator from object id
  const shortId = product.id.slice(0, 8).toUpperCase();

  return (
    <div className="group flex flex-col bg-brand-grayBg border border-brand-borderGray hover:border-primary-500 transition-all glow-box p-3 font-mono">
      
      {/* Node Header */}
      <div className="flex items-center justify-between mb-3 border-b border-brand-borderGray pb-2">
        <div className="flex items-center gap-2 text-primary-500 text-[10px] font-bold">
          <Cpu className="w-3 h-3" />
          <span>UNIT_{shortId}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-neutral-500">{product.category}</span>
          <span className={`w-2 h-2 rounded-full ${isOperativo ? 'bg-primary-500 status-dot-green animate-pulse' : 'bg-red-500 status-dot-red animate-pulse'}`}></span>
        </div>
      </div>
      
      {/* Visual Telemetry */}
      <Link href={`/product/${product.id}`} className="block relative aspect-video bg-black border border-brand-borderGray mb-3 overflow-hidden group-hover:border-primary-500/50 transition-colors">
        <div className="absolute inset-0 bg-primary-500/10 z-10 mix-blend-overlay"></div>
        {/* HUD Overlay */}
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
          <div className="bg-black/80 backdrop-blur-sm text-primary-500 text-[8px] px-1.5 py-0.5 border border-primary-500/30">
            CAM_01_FEED
          </div>
        </div>
        {!isOperativo && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-red-500/90 text-white text-[10px] font-bold px-3 py-1 animate-pulse border border-red-400">
            WARNING: MAINTENANCE REQ.
          </div>
        )}
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
        />
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC41KSIvPjwvc3ZnPg==')] z-20 opacity-30"></div>
      </Link>

      {/* Node Data */}
      <div className="flex flex-col gap-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-bold text-white group-hover:text-primary-500 transition-colors truncate">
            {product.name.toUpperCase()}
          </h3>
        </Link>
        
        <div className="grid grid-cols-2 gap-2 mt-1 border-t border-brand-borderGray pt-2">
          <div className="flex flex-col">
            <span className="text-[9px] text-neutral-500 mb-0.5">LOCATION</span>
            <span className="text-xs text-neutral-300 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-primary-500" />
              {product.category}
            </span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-[9px] text-neutral-500 mb-0.5">COIN_COUNT</span>
            <span className="text-xs font-bold text-brand-secondary flex items-center gap-1">
              🪙 {product.coins || 0}
            </span>
          </div>
        </div>

        <div className="mt-2 bg-black border border-brand-borderGray p-2 flex justify-between items-center">
           <span className="text-[10px] text-neutral-500 flex items-center gap-1">
             <Activity className="w-3 h-3" /> RATE: ${product.price}
           </span>
           <span className={`text-[10px] font-bold px-1.5 py-0.5 ${isOperativo ? 'bg-primary-500/20 text-primary-500 border border-primary-500/30' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}>
             [{isOperativo ? 'ONLINE' : 'OFFLINE'}]
           </span>
        </div>
      </div>
    </div>
  );
}