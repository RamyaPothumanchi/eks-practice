import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const fetchItems = async () => {
    try {
      const res = await axios.get('/api/items');
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (!input) return;
    try {
      await axios.post('/api/items', { name: input });
      setInput('');
      fetchItems();
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>3-Tier EKS Demo App</h1>
      <form onSubmit={addItem}>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Add new item..." 
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
