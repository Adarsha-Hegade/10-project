import express from 'express';
import { asyncHandler } from '../middleware/async';
import { Product } from '../models/Product';
import { ensureDatabaseConnection } from '../middleware/database';

const router = express.Router();

// Apply database connection check middleware
router.use(ensureDatabaseConnection);

// Get products with pagination and filters
router.get('/', asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;
  const manufacturer = req.query.manufacturer as string;
  const sortBy = req.query.sortBy as string || 'createdAt';
  const sortOrder = req.query.sortOrder as string || 'desc';

  const query: any = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { code: { $regex: search, $options: 'i' } },
      { manufacturer: { $regex: search, $options: 'i' } },
    ];
  }
  if (manufacturer) {
    query.manufacturer = manufacturer;
  }

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec(),
    Product.countDocuments(query),
  ]);

  res.json({
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}));

// Get single product
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
}));

// Create product
router.post('/', asyncHandler(async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
}));

// Update product
router.put('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
}));

// Delete product
router.delete('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.status(204).send();
}));

export { router as productRouter };