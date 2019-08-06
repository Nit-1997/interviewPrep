import React from 'react';
import logo from './logo.svg';
import amazon from './amazon.jpg';
import microsoft from './microsoft.png';
import intuit from './intuit.png';
import adobe from './adobe.png';
import cisco from './cisco.jpeg';
import './App.css';
import { Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top "
          />
            {'PrepZone'}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">About Us</Nav.Link>
              <Nav.Link href="#pricing">Topics</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Login</Nav.Link>
              <Nav.Link href="#deets">sign up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
       </Navbar>
      <header className="App-header">
       <Container>
        <Row>
          <Col xs={7} md={3}>
            <Image src={cisco} roundedCircle thumbnail fluid/>
          </Col>
          <Col xs={7} md={3}>
            <Image src={microsoft} roundedCircle thumbnail fluid/>
          </Col>
          <Col xs={7} md={3}>
            <Image src={intuit} roundedCircle thumbnail fluid/>
          </Col>
          <Col xs={7} md={3}>
            <Image src={adobe} roundedCircle thumbnail fluid/>
          </Col>
        </Row>
      </Container>
       <Container> 
         <p>
          Want to ace the technical interviews?
        </p>
       </Container> 
        <Button  variant="primary">sign up</Button>
      </header>
    </div>
  );
}

export default App;
