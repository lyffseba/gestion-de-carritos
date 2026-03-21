export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl: string;
  isNew?: boolean;
  status?: string;
  coins?: number;
};

// Data based on Kids Rides (Carritos)
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Carrito de Bomberos (Rojo)',
    description: 'Ubicación: Centro Comercial Milenio Plaza. Mantenimiento al día.',
    price: 2000,
    category: 'Milenio Plaza',
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    status: 'Operativo',
    coins: 145,
  },
  {
    id: '2',
    name: 'Tren Safari (Verde)',
    description: 'Ubicación: Gran Plaza El Ensueño. Requiere revisión de monedero.',
    price: 2000,
    category: 'El Ensueño',
    imageUrl: 'https://images.unsplash.com/photo-1549317336-206569e8475c?auto=format&fit=crop&q=80&w=800',
    status: 'Revisión',
    coins: 89,
  },
  {
    id: '3',
    name: 'Caballito Pony (Rosa)',
    description: 'Ubicación: Mercurio Soacha. Mantenimiento reciente.',
    price: 2000,
    category: 'Mercurio',
    imageUrl: 'https://images.unsplash.com/photo-1534068590799-09895a701e61?auto=format&fit=crop&q=80&w=800',
    status: 'Operativo',
    coins: 210,
  },
  {
    id: '4',
    name: 'Moto de Policía (Azul)',
    description: 'Ubicación: Ventura Terreros. Última recolección: hace 2 días.',
    price: 2000,
    category: 'Ventura',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
    status: 'Operativo',
    coins: 45,
  },
  {
    id: '5',
    name: 'Helicóptero Rescate',
    description: 'Ubicación: Milenio Plaza. Llantas cambiadas recientemente.',
    price: 2000,
    category: 'Milenio Plaza',
    imageUrl: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&q=80&w=800',
    status: 'Operativo',
    coins: 180,
  }
];
