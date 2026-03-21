import { connectDB } from '@/db';
import { Product } from '@/db/models/Product';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addProductAction(formData: FormData) {
  'use server';
  
  await connectDB();

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const category = formData.get('category') as string; // Location
  const coins = formData.get('coins') as string;
  
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  await Product.create({
    name,
    description,
    price: Number(price) || 2000,
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    category,
    slug: slug + '-' + Date.now().toString().slice(-4),
    status: 'Operativo',
    coins: Number(coins) || 0,
    isActive: true,
  });

  revalidatePath('/catalog');
  revalidatePath('/');
  
  redirect('/admin?success=true');
}