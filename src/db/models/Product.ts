import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string; // The location like "Milenio Plaza"
  imageUrl: string;
  status: string; // "Operativo" | "Mantenimiento"
  coins: number;
  isActive: boolean;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: { type: String, default: 'Operativo' },
  coins: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Avoid OverwriteModelError in Next.js development hot-reloading
export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
