'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/mockData';

export function ProductCard({ product }: { product: Product }) {
  const isOperativo = product.status === 'Operativo';
  const shortId = product.id.slice(0, 6).toUpperCase();

  return (
    <div className="group flex flex-col border border-obys-border p-6 hover:bg-black/5 transition-all duration-300 font-sans h-full">
      
      {/* Visual Telemetry */}
      <Link href={`/product/${product.id}`} className="block relative aspect-square bg-obys-bg/50 border border-obys-border mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
        {!isOperativo && (
          <div className="absolute top-4 left-4 z-20 bg-obys-accent text-obys-bg text-xs font-medium uppercase tracking-widest px-3 py-1">
            Mantenimiento
          </div>
        )}
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:scale-105"
        />
      </Link>

      {/* Node Header */}
      <div className="flex items-center justify-between mb-4 border-b border-obys-border pb-4">
        <div className="font-mono text-obys-text/60 text-xs tracking-widest uppercase">
          #{shortId}
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isOperativo ? 'bg-obys-text' : 'bg-obys-accent'}`}></span>
        </div>
      </div>
      
      {/* Node Data */}
      <div className="flex flex-col gap-2 flex-1">
        <Link href={`/product/${product.id}`} className="group-hover:text-obys-accent transition-colors">
          <h3 className="text-2xl font-medium text-obys-text uppercase tracking-tighter leading-none line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 text-sm text-obys-text/60 uppercase font-medium tracking-widest mt-2">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{product.category}</span>
        </div>
        
        <div className="font-medium text-obys-text/80 text-sm uppercase tracking-widest mt-2">
          🪙 {product.coins || 0} USD
        </div>

        <div className="mt-auto pt-6 flex justify-between items-end border-t border-obys-border">
           <span className="text-obys-text text-xl font-medium tracking-tighter">
             ${product.price} <span className="text-sm text-obys-text/50 uppercase tracking-widest">COP</span>
           </span>
           <Link href={`/product/${product.id}`} className="text-obys-text group-hover:text-obys-accent transition-colors">
             <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
           </Link>
        </div>
      </div>
    </div>
  );
}
