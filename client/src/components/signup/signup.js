import React from "react";
import './signup.css';
import {Form,Button} from 'react-bootstrap';

const FormPage = () => {
  return (
      <Form className="major">
          <h1 className="title">Sign up</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>
           
          <Form.Group controlId="formBasiccollege">
            <Form.Label>College</Form.Label>
            <Form.Control as="select">
              <option value="">Choose...</option>
              <option value="SJCE">SJCE</option>
              <option value="NIE">NIE</option>
              <option value="VVCE">VVCE</option>
              <option value="Others">Others</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicBranch">
            <Form.Label>Branch</Form.Label>
            <Form.Control as="select">
              <option value="">Choose...</option>
              <option value="CSE">CSE</option>
              <option value="ISE">ISE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
            </Form.Control>
          </Form.Group>


           <Form.Group controlId="formBasicYear">
            <Form.Label>Year</Form.Label>
            <Form.Control as="select">
              <option value="">Choose...</option>
              <option value="1">First</option>
              <option value="2">Second</option>
              <option value="3">Third</option>
              <option value="4">Fourth</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
         </Button>
     </Form>
  );
};

export default FormPage;