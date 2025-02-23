import './App.css';
import Button from 'react-bootstrap/Button';
import { fetchData } from './queries/fetchData';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
    .then(data => {
      setData(data);
      console.log(data);
    })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Credit bank</h1>
        <Button variant="outline-primary">Primary</Button>
      </header>
    </div>
  );
}

export default App;
