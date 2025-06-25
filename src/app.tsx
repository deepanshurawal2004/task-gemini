import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <div>
      <h1>Frontend Connected</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
