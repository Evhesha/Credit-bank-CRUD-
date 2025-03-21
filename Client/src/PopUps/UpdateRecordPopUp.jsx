import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { putRecordData } from "../queries/records/putRecordData";

function UpdateRecordPopUp({ id, fn, ln, ca, ir }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstName, setFirstName] = useState(fn);
  const [lastName, setLastName] = useState(ln);
  const [creditAmount, setCreditAmount] = useState(ca);
  const [interestRate, setInterestRate] = useState(ir);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidNumber(creditAmount) || !isValidNumber(interestRate)) {
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
      creditAmount,
      interestRate,
    };
    putRecordData(data, id)
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
      <Button variant="primary" onClick={handleShow}>
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
            <Form.Group className="mb-3" controlId="formCreditAmount">
              <Form.Label>Credit amount</Form.Label>
              <Form.Control
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formInterestRate">
              <Form.Label>Interest rate</Form.Label>
              <Form.Control
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </Form.Group>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateRecordPopUp;