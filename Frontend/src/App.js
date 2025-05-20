import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(res => setProducts(res.data));
  }, []);

  const addProduct = () => {
    axios.post('http://localhost:8080/api/products', newProduct)
      .then(res => setProducts([...products, res.data]));
  };

  return (
    <div>
      <h1>Products</h1>
      <input placeholder="Name" onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
      <input placeholder="Description" onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
      <input type="number" placeholder="Price" onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
      <button onClick={addProduct}>Add Product</button>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
