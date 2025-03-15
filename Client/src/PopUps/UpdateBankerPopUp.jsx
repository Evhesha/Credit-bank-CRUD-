import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { postBankerData } from "../queries/bankers/postBankerData";

function UpdateBankerPopUp({ id, fn, ln, dn}){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [firstName, setFirstName] = useState(fn);
    const [lastName, setLastName] = useState(ln);
    const [departmentNumber, setDepartmentNumber] = useState(dn);
  
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
        departmentNumber
      };
      postBankerData(data, id)
        .then((result) => {
          console.log("Success:", result);
          handleClose();
        })
        .catch((error) => console.error("Error:", error));
    };
  
    const isValidNumber = (value) => {
      return !isNaN(value) && value > 0;
    };
  
    return (
      <>
        <Button variant="success" onClick={handleShow}>
          Update
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Record update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDepartmentNumber">
                <Form.Label>Department Number</Form.Label>
                <Form.Control
                  type="number"
                  value={departmentNumber}
                  onChange={(e) => setDepartmentNumber(e.target.value)}
                />
              </Form.Group>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
}

export default UpdateBankerPopUp;