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
    id: '6',
    name: 'Rayo McQueen (Rojo)',
    description: 'Ubicación: Mi Centro El Porvenir. Mantenimiento al día.',
    price: 2000,
    category: 'Mi Centro El Porvenir',
    imageUrl: '/images/porvenir-coche.jpg',
    status: 'Operativo',
    coins: 340,
  },
  {
    id: '7',
    name: 'Helicóptero Espacial (Azul)',
    description: 'Ubicación: Mi Centro El Porvenir. En perfecto estado.',
    price: 2000,
    category: 'Mi Centro El Porvenir',
    imageUrl: '/images/porvenir-heli.jpg',
    status: 'Operativo',
    coins: 215,
  },
  {
    id: '1',
    name: 'Carrito de Bomberos (Rojo)',
    description: 'Ubicación: Centro Comercial Milenio Plaza. Mantenimiento al día.',
    price: 2000,
    category: 'Milenio Plaza',
    imageUrl: '/images/bomberos.png',
    status: 'Operativo',
    coins: 145,
  },
  {
    id: '2',
    name: 'Tren Safari (Verde)',
    description: 'Ubicación: Gran Plaza El Ensueño. Requiere revisión de monedero.',
    price: 2000,
    category: 'El Ensueño',
    imageUrl: '/images/tren-safari.png',
    status: 'Revisión',
    coins: 89,
  },
  {
    id: '3',
    name: 'Caballito Pony (Rosa)',
    description: 'Ubicación: Mercurio Soacha. Mantenimiento reciente.',
    price: 2000,
    category: 'Mercurio',
    imageUrl: '/images/pony.png',
    status: 'Operativo',
    coins: 210,
  },
  {
    id: '4',
    name: 'Moto de Policía (Azul)',
    description: 'Ubicación: Ventura Terreros. Última recolección: hace 2 días.',
    price: 2000,
    category: 'Ventura',
    imageUrl: '/images/moto-policia.png',
    status: 'Operativo',
    coins: 45,
  }
];
