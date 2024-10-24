import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetch('http://<VM-PUBLIC-IP>:3000/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const addItem = async () => {
    await fetch('http://<VM-PUBLIC-IP>:3000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newItem }),
    });
    setNewItem('');
  };

  return (
    <div>
      <h1>Data from API</h1>
      <ul>
        {data.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <input value={newItem} onChange={(e) => setNewItem(e.target.value)} />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default App;
