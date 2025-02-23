import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./fillForm.css";
import { useState, useEffect } from "react";
import { postData } from "../queries/postData";

function FillForm() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      creditAmount,
      interestRate,
    };
    postData(data)
      .then(result => console.log('Success:', result))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="Form-container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>First name</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Credit amount</Form.Label>
          <Form.Control
            value={creditAmount}
            onChange={(e) => setCreditAmount(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Interest rate</Form.Label>
          <Form.Control
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={() => handleSubmit}>
          Create record
        </Button>
      </Form>
    </div>
  );
}

export default FillForm;