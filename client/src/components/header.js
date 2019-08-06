import React from 'react';
import logo from '../assets/logo.svg';
import { Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';

const header = () =>(
   <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
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
);


export default header;