import { MOCK_PRODUCTS } from '@/lib/mockData';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addProductAction(formData: FormData) {
  'use server';

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const category = formData.get('category') as string;
  const coins = formData.get('coins') as string;
  
  MOCK_PRODUCTS.unshift({
    id: Date.now().toString(),
    name,
    description,
    price: Number(price) || 2000,
    imageUrl: imageUrl || '/images/bomberos.png',
    category,
    status: 'Operativo',
    coins: Number(coins) || 0,
  });

  revalidatePath('/catalog');
  revalidatePath('/');
  revalidatePath('/admin');
  
  redirect('/admin?success=true');
}
