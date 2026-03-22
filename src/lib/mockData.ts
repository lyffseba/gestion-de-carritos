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
    id: '12',
    name: 'Avión Espacial (Azul/Blanco)',
    description: 'Ubicación: Milenio Plaza. Lado derecho.',
    price: 2000,
    category: 'Milenio Plaza',
    imageUrl: '/renders/helicoptero.png',
    status: 'Operativo',
    coins: 100,
  },
  {
    id: '13',
    name: 'Avión Espacial (Azul/Blanco) - Frente',
    description: 'Ubicación: Milenio Plaza. Vista frontal.',
    price: 2000,
    category: 'Milenio Plaza',
    imageUrl: '/renders/helicoptero.png',
    status: 'Operativo',
    coins: 50,
  },
  {
    id: '14',
    name: 'Moto 95 Binary Power (Azul/Amarillo)',
    description: 'Ubicación: Milenio Plaza. Vista superior.',
    price: 2000,
    category: 'Milenio Plaza',
    imageUrl: '/renders/chopper.png',
    status: 'Operativo',
    coins: 230,
  },
  {
    id: '10',
    name: 'Rayo McQueen (Rojo) #1',
    description: 'Ubicación: Mercurio Soacha. Mantenimiento al día.',
    price: 2000,
    category: 'Mercurio',
    imageUrl: '/renders/mcqueen.png',
    status: 'Operativo',
    coins: 180,
  },
  {
    id: '11',
    name: 'Rayo McQueen (Rojo) #2',
    description: 'Ubicación: Mercurio Soacha. Pequeños detalles de pintura, operativo.',
    price: 2000,
    category: 'Mercurio',
    imageUrl: '/renders/mcqueen.png',
    status: 'Operativo',
    coins: 165,
  },
  {
    id: '8',
    name: 'Jeep Safari (Verde)',
    description: 'Ubicación: Mercurio Soacha. Operativo y funcionando bien.',
    price: 2000,
    category: 'Mercurio',
    imageUrl: '/renders/jeep.png',
    status: 'Operativo',
    coins: 450,
  },
  {
    id: '9',
    name: 'Moto Chopper (Negra con Llamas)',
    description: 'Ubicación: Mercurio Soacha. Mantenimiento al día.',
    price: 2000,
    category: 'Mercurio',
    imageUrl: '/renders/chopper.png',
    status: 'Operativo',
    coins: 290,
  },
  {
    id: '6',
    name: 'Rayo McQueen (Rojo)',
    description: 'Ubicación: Mi Centro El Porvenir. Mantenimiento al día.',
    price: 2000,
    category: 'Mi Centro El Porvenir',
    imageUrl: '/renders/mcqueen.png',
    status: 'Operativo',
    coins: 340,
  },
  {
    id: '7',
    name: 'Helicóptero Espacial (Azul)',
    description: 'Ubicación: Mi Centro El Porvenir. En perfecto estado.',
    price: 2000,
    category: 'Mi Centro El Porvenir',
    imageUrl: '/renders/helicoptero.png',
    status: 'Operativo',
    coins: 215,
  },
  {
    id: '1',
    name: 'Carrito de Bomberos (Rojo)',
    description: 'Ubicación: Centro Comercial Milenio Plaza. Mantenimiento al día.',
    price: 2000,
    category: 'Milenio Plaza',
    imageUrl: '/renders/mcqueen.png',
    status: 'Operativo',
    coins: 145,
  },
  {
    id: '3',
    name: 'Caballito Pony (Rosa)',
    description: 'Ubicación: Mercurio Soacha. Mantenimiento reciente.',
    price: 2000,
    category: 'Mercurio',
    imageUrl: '/renders/pony.png',
    status: 'Operativo',
    coins: 210,
  }
];
