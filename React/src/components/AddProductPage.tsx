import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [productQty, setProductQty] = useState('');
  const [productRate, setProductRate] = useState('');

  const navigate = useNavigate();
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = { name: productName, qty: productQty, rate: productRate };
  
    try {
      // Call your service method to add the product
      const response = await UserService.insert(product);
      console.log(response); // Debugging: Log the response to ensure it's being called
      // Navigate to another page after adding the product
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" required />
        <input type="number" value={productQty} onChange={(e) => setProductQty(e.target.value)} placeholder="Product Qty" required />
        <input type="number" value={productRate} onChange={(e) => setProductRate(e.target.value)} placeholder="Product Rate" required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
