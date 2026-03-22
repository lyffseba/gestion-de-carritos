import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { AlertTriangle, MapPin, Activity, CheckCircle } from 'lucide-react';
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
    <div className="font-sans min-h-screen bg-obys-bg text-obys-text">
      
      {/* Node Header */}
      <div className="border-b border-obys-border pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-[90%] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="font-mono text-obys-text/60 text-sm tracking-widest uppercase mb-4">
              ID #{shortId}
            </div>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase leading-none text-obys-text">
              {node.name}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${isOperativo ? 'bg-obys-text' : 'bg-obys-accent'}`}></span>
            <span className="text-sm font-medium uppercase tracking-widest">
              {node.status || 'Desconocido'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[90%] mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Feed Display (Image) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square w-full border border-obys-border bg-obys-bg/50">
              <Image
                src={node.imageUrl}
                alt={node.name}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Node Diagnostics */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="border-b border-obys-border pb-8 mb-8">
              <h2 className="text-xl font-medium uppercase tracking-widest text-obys-text/60 mb-2">Ubicación</h2>
              <p className="text-2xl md:text-3xl font-medium tracking-tighter uppercase text-obys-text flex items-center gap-3">
                <MapPin className="w-6 h-6" /> {node.category}
              </p>
            </div>

            <div className="grid grid-cols-2 border-b border-obys-border mb-8">
              <div className="border-r border-obys-border pr-8 pb-8">
                <p className="text-xs text-obys-text/60 mb-4 font-medium uppercase tracking-widest">
                  Monedas
                </p>
                <p className="text-4xl md:text-5xl font-medium tracking-tighter text-obys-text">
                  {node.coins || 0}
                </p>
              </div>
              <div className="pl-8 pb-8">
                <p className="text-xs text-obys-text/60 mb-4 font-medium uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Tarifa
                </p>
                <p className="text-4xl md:text-5xl font-medium tracking-tighter text-obys-text">
                  ${node.price}
                </p>
              </div>
            </div>

            <div className="mb-12">
              <p className="text-xs text-obys-text/60 mb-4 font-medium uppercase tracking-widest">Detalles:</p>
              <p className="text-lg font-medium leading-relaxed text-obys-text">
                {node.description}
              </p>
            </div>

            <div className="mt-auto">
              <button className={`w-full py-5 border text-sm font-medium uppercase tracking-widest flex justify-center items-center gap-3 transition-colors ${
                isOperativo 
                  ? 'border-obys-border hover:bg-obys-text hover:text-obys-bg'
                  : 'bg-obys-accent text-obys-bg border-obys-accent hover:bg-obys-text hover:text-obys-bg hover:border-obys-text'
              }`}>
                {isOperativo ? <><CheckCircle className="w-5 h-5"/> Inspección Visual</> : <><AlertTriangle className="w-5 h-5"/> Mantenimiento</>}
              </button>
            </div>
            
            <div className="mt-6 text-xs font-mono text-obys-text/40 tracking-widest uppercase">
              Actualizado: {new Date().toISOString().split('T')[0]}
            </div>
          </div>
        </div>
      </div>

      {/* Related Nodes */}
      {relatedNodes.length > 0 && (
        <div className="border-t border-obys-border">
          <div className="max-w-[90%] mx-auto py-24">
            <ProductGrid title="Más vehículos en esta ubicación" products={relatedNodes} />
          </div>
        </div>
      )}
    </div>
  );
}
