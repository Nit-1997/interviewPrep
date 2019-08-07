import React from 'react';
import logo from '../../assets/logo.svg';
import {NavLink} from 'react-router-dom';
import './header.css';
import { Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';

const header = () =>(
   <Navbar fixed="top" collapseOnSelect expand="lg" bg="primary" variant="dark">
       <NavLink 
                 to='/'
        >
        <Navbar.Brand>
          <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top "
          />
            {'PrepZone'}
          </Navbar.Brand>
        </NavLink> 
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">About Us</Nav.Link>
              <Nav.Link href="#pricing">Topics</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link >
              <NavLink 
                 to='/login'
              >
                     Login
              </NavLink>
             </Nav.Link>
            <Nav.Link>
              <NavLink 
                 to='/signup'
              >
                     Signup
              </NavLink>
             </Nav.Link>
            </Nav>
          </Navbar.Collapse>
       </Navbar>
);


export default header;