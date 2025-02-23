import "./App.css";
import Button from "react-bootstrap/Button";
import { fetchData } from "./queries/fetchData";
import { useState, useEffect } from "react";
import FillForm from "./fillForm/fillForm";
import ListGroup from "react-bootstrap/ListGroup";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Credit bank</h1>
        <p></p>
        <FillForm></FillForm>
        <p></p>
        <Button variant="primary">Fetch data</Button>
        <ListGroup>
          {data.map((el, index) => (
            <ListGroup.Item key={index}>
              {el.firstName} {el.lastName} {el.creditAmount} {el.interestRate}
              <Button variant="danger">Delete record</Button>
              <Button variant="primary">Update record</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </header>
    </div>
  );
}

export default App;
