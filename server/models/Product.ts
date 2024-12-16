import mongoose from 'mongoose';

export interface IProduct {
  imageUrl?: string;
  name?: string;
  code: string;
  size: string;
  manufacturer: string;
  stock: number;
  badStock: number;
  bookings: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>({
  imageUrl: String,
  name: String,
  code: {
    type: String,
    required: true,
    unique: true,
  },
  size: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  badStock: {
    type: Number,
    default: 0,
  },
  bookings: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export const Product = mongoose.model<IProduct>('Product', productSchema);