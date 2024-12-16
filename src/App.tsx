import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProductList } from './components/Products/ProductList';
import { AddProduct } from './components/Products/AddProduct';
import { ProductDetails } from './components/Products/ProductDetails';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}