'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Activity, MapPin, Car } from 'lucide-react';
import type { Product } from '@/lib/mockData';

export function ProductCard({ product }: { product: Product }) {
  const isOperativo = product.status === 'Operativo';
  
  // Clean short ID
  const shortId = product.id.slice(0, 6).toUpperCase();

  return (
    <div className="group flex flex-col bg-white shadow-sm border border-slate-200 hover:border-slate-300 transition-all rounded-xl p-4 font-sans h-full">
      
      {/* Visual Telemetry */}
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/3] bg-slate-50 rounded-lg border border-slate-200 mb-4 overflow-hidden">
        {!isOperativo && (
          <div className="absolute top-2 left-2 z-20 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
            Mantenimiento
          </div>
        )}
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      {/* Node Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono bg-slate-100 px-2 py-1 rounded">
          <span>#{shortId}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isOperativo ? 'bg-[#50e3c2]' : 'bg-[#f5a623]'}`}></span>
        </div>
      </div>
      
      {/* Node Data */}
      <div className="flex flex-col gap-1 flex-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{product.category}</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-xs text-brand-secondary font-medium mt-1">
          🪙 {product.coins || 0} Monedas detectadas
        </div>

        <div className="mt-auto pt-4 flex justify-between items-center text-sm border-t border-slate-200">
           <span className="text-slate-900 font-medium">
             ${product.price} COP
           </span>
           <span className={`text-xs font-medium px-2 py-1 rounded-md ${isOperativo ? 'bg-[#50e3c2]/10 text-[#50e3c2]' : 'bg-[#f5a623]/10 text-[#f5a623]'}`}>
             {isOperativo ? 'Operativo' : 'En revisión'}
           </span>
        </div>
      </div>
    </div>
  );
}