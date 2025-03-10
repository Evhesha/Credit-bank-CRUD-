import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar(){

    return <>
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Credit bank</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Bankers</Nav.Link>
            <Nav.Link href="#features">Records</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
}

export default NavBar