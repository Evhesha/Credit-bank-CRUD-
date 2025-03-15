import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../fillForm.css";
import { useState } from "react";
import { postBankerData } from "../../queries/bankers/postBankerData";

function BankerFillForm(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [departmentNumber, setDepartmentNumber] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!isValidNumber(departmentNumber)) {
        alert('Please enter valid numbers for Credit Amount and Interest Rate');
        return;
      }
      if (firstName === "" || lastName === ""){
        alert('First name and Last name can not be empty');
        return;
      }
  
      const data = {
        firstName,
        lastName,
        departmentNumber,
      };
      postBankerData(data)
        .then(result => console.log('Success:', result))
        .catch(error => console.error('Error:', error));
    };
  
    const isValidNumber = (value) => {
      return !isNaN(value) && value > 0;
    };
  
    return (
      <div className="Form-container2">
        <Form onSubmit={handleSubmit}>
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
            <Form.Label>Department number</Form.Label>
            <Form.Control
              value={departmentNumber}
              onChange={(e) => setDepartmentNumber(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Create record
          </Button>
        </Form>
      </div>
    )
}

export default BankerFillForm