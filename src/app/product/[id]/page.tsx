import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { AlertTriangle, MapPin, Activity, CheckCircle, Car } from 'lucide-react';
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
  const shortId = node.id.slice(0, 6).toUpperCase();

  return (
    <div className="font-sans text-slate-700 min-h-screen pb-20 bg-white">
      
      {/* Node Header */}
      <div className="border-b border-slate-200 bg-slate-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-lg border border-slate-200">
              <Car className="text-slate-900 w-5 h-5" />
            </div>
            <h1 className="text-slate-900 font-bold tracking-tight text-xl md:text-2xl">
              Unidad #{shortId}
            </h1>
          </div>
          <div className="text-sm font-medium flex items-center gap-2">
            Estado: <span className={`px-2 py-1 rounded-md ${isOperativo ? 'text-[#50e3c2] bg-[#50e3c2]/10' : 'text-[#f5a623] bg-[#f5a623]/10'}`}>
              {node.status || 'Desconocido'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Feed Display (Image) */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border border-slate-200 rounded-2xl group">
            <Image
              src={node.imageUrl}
              alt={node.name}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>

          {/* Node Diagnostics */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">{node.name}</h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500" /> Ubicación: {node.category}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white shadow-sm border border-slate-200 p-5 rounded-xl">
                <p className="text-xs text-slate-400 mb-2 font-medium">
                  CAJA DE MONEDAS
                </p>
                <p className="text-3xl font-bold text-brand-secondary">
                  🪙 {node.coins || 0}
                </p>
              </div>
              <div className="bg-white shadow-sm border border-slate-200 p-5 rounded-xl">
                <p className="text-xs text-slate-400 mb-2 font-medium flex items-center gap-1">
                  <Activity className="w-3 h-3" /> TARIFA (COP)
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  ${node.price}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-sm">
              <p className="text-slate-500 mb-2 font-medium">Notas y detalles:</p>
              <p className="text-slate-700 leading-relaxed">
                {node.description}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button className={`w-full py-3 rounded-xl border text-sm font-medium flex justify-center items-center gap-2 transition-colors ${
                isOperativo 
                  ? 'bg-[#50e3c2]/10 border-[#50e3c2]/30 text-[#50e3c2] hover:bg-[#50e3c2] hover:text-black'
                  : 'bg-[#f5a623]/10 border-[#f5a623]/30 text-[#f5a623] hover:bg-[#f5a623] hover:text-black'
              }`}>
                {isOperativo ? <><CheckCircle className="w-4 h-4"/> Confirmar Inspección Visual</> : <><AlertTriangle className="w-4 h-4"/> Reportar Mantenimiento</>}
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-400 flex flex-col gap-1.5">
              <p>Última actualización: {new Date().toISOString().split('T')[0]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Nodes */}
      {relatedNodes.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-8 border-t border-slate-200">
          <ProductGrid title="Más vehículos en esta ubicación" products={relatedNodes} />
        </div>
      )}
    </div>
  );
}