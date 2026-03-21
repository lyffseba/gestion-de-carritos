'use client';

import { useCartStore } from '@/store/cartStore';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { Button } from './Button';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    let text = `¡Hola! Me gustaría hacer el siguiente pedido en Kids Rides Management:%0A%0A`;
    items.forEach((item) => {
      text += `- ${item.quantity}x ${item.name} (${formatPrice(item.price)})%0A`;
    });
    text += `%0A*Total Estimado: ${formatPrice(getTotalPrice())}*`;

    // Kids Rides Restrepo main WhatsApp number
    const whatsappNumber = '573112774673';
    const url = `https://wa.me/${whatsappNumber}?text=${text}`;
    
    window.open(url, '_blank');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/50 transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-neutral-900">Tu Carrito</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-500 space-y-4">
              <p>Tu carrito está vacío.</p>
              <Button onClick={() => setIsOpen(false)}>Volver a la tienda</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between text-sm font-medium text-neutral-900">
                    <h3 className="line-clamp-2 pr-4">{item.name}</h3>
                    <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  
                  <div className="flex flex-1 items-end justify-between text-sm mt-2">
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-neutral-100 text-neutral-600"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-neutral-100 text-neutral-600"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 bg-neutral-50">
            <div className="flex justify-between text-base font-medium text-neutral-900 mb-4">
              <p>Subtotal</p>
              <p>{formatPrice(getTotalPrice())}</p>
            </div>
            <p className="text-sm text-neutral-500 mb-4">
              Los envíos se coordinan directamente con nuestro asesor por WhatsApp.
            </p>
            <Button 
              variant="accent" 
              className="w-full text-base py-6"
              onClick={handleCheckout}
            >
              Comprar por WhatsApp
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
