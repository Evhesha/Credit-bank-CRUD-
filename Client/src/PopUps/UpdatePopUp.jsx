import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { postData } from "../queries/postData";

function UpdatePopUp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      .then((result) => console.log("Success:", result))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Record update</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePopUp;