import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { AddToCartButton } from '@/components/ui/AddToCartButton';
import { ProductGrid } from '@/components/ui/ProductGrid';

// Since we are using mock data, let's pre-generate the static params for fast rendering
export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Find some related products (same category, different ID)
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white">
      {/* Product Section */}
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          
          {/* Image Gallery */}
          <div className="flex flex-col-reverse">
            <div className="aspect-square w-full relative overflow-hidden rounded-lg bg-neutral-100">
              {product.isNew && (
                <div className="absolute left-4 top-4 z-10 rounded bg-accent-500 px-3 py-1.5 text-xs font-bold tracking-wider text-white shadow uppercase">
                  Nuevo
                </div>
              )}
              {product.originalPrice && (
                <div className="absolute right-4 top-4 z-10 rounded bg-red-600 px-3 py-1.5 text-xs font-bold tracking-wider text-white shadow uppercase">
                  Oferta
                </div>
              )}
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover object-center sm:rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              {product.name}
            </h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Información del producto</h2>
              <p className="text-3xl tracking-tight text-neutral-900 font-bold">
                {formatPrice(product.price)}
              </p>
              {product.originalPrice && (
                <p className="mt-1 text-lg text-neutral-500 line-through">
                  Precio anterior: {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Descripción</h3>
              <div className="space-y-6 text-base text-neutral-700">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-md font-medium">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  Disponible para envío a nivel nacional
                </div>
              </div>
            </div>

            <div className="mt-10 flex">
              <AddToCartButton product={product} className="w-full sm:w-auto" />
            </div>

            <div className="mt-8 border-t border-neutral-200 pt-8">
              <h3 className="text-sm font-medium text-neutral-900">Especificaciones Adicionales</h3>
              <div className="mt-4 prose prose-sm text-neutral-500">
                <ul role="list">
                  <li><strong>Categoría:</strong> {product.category}</li>
                  <li><strong>Material:</strong> Materiales de alta calidad garantizados.</li>
                  <li><strong>Garantía:</strong> 1 año por defectos de fábrica.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-neutral-100 bg-neutral-50">
          <ProductGrid title="También te podría interesar" products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
