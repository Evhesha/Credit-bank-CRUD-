import "./App.css";
import Button from "react-bootstrap/Button";
import { fetchData } from "./queries/fetchData";
import { deleteData } from "./queries/deleteData";

import { useState, useEffect } from "react";
import FillForm from "./fillForm/fillForm";
import ListGroup from "react-bootstrap/ListGroup";

function App() {
  const [data, setData] = useState([]);

  const handleFetch = () => {
    fetchData()
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id) => {
     // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure, that you want to delete record?") === true){
      deleteData(id)
      .then(result => {
        console.log(result);
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error:', error));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Credit bank</h1>
        <p></p>
        <FillForm></FillForm>
        <p></p>
        <Button variant="primary" onClick={handleFetch}>Fetch data</Button>
        <ListGroup>
          {data.map((el, index) => (
            <ListGroup.Item key={index}>
              {el.firstName} {el.lastName} {el.creditAmount} {el.interestRate}
              <Button variant="danger" onClick={() => handleDelete(el.creditRecordId)}>Delete record</Button>
              <Button variant="primary">Update record</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </header>
    </div>
  );
}

export default App;
