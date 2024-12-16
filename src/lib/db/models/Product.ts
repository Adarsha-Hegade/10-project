import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  imageUrl?: string;
  name?: string;
  code: string;
  size: string;
  manufacturer: string;
  stock: number;
  badStock: number;
  bookings: number;
  availableStock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  imageUrl: String,
  name: String,
  code: {
    type: String,
    required: [true, 'Product code is required'],
    unique: true,
    trim: true,
    index: true,
  },
  size: {
    type: String,
    required: [true, 'Size is required'],
    trim: true,
  },
  manufacturer: {
    type: String,
    required: [true, 'Manufacturer is required'],
    trim: true,
    index: true,
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0,
  },
  badStock: {
    type: Number,
    required: [true, 'Bad stock quantity is required'],
    min: [0, 'Bad stock cannot be negative'],
    default: 0,
  },
  bookings: {
    type: Number,
    required: [true, 'Bookings quantity is required'],
    min: [0, 'Bookings cannot be negative'],
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual field for available stock
productSchema.virtual('availableStock').get(function() {
  return this.stock - this.badStock - this.bookings;
});

// Compound index for efficient querying
productSchema.index({ manufacturer: 1, code: 1 });

// Pre-save middleware for validation
productSchema.pre('save', function(next) {
  if (this.badStock > this.stock) {
    next(new Error('Bad stock cannot exceed total stock'));
  }
  if (this.bookings > this.stock) {
    next(new Error('Bookings cannot exceed total stock'));
  }
  next();
});

export const Product = mongoose.model<IProduct>('Product', productSchema);