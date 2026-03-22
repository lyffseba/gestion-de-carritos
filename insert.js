const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, default: 2000 },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  status: { type: String, default: 'Operativo' },
  coins: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);
  
  await Product.create({
    name: 'Avión / Nave Espacial (Azul) - Lado 1',
    description: 'Actualizado con foto real',
    price: 2000,
    imageUrl: '/images/avion-azul-2.jpg',
    category: 'Milenio Plaza',
    slug: 'avion-azul-lado1-' + Date.now(),
    status: 'Operativo',
    coins: 100
  });

  await Product.create({
    name: 'Avión / Nave Espacial (Azul) - Frente',
    description: 'Actualizado con foto real',
    price: 2000,
    imageUrl: '/images/avion-azul-3.jpg',
    category: 'Milenio Plaza',
    slug: 'avion-azul-frente-' + Date.now(),
    status: 'Operativo',
    coins: 50
  });

  await Product.create({
    name: 'Moto 95 Binary Power (Vista 2)',
    description: 'Actualizado con foto real',
    price: 2000,
    imageUrl: '/images/moto-n95-2.jpg',
    category: 'Milenio Plaza',
    slug: 'moto-n95-v2-' + Date.now(),
    status: 'Operativo',
    coins: 84
  });

  console.log('Inserted');
  process.exit(0);
}

run().catch(console.error);
