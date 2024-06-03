import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/UserService'; // Corrected import statement
import './loginSignUp.css'; // Import CSS file for additional styling

const Products: React.FC = () => {
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [rate, setRate] = useState('');
  const navigate = useNavigate();

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const product = { name, qty, rate };

    try {
      const response = await ProductService.insert(product);
      console.log(response); // Debugging: Log the response to ensure it's being called
      // You can add redirection or any other logic here after adding the product successfully
      navigate('/welcome');
    } catch (error) {
      console.log('Error while adding product:', error);
    }
  };

  const mainStyle = {
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'Jost, sans-serif',
    background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
  };

  const containerStyle = {
    width: '350px',
    height: '500px',
    overflow: 'hidden',
    background: 'url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/ cover',
    borderRadius: '10px',
    boxShadow: '5px 20px 50px #000',
  };

  return (
    <div style={mainStyle}>
      <div className="main" style={containerStyle}>
        <div className="product">
          <label htmlFor="chk" aria-hidden={true}>
            Add Product
          </label>
          <form onSubmit={addProduct}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              name="qty"
              placeholder="Quantity"
              required
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            <input
              type="number"
              name="rate"
              placeholder="Rate"
              required
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Products;
