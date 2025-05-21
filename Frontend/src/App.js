import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product Catalog</h1>
      {products.length === 0 && <p>No products available.</p>}
      <ul>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: '10px' }}>
            <strong>{product.name}</strong> — ${product.price}
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
